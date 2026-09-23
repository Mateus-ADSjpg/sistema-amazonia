import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Icone from '../ui/Icone'
import './AcessoRestrito.css'

// =====================================================================
// ENTRADA DISCRETA DO PAINEL DA SECRETARIA
//
// O painel não aparece mais no menu do site. Existem três formas de
// chegar até ele, todas só para quem já sabe:
//
//   1. Digitar o endereço:  seusite.com/secretaria
//   2. Apertar Ctrl + Alt + S em qualquer página
//   3. Clicar no cadeadinho quase invisível no rodapé
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

  return (
    <button
      type="button"
      className="acesso-restrito"
      onClick={() => navegar(ENDERECO)}
      aria-label="Acesso restrito da secretaria"
      title="Acesso restrito"
    >
      <Icone nome="cadeado" tamanho={15} />
    </button>
  )
}
