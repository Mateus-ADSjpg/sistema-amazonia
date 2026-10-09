import { useLayoutEffect, useRef } from 'react'

// Para títulos gigantes: se a palavra mais longa não couber na largura
// (celular estreito ou com a fonte do sistema aumentada), diminui a letra
// até caber, em vez de quebrar a palavra no meio ("AMAZÔNI / A").
// Use no elemento: const ref = useCaberNaLargura(texto); <h1 ref={ref}>
export function useCaberNaLargura(dependencia) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ajustar = () => {
      el.style.fontSize = ''
      const largura = el.clientWidth
      if (!largura || el.scrollWidth <= largura) return
      const tamanho = parseFloat(getComputedStyle(el).fontSize)
      el.style.fontSize = `${Math.floor(tamanho * (largura / el.scrollWidth) * 0.98)}px`
    }

    ajustar()
    // só refaz a conta quando a largura muda (a altura muda com a própria letra)
    let larguraAnterior = el.clientWidth
    const observador = new ResizeObserver(() => {
      if (el.clientWidth === larguraAnterior) return
      larguraAnterior = el.clientWidth
      ajustar()
    })
    observador.observe(el)
    document.fonts?.ready.then(ajustar)
    return () => observador.disconnect()
  }, [dependencia])

  return ref
}
