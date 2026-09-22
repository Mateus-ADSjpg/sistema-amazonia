import { useEffect, useLayoutEffect, useState } from 'react'
import { CLUBE } from '../../conteudo/clube'
import './Abertura.css'

const CHAVE = 'amazonia-abertura-vista'
const DURACAO = 1700 // quanto tempo o logo fica na tela (ms)
const SAIDA = 700 // duração do esmaecimento final (ms)

// A abertura aparece só na primeira página que a pessoa abre na visita,
// e nunca para quem prefere menos movimento no sistema.
function deveAparecer() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !window.sessionStorage.getItem(CHAVE)
  } catch {
    return true
  }
}

export default function Abertura() {
  const [fase, setFase] = useState(() => (deveAparecer() ? 'mostrando' : 'fim'))

  // Enquanto a abertura está na tela, as animações da capa esperam.
  useLayoutEffect(() => {
    const raiz = document.documentElement
    raiz.classList.toggle('abertura-ativa', fase === 'mostrando')
    document.body.classList.toggle('menu-aberto', fase === 'mostrando')
    return () => {
      raiz.classList.remove('abertura-ativa')
      document.body.classList.remove('menu-aberto')
    }
  }, [fase])

  useEffect(() => {
    if (fase === 'mostrando') {
      try {
        window.sessionStorage.setItem(CHAVE, '1')
      } catch {
        // navegação privada: tudo bem, só aparece de novo
      }
      const t = setTimeout(() => setFase('saindo'), DURACAO)
      return () => clearTimeout(t)
    }
    if (fase === 'saindo') {
      const t = setTimeout(() => setFase('fim'), SAIDA)
      return () => clearTimeout(t)
    }
  }, [fase])

  if (fase === 'fim') return null

  return (
    <div
      className={`abertura ${fase === 'saindo' ? 'abertura--saindo' : ''}`}
      style={{ '--duracao': `${DURACAO}ms`, '--saida': `${SAIDA}ms` }}
      onClick={() => setFase('saindo')}
      aria-hidden="true"
    >
      <div className="abertura__raios" />
      <img className="abertura__logo" src={CLUBE.logo} alt="" />
      <p className="abertura__texto">{CLUBE.hashtag}</p>
      <span className="abertura__barra">
        <span />
      </span>
    </div>
  )
}
