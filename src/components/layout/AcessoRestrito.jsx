import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './AcessoRestrito.css'

// =====================================================================
// ENTRADA DISCRETA DO PAINEL DA SECRETARIA
//
// O painel não aparece mais no menu do site. Existem três formas de
// chegar até ele, todas só para quem já sabe:
//
//   1. Digitar o endereço:  seusite.com/secretaria
//   2. Apertar Ctrl + Alt + S em qualquer página
//   3. Clicar no símbolo © do rodapé (parece texto comum)
//
// Isso não é segurança de verdade (a segurança está no login e nas
// regras do banco, em supabase/seguranca.sql) — é só para não ficar
// convidando visitante a mexer onde não deve.
// =====================================================================

const ENDERECO = '/secretaria'

export default function AcessoRestrito() {
  const navegar = useNavigate()

  useEffect(() => {
    const aoTeclar = (e) => {
      // Ctrl + Alt + S (no Mac também funciona com a tecla Command)
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        navegar(ENDERECO)
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [navegar])

  // Fica fora do Tab e sem cara de link de propósito; pelo teclado a
  // entrada é o atalho acima.
  return (
    <span className="acesso-restrito" onClick={() => navegar(ENDERECO)}>
      ©
    </span>
  )
}
