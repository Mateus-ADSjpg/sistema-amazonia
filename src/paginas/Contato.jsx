import { CLUBE, CONTATO, linkWhatsapp } from '../conteudo/clube'
import { CAPA_CONTATO, PERGUNTAS } from '../conteudo/contato'
import { deveMostrar } from '../conteudo/util'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import Icone from '../components/ui/Icone'
import Revelar from '../components/ui/Revelar'
import Texto from '../components/ui/Texto'
import './Contato.css'

export default function Contato() {
  useTitulo('Contato')

  const perguntas = PERGUNTAS.filter((p) => deveMostrar(p.resposta))

  return (
    <>
      <CapaPagina
        foto={CAPA_CONTATO.foto}
        sobretitulo="Contato"
        titulo={CAPA_CONTATO.titulo}
        texto={CAPA_CONTATO.texto}
        compacta
      />

      <section className="secao contato">
        <div className="container contato__grade">
          <Revelar className="contato-cartao contato-cartao--destaque">
            <span className="contato-cartao__icone">
              <Icone nome="conversa" tamanho={30} />
            </span>
            <h2>Fale pelo WhatsApp</h2>
            <p>O jeito mais rápido de tirar dúvidas e combinar sua visita.</p>
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao botao--verde">
              Chamar a diretoria <Icone nome="seta" />
            </a>
          </Revelar>

          <Revelar className="contato-cartao" atraso={100}>
            <span className="contato-cartao__icone">
              <Icone nome="calendario" tamanho={26} />
            </span>
            <h2>Reuniões</h2>
            <ul className="contato-cartao__lista">
              <li>
                <Icone nome="relogio" tamanho={18} />
                {CONTATO.reunioes.dia}, {CONTATO.reunioes.horario}
              </li>
              <li>
                <Icone nome="local" tamanho={18} />
                {CONTATO.reunioes.local}
              </li>
            </ul>
            {CONTATO.reunioes.mapa && (
              <a href={CONTATO.reunioes.mapa} target="_blank" rel="noopener noreferrer" className="link-seta">
                Ver no mapa <Icone nome="setaDiagonal" />
              </a>
            )}
          </Revelar>

          <Revelar className="contato-cartao" atraso={200}>
            <span className="contato-cartao__icone">
              <Icone nome="camera" tamanho={26} />
            </span>
            <h2>Redes e e-mail</h2>
            <ul className="contato-cartao__lista">
              {CONTATO.instagram && (
                <li>
                  <Icone nome="camera" tamanho={18} />
                  <a href={`https://instagram.com/${CONTATO.instagram}`} target="_blank" rel="noopener noreferrer">
                    @{CONTATO.instagram}
                  </a>
                </li>
              )}
              {CONTATO.email && (
                <li>
                  <Icone nome="email" tamanho={18} />
                  <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
                </li>
              )}
              <li>
                <Icone nome="local" tamanho={18} />
                {CLUBE.cidade} · {CLUBE.regiao}
              </li>
            </ul>
          </Revelar>
        </div>
      </section>

      {perguntas.length > 0 && (
        <section className="secao perguntas-secao">
          <div className="container perguntas">
            <div>
              <Revelar>
                <span className="sobretitulo">Dúvidas</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Perguntas <em>frequentes</em>
                </h2>
              </Revelar>
            </div>
            <div className="perguntas__lista">
              {perguntas.map((p, i) => (
                <Revelar as="details" key={p.pergunta} className="pergunta" atraso={i * 70}>
                  <summary>
                    {p.pergunta}
                    <span className="pergunta__icone" aria-hidden="true">
                      <Icone nome="mais" tamanho={20} />
                    </span>
                  </summary>
                  <Texto as="p" valor={p.resposta} />
                </Revelar>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
