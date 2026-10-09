import { Link } from 'react-router'
import { CLUBE, CONTATO, linkWhatsapp } from '../../conteudo/clube'
import { CHAMADA_FINAL } from '../../conteudo/inicio'
import Icone from './Icone'
import Marca from './Marca'
import Revelar from './Revelar'
import './Chamada.css'

// Bloco "Venha ser um desbravador", usado no fim das páginas.
// Fica no amarelo do clube; dentro da página de uma unidade, pega a cor
// clara da unidade (lá o "--ouro" é trocado pela cor dela).
export default function Chamada({ titulo = CHAMADA_FINAL.titulo, texto = CHAMADA_FINAL.texto }) {
  return (
    <section className="secao secao-chamada">
      <div className="container">
        <Revelar className="chamada">
          <span className="raios chamada__raios" aria-hidden="true" />
          <img className="chamada__emblema" src="/fotos/clube/logo.png" alt="" aria-hidden="true" loading="lazy" />

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
            </ul>
          </div>
          <div className="chamada__botoes">
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao chamada__whatsapp">
              <Marca nome="whatsapp" tamanho={20} comCor /> Chamar no WhatsApp
            </a>
            <Link to="/calendario" className="botao chamada__secundario">
              Ver a agenda do ano <Icone nome="seta" />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
