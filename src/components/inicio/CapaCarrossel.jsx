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
//
// A troca é feita por uma "cortina": quatro faixas com as cores das
// unidades atravessam a tela enquanto a foto e o texto mudam por baixo.
export default function CapaCarrossel() {
  const total = DESTAQUES.length
  const [atual, setAtual] = useState(0)
  const [semAutoplay] = useState(prefereMenosMovimento)
  const [mouseEmCima, setMouseEmCima] = useState(false)
  const [focoDentro, setFocoDentro] = useState(false)
  const [abaOculta, setAbaOculta] = useState(false)
  const toqueInicial = useRef(null)

  // Sem botão de pausa na tela: o revezamento para sozinho quando o
  // ponteiro está em cima, quando o teclado entra na capa, quando a aba
  // sai da frente e quando o aparelho pede menos animação.
  const autoplay = total > 1 && !semAutoplay
  const pausado = !autoplay || mouseEmCima || focoDentro || abaOculta

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
      className="capa grao"
      aria-roledescription="carrossel"
      aria-label="Destaques do clube"
      onMouseEnter={() => setMouseEmCima(true)}
      onMouseLeave={() => setMouseEmCima(false)}
      onFocus={() => setFocoDentro(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocoDentro(false)}
      onTouchStart={aoTocar}
      onTouchEnd={aoSoltar}
    >
      {/* Fotos de fundo (uma por destaque, trocando com esmaecimento) */}
      <div className="capa__fundos" aria-hidden="true">
        {DESTAQUES.map((d, i) => (
          <div key={i} className={`capa__fundo ${i === atual ? 'capa__fundo--ativo' : ''}`}>
            <Foto src={d.foto} preencher prioridade={i === 0} style={{ '--posicao': d.posicao ?? 'center' }} />
            {d.cores && (
              <div className="capa__faixas-cores">
                {UNIDADES.map((u) => (
                  <span key={u.slug} style={{ background: u.tema.principal }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manchas de cor da paleta se movendo devagar */}
      <div className="capa__aurora" aria-hidden="true">
        <span style={{ '--cor': 'var(--ouro)' }} />
        <span style={{ '--cor': 'var(--mata)' }} />
        <span style={{ '--cor': 'var(--coroa)' }} />
        {UNIDADES.map((u) => (
          <span key={u.slug} style={{ '--cor': u.tema.principal }} />
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
        <span className="capa__selo">
          <span className="capa__pulso" />
          {CLUBE.cidade} · {CLUBE.regiao}
        </span>

        <div
          key={atual}
          className="capa__destaque"
          role="group"
          aria-roledescription="destaque"
          aria-label={`${atual + 1} de ${total}`}
          aria-live={pausado ? 'polite' : 'off'}
        >
          <span className="capa__chamada">{destaque.chamada}</span>
          <h2 className={`capa__titulo ${atual === 0 ? 'capa__titulo--gigante' : ''}`} aria-label={destaque.titulo}>
            {atual === 0
              ? [...destaque.titulo].map((letra, i) => (
                  <span key={i} className="capa__letra" style={{ '--i': i }} aria-hidden="true">
                    {letra}
                  </span>
                ))
              : destaque.titulo.split(' ').map((palavra, i) => (
                  <span key={i} className="capa__palavra" aria-hidden="true">
                    <span style={{ '--i': i }}>{palavra}</span>
                  </span>
                ))}
          </h2>
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

      {total > 1 && (
        <div className="container capa__rodape">
          <div className="capa__indicadores" role="group" aria-label="Escolher destaque">
            {DESTAQUES.map((d, i) => (
              <button
                key={i}
                className={`capa__indicador ${i === atual ? 'capa__indicador--ativo' : ''} ${i < atual ? 'capa__indicador--visto' : ''}`}
                onClick={() => irPara(i)}
                aria-label={`Destaque ${i + 1}: ${d.titulo}`}
                aria-current={i === atual ? 'true' : undefined}
              >
                <span className="capa__indicador-numero">{String(i + 1).padStart(2, '0')}</span>
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
        </div>
      )}

      <div className="capa__faixa" aria-hidden="true">
        {UNIDADES.map((u) => (
          <span key={u.slug} style={{ background: u.tema.principal }} />
        ))}
      </div>
    </section>
  )
}
