import { Link } from 'react-router'
import CapaPagina from '../components/ui/CapaPagina'

export default function NaoEncontrada() {
  return (
    <CapaPagina sobretitulo="Erro 404" titulo="Trilha não encontrada" texto="Parece que essa página se perdeu na mata. Volte para o início e continue explorando.">
      <div style={{ marginTop: 28 }}>
        <Link to="/" className="botao">
          Voltar ao início
        </Link>
      </div>
    </CapaPagina>
  )
}
