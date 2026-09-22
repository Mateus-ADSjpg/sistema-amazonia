import { useEffect, useRef, useState } from 'react'

// Retorna [ref, visivel]: visivel vira true quando o elemento entra na tela
// (e continua true depois disso).
export function useVisivel({ margem = '0px 0px -12% 0px', limite = 0.15 } = {}) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem, threshold: limite },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [margem, limite])

  return [ref, visivel]
}
