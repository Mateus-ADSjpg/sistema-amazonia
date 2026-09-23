import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { CLUBE, linkWhatsapp } from '../../conteudo/clube'
import { DESTAQUES, TEMPO_DESTAQUE } from '../../conteudo/inicio'
import { UNIDADES } from '../../conteudo/unidades'
import Foto from '../ui/Foto'
import Icone from '../ui/Icone'
import './CapaCarrossel.css'

const prefereMenosMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Capa da página inicial: destaques que se revezam sozinhos, com barras de
// progresso e deslizar no celular. Os textos ficam em
// src/conteudo/inicio.js (DESTAQUES) e o tempo de cada um em TEMPO_DESTAQUE.
export default function CapaCarrossel() {
  const total = DESTAQUES.length
  const [atual, setAtual] = useState(0)
  const [semAutoplay] = useState(prefereMenosMovimento)
  const [tecladoDentro, setTecladoDentro] = useState(false)
  const [abaOculta, setAbaOculta] = useState(false)
  const toqueInicial = useRef(null)

  // O revezamento segue mesmo com o mouse em cima. Ele só para quando
  // alguém navega pela capa com o teclado, quando a aba sai da frente e
  // quando o aparelho pede menos animação.
  const autoplay = total > 1 && !semAutoplay
  const pausado = !autoplay || tecladoDentro || abaOculta

  const irPara = (i) => setAtual(((i % total) + total) % total)
  const proximo = () => irPara(atual + 1)
  const anterior = () => irPara(atual - 1)

  useEffect(() => {
    const aoMudarAba = () => setAbaOculta(document.hidden)
    document.addEventListener('visibilitychange', aoMudarAba)
    return () => document.removeEventListener('visibilitychange', aoMudarAba)
  }, [])

  const aoTocar = (e) => {
    toqueInicial.current = e.touches[0].clientX
  }
  const aoSoltar = (e) => {
    if (toqueInicial.current == null) return
    const distancia = e.changedTouches[0].clientX - toqueInicial.current
    if (Math.abs(distancia) > 50) (distancia > 0 ? anterior : proximo)()
    toqueInicial.current = null
  }

  const destaque = DESTAQUES[atual]

  return (
    <section
      className="capa"
      aria-roledescription="carrossel"
      aria-label="Destaques do clube"
      // clicar num indicador também dá foco; só o teclado pausa
      onFocus={(e) => setTecladoDentro(e.target.matches(':focus-visible'))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setTecladoDentro(false)}
      onTouchStart={aoTocar}
      onTouchEnd={aoSoltar}
    >
      <div className="capa__fundos" aria-hidden="true">
        {DESTAQUES.map((d, i) => (
          <div key={i} className={`capa__fundo ${i === atual ? 'capa__fundo--ativo' : ''}`}>
            <Foto src={d.foto} preencher prioridade={i === 0} style={{ '--posicao': d.posicao ?? 'center' }} />
          </div>
        ))}
      </div>
      <div className="capa__veu" aria-hidden="true" />

      {/* Cortina que atravessa a tela a cada troca de destaque */}
      <div key={`cortina-${atual}`} className="capa__cortina" aria-hidden="true">
        {UNIDADES.map((u, i) => (
          <span key={u.slug} style={{ background: u.tema.principal, '--i': i }} />
        ))}
      </div>

      <h1 className="sr-only">{CLUBE.nome}</h1>

      <div className="container capa__conteudo">
        <div
          key={atual}
          className="capa__destaque"
          role="group"
          aria-roledescription="destaque"
          aria-label={`${atual + 1} de ${total}`}
          aria-live={pausado ? 'polite' : 'off'}
        >
          <span className="capa__chamada">{destaque.chamada}</span>
          <h2 className={`capa__titulo ${atual === 0 ? 'capa__titulo--principal' : ''}`}>{destaque.titulo}</h2>
          {destaque.texto && <p className="capa__texto">{destaque.texto}</p>}
          {destaque.botoes?.length > 0 && (
            <div className="capa__botoes">
              {destaque.botoes.map((b) => {
                const classe = `botao ${b.vazado ? 'botao--vazado' : ''}`
                const conteudo = (
                  <>
                    {b.texto} {!b.vazado && <Icone nome="seta" />}
                  </>
                )
                return b.whatsapp ? (
                  <a key={b.texto} href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className={classe}>
                    {conteudo}
                  </a>
                ) : (
                  <Link key={b.texto} to={b.para} className={classe}>
                    {conteudo}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="container capa__rodape">
        {total > 1 && (
          <div className="capa__indicadores" role="group" aria-label="Escolher destaque">
            {DESTAQUES.map((d, i) => (
              <button
                key={i}
                className={`capa__indicador ${i === atual ? 'capa__indicador--ativo' : ''}`}
                onClick={() => irPara(i)}
                aria-label={`Destaque ${i + 1}: ${d.titulo}`}
                aria-current={i === atual ? 'true' : undefined}
              >
                <span className="capa__indicador-titulo">{d.titulo}</span>
                <span className="capa__barra">
                  {i === atual && (
                    <span
                      key={atual}
                      className="capa__progresso"
                      style={{
                        animationDuration: `${TEMPO_DESTAQUE}ms`,
                        animationPlayState: pausado ? 'paused' : 'running',
                      }}
                      onAnimationEnd={() => autoplay && proximo()}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
        <span className="capa__local">
          {CLUBE.cidade} · {CLUBE.regiao}
        </span>
      </div>

      <div className="faixa-unidades" aria-hidden="true">
        {UNIDADES.map((u) => (
          <span key={u.slug} style={{ background: u.tema.principal }} />
        ))}
      </div>
    </section>
  )
}
