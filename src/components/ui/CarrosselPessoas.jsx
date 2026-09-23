import { useCallback, useEffect, useRef, useState } from 'react'
import Foto from './Foto'
import Icone from './Icone'
import Texto from './Texto'
import './CarrosselPessoas.css'

const prefereMenosMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Carrossel lateral de pessoas (diretoria, conselheiros...).
// Anda sozinho devagar e para assim que alguém interage: passar o mouse,
// arrastar, usar as setas ou chegar nele pelo teclado.
export default function CarrosselPessoas({ pessoas = [], intervalo = 4500, rotulo = 'Pessoas' }) {
  const trilho = useRef(null)
  const arrasto = useRef(null)
  const [parado, setParado] = useState(false)
  const [arrastando, setArrastando] = useState(false)
  const [noComeco, setNoComeco] = useState(true)
  const [noFim, setNoFim] = useState(false)

  const conferirPontas = useCallback(() => {
    const el = trilho.current
    if (!el) return
    setNoComeco(el.scrollLeft < 8)
    setNoFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  const mover = useCallback((direcao) => {
    const el = trilho.current
    if (!el) return

    // Chegou no fim andando para a frente? Volta para o começo.
    if (direcao > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    // Anda a largura de um cartão + o espaço entre eles.
    const cartao = el.firstElementChild
    const espaco = parseFloat(getComputedStyle(el).columnGap || '0') || 0
    const passo = cartao ? cartao.getBoundingClientRect().width + espaco : el.clientWidth
    el.scrollBy({ left: passo * direcao, behavior: 'smooth' })
  }, [])

  // Passa sozinho, devagar.
  useEffect(() => {
    if (parado || prefereMenosMovimento() || pessoas.length < 2) return
    const relogio = setInterval(() => {
      if (!document.hidden) mover(1)
    }, intervalo)
    return () => clearInterval(relogio)
  }, [parado, intervalo, pessoas.length, mover])

  useEffect(() => {
    conferirPontas()
  }, [conferirPontas, pessoas.length])

  // Arrastar com o mouse (no celular o próprio dedo já rola a lista).
  const aoApertar = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = trilho.current
    arrasto.current = { x: e.clientX, inicio: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
    setArrastando(true)
    setParado(true)
  }

  const aoArrastar = (e) => {
    if (!arrasto.current) return
    trilho.current.scrollLeft = arrasto.current.inicio - (e.clientX - arrasto.current.x)
  }

  const aoSoltar = (e) => {
    if (!arrasto.current) return
    trilho.current.releasePointerCapture?.(e.pointerId)
    arrasto.current = null
    setArrastando(false)
    setParado(false)
  }

  if (pessoas.length === 0) return null

  return (
    <div
      className="carrossel-pessoas"
      onMouseEnter={() => setParado(true)}
      onMouseLeave={() => setParado(false)}
      onFocus={() => setParado(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setParado(false)}
    >
      <ul
        className={`carrossel-pessoas__trilho ${arrastando ? 'carrossel-pessoas__trilho--arrastando' : ''}`}
        ref={trilho}
        onScroll={conferirPontas}
        onPointerDown={aoApertar}
        onPointerMove={aoArrastar}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        tabIndex={0}
        role="group"
        aria-label={`${rotulo} — arraste para o lado para ver todos`}
      >
        {pessoas.map((p, i) => (
          <li key={`${p.nome}-${i}`} className="pessoa carrossel-pessoas__item">
            <Foto src={p.foto} alt={p.nome} proporcao="quadrada" />
            <Texto as="h3" valor={p.nome} />
            <p>{p.cargo}</p>
          </li>
        ))}
      </ul>

      <div className="carrossel-pessoas__controles">
        <button
          type="button"
          className="carrossel-pessoas__seta"
          onClick={() => mover(-1)}
          disabled={noComeco}
          aria-label="Ver anteriores"
        >
          <Icone nome="setaEsquerda" tamanho={18} />
        </button>
        <button
          type="button"
          className="carrossel-pessoas__seta"
          onClick={() => mover(1)}
          aria-label={noFim ? 'Voltar para o começo' : 'Ver próximos'}
        >
          <Icone nome="seta" tamanho={18} />
        </button>
      </div>
    </div>
  )
}
