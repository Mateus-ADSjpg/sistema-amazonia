import { Link } from 'react-router'
import { CLUBE, CONTATO, linkWhatsapp } from '../../conteudo/clube'
import { CHAMADA_FINAL } from '../../conteudo/inicio'
import Icone from './Icone'
import Marca from './Marca'
import Revelar from './Revelar'
import './Chamada.css'

// Bloco "Venha ser um desbravador", usado no fim das páginas.
export default function Chamada({ titulo = CHAMADA_FINAL.titulo, texto = CHAMADA_FINAL.texto, tom }) {
  return (
    <section className="secao secao-chamada">
      <div className="container">
        <Revelar efeito="zoom" className="chamada grao" style={tom ? { '--tom-chamada': tom } : undefined}>
          <div className="chamada__aurora" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="chamada__texto">
            <h2>{titulo}</h2>
            <p>{texto}</p>
            <ul className="chamada__infos">
              <li>
                <Icone nome="calendario" tamanho={18} />
                {CONTATO.reunioes.dia}, {CONTATO.reunioes.horario}
              </li>
              <li>
                <Icone nome="local" tamanho={18} />
                {CLUBE.cidade}
              </li>
              <li className="chamada__infos-link">
                <Link to="/calendario">
                  Ver a agenda do ano <Icone nome="seta" tamanho={16} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="chamada__botoes">
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao botao--verde">
              <Marca nome="whatsapp" tamanho={18} /> Chamar no WhatsApp
            </a>
            <Link to="/contato" className="botao botao--vazado">
              Todos os contatos
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
