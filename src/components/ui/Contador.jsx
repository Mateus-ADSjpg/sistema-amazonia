import { useEffect, useState } from 'react'
import { useVisivel } from '../../hooks/useVisivel'

// Número que conta de 0 até o valor quando aparece na tela.
export default function Contador({ valor, sufixo = '', duracao = 1800 }) {
  const [ref, visivel] = useVisivel()
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (!visivel) return
    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tempo = semAnimacao ? 1 : duracao
    const inicio = performance.now()
    let quadro

    const passo = (agora) => {
      const t = Math.min((agora - inicio) / tempo, 1)
      const suavizado = 1 - Math.pow(1 - t, 3)
      setAtual(Math.round(valor * suavizado))
      if (t < 1) quadro = requestAnimationFrame(passo)
    }
    quadro = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro)
  }, [visivel, valor, duracao])

  return (
    <span ref={ref}>
      {String(atual).padStart(2, '0')}
      {sufixo}
    </span>
  )
}
