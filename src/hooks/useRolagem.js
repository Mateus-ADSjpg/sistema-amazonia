import { useEffect, useState } from 'react'

// Informa se a página já rolou um pouco (rolou) e se o usuário está
// rolando para baixo (descendo), para esconder/mostrar o cabeçalho.
export function useRolagem(limite = 40) {
  const [estado, setEstado] = useState({ rolou: false, descendo: false })

  useEffect(() => {
    let ultimo = window.scrollY
    let agendado = false

    const atualizar = () => {
      const atual = window.scrollY
      const descendo = atual > ultimo && atual > 420
      setEstado((anterior) => {
        const novo = { rolou: atual > limite, descendo: Math.abs(atual - ultimo) < 4 ? anterior.descendo : descendo }
        return novo.rolou === anterior.rolou && novo.descendo === anterior.descendo ? anterior : novo
      })
      ultimo = atual
      agendado = false
    }

    const aoRolar = () => {
      if (!agendado) {
        agendado = true
        requestAnimationFrame(atualizar)
      }
    }

    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [limite])

  return estado
}
