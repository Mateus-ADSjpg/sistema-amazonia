import Foto from './Foto'
import './CapaPagina.css'

// Capa do topo das páginas internas: foto apagada + cores + título grande.
export default function CapaPagina({ foto, sobretitulo, titulo, texto, tom, tomApoio, compacta = false, children }) {
  return (
    <header
      className={`capa-pagina grao ${compacta ? 'capa-pagina--compacta' : ''}`}
      style={{ '--tom': tom ?? 'var(--mata)', '--tom-apoio': tomApoio ?? 'var(--ouro)' }}
    >
      <div className="capa-pagina__fundo" aria-hidden="true">
        <Foto src={foto} preencher prioridade tom={tom} />
      </div>
      <div className="capa-pagina__cores" aria-hidden="true" />

      <div className="container capa-pagina__conteudo">
        {sobretitulo && <span className="sobretitulo capa-pagina__sobretitulo">{sobretitulo}</span>}
        <h1 className="capa-pagina__titulo">{titulo}</h1>
        {texto && <p className="capa-pagina__texto">{texto}</p>}
        {children}
      </div>
    </header>
  )
}
