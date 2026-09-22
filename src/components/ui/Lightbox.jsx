import { useEffect, useRef } from 'react'
import Foto from './Foto'
import Icone from './Icone'
import './Lightbox.css'

// Visualizador de fotos em tela cheia (setas, teclado e deslizar no celular).
export default function Lightbox({ fotos, indice, aoFechar, aoMudar, tom }) {
  const botaoFechar = useRef(null)
  const toqueInicial = useRef(null)
  const total = fotos.length
  const foto = fotos[indice]

  const anterior = () => aoMudar((indice - 1 + total) % total)
  const proxima = () => aoMudar((indice + 1) % total)

  useEffect(() => {
    const focoAnterior = document.activeElement
    document.body.classList.add('menu-aberto')
    botaoFechar.current?.focus()
    return () => {
      document.body.classList.remove('menu-aberto')
      focoAnterior?.focus?.()
    }
  }, [])

  useEffect(() => {
    const teclas = (e) => {
      if (e.key === 'Escape') aoFechar()
      if (e.key === 'ArrowLeft') aoMudar((indice - 1 + total) % total)
      if (e.key === 'ArrowRight') aoMudar((indice + 1) % total)
    }
    window.addEventListener('keydown', teclas)
    return () => window.removeEventListener('keydown', teclas)
  }, [indice, total, aoFechar, aoMudar])

  const inicioToque = (e) => {
    toqueInicial.current = e.touches[0].clientX
  }
  const fimToque = (e) => {
    if (toqueInicial.current == null) return
    const distancia = e.changedTouches[0].clientX - toqueInicial.current
    if (Math.abs(distancia) > 50) (distancia > 0 ? anterior : proxima)()
    toqueInicial.current = null
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotos"
      onClick={(e) => e.target === e.currentTarget && aoFechar()}
      onTouchStart={inicioToque}
      onTouchEnd={fimToque}
    >
      <div className="lightbox__topo">
        <span className="lightbox__contagem">
          {String(indice + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button ref={botaoFechar} className="lightbox__botao" onClick={aoFechar} aria-label="Fechar">
          <Icone nome="fechar" />
        </button>
      </div>

      <figure className="lightbox__figura" key={foto.src}>
        <Foto src={foto.src} alt={foto.legenda || `Foto ${indice + 1}`} formato={foto.formato} tom={tom} prioridade />
        {foto.legenda && <figcaption>{foto.legenda}</figcaption>}
      </figure>

      {total > 1 && (
        <>
          <button className="lightbox__botao lightbox__nav lightbox__nav--anterior" onClick={anterior} aria-label="Foto anterior">
            <Icone nome="setaEsquerda" />
          </button>
          <button className="lightbox__botao lightbox__nav lightbox__nav--proxima" onClick={proxima} aria-label="Próxima foto">
            <Icone nome="seta" />
          </button>
        </>
      )}
    </div>
  )
}
