import { Link } from 'react-router'
import { CLUBE, CONTATO, linkWhatsapp } from '../../conteudo/clube'
import { UNIDADES } from '../../conteudo/unidades'
import Emblema from '../ui/Emblema'
import Icone from '../ui/Icone'
import './Rodape.css'

export default function Rodape() {
  const ano = new Date().getFullYear()

  return (
    <footer className="rodape">
      <div className="faixa-unidades" aria-hidden="true">
        {UNIDADES.map((u) => (
          <span key={u.slug} style={{ background: u.tema.principal }} />
        ))}
      </div>

      <div className="container rodape__grade">
        <div className="rodape__marca">
          <Emblema src={CLUBE.logo} alt={CLUBE.nome} tamanho={64} />
          <p className="rodape__nome">{CLUBE.nome}</p>
          <p className="rodape__slogan">{CLUBE.slogan}</p>
          <p className="rodape__local">
            {CLUBE.cidade} · {CLUBE.regiao}
            <br />
            {CLUBE.associacao}
          </p>
          <p className="rodape__hashtag">{CLUBE.hashtag}</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="rodape__titulo">Navegue</h2>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Nossa história</Link></li>
            <li><Link to="/unidades">Unidades</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="rodape__titulo">Unidades</h2>
          <ul>
            {UNIDADES.map((u) => (
              <li key={u.slug}>
                <Link to={`/unidades/${u.slug}`} className="rodape__unidade" style={{ '--cor-unidade': u.tema.claro }}>
                  <span className="cabecalho__ponto" />
                  {u.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="rodape__titulo">Fale com a gente</h2>
          <ul className="rodape__contatos">
            <li>
              <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">
                <Icone nome="conversa" tamanho={18} /> WhatsApp da diretoria
              </a>
            </li>
            {CONTATO.instagram && (
              <li>
                <a href={`https://instagram.com/${CONTATO.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Icone nome="camera" tamanho={18} /> @{CONTATO.instagram}
                </a>
              </li>
            )}
            {CONTATO.email && (
              <li>
                <a href={`mailto:${CONTATO.email}`}>
                  <Icone nome="email" tamanho={18} /> {CONTATO.email}
                </a>
              </li>
            )}
            <li className="rodape__reuniao">
              <Icone nome="relogio" tamanho={18} />
              <span>
                {CONTATO.reunioes.dia}, {CONTATO.reunioes.horario}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container rodape__base">
        <p>
          © {ano} {CLUBE.nome}
        </p>
        <div className="rodape__base-links">
          <Link to="/secretaria">
            <Icone nome="cadeado" tamanho={16} /> Área da Secretaria
          </Link>
          <button className="rodape__topo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Voltar ao topo <Icone nome="setaDiagonal" tamanho={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
