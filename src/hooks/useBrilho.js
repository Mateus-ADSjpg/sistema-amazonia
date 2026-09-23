import { useCallback } from 'react'

// Acende um brilho suave no cartão, seguindo o ponteiro do mouse.
// Uso:  const brilho = useBrilho()
//       <div className="brilho" onPointerMove={brilho}>…</div>
// No celular nada acontece (não existe ponteiro pairando), e o cartão
// continua idêntico — o efeito é só um detalhe a mais no computador.
export function useBrilho() {
  return useCallback((evento) => {
    if (evento.pointerType !== 'mouse') return
    const el = evento.currentTarget
    const area = el.getBoundingClientRect()
    el.style.setProperty('--bx', `${evento.clientX - area.left}px`)
    el.style.setProperty('--by', `${evento.clientY - area.top}px`)
  }, [])
}
