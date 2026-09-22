import { useNavigate } from 'react-router'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import PainelSecretaria from '../components/secretaria/PainelSecretaria'

export default function Secretaria() {
  useTitulo('Secretaria')
  const navegar = useNavigate()

  return (
    <>
      <CapaPagina sobretitulo="Acesso restrito" titulo="Secretaria" compacta />
      <section className="secao" style={{ paddingTop: 'clamp(32px, 5vw, 56px)' }}>
        <div className="container">
          <PainelSecretaria onVoltar={() => navegar('/')} />
        </div>
      </section>
    </>
  )
}
