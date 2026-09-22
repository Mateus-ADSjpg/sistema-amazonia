import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Abertura from './Abertura'
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'

// Estrutura comum a todas as páginas: cabeçalho, conteúdo e rodapé.
export default function Layout() {
  const { pathname, hash } = useLocation()

  // Ao trocar de página, volta para o topo (ou vai até a âncora #).
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <Abertura />
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Outlet />
      </main>
      <Rodape />
    </>
  )
}
