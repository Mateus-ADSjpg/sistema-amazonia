import { useEffect, useState } from 'react'
import './BarraProgresso.css'

// Fiozinho dourado no topo da tela mostrando o quanto da página já foi lida.
export default function BarraProgresso() {
  const [parte, setParte] = useState(0)

  useEffect(() => {
    let agendado = false

    const medir = () => {
      agendado = false
      const total = document.documentElement.scrollHeight - window.innerHeight
      setParte(total > 0 ? Math.min(window.scrollY / total, 1) : 0)
    }

    const aoRolar = () => {
      if (agendado) return
      agendado = true
      requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <div className="barra-progresso" aria-hidden="true">
      <span style={{ transform: `scaleX(${parte})` }} />
    </div>
  )
}
