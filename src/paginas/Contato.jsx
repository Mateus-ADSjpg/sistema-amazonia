import { CLUBE, CONTATO, linkWhatsapp } from '../conteudo/clube'
import { CAPA_CONTATO, PERGUNTAS } from '../conteudo/contato'
import { deveMostrar } from '../conteudo/util'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import Icone from '../components/ui/Icone'
import Marca from '../components/ui/Marca'
import Revelar from '../components/ui/Revelar'
import Texto from '../components/ui/Texto'
import { useBrilho } from '../hooks/useBrilho'
import './Contato.css'

export default function Contato() {
  useTitulo('Contato')
  const brilho = useBrilho()

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
          <Revelar className="contato-cartao contato-cartao--destaque brilho" onPointerMove={brilho}>
            <span className="contato-cartao__icone contato-cartao__icone--whatsapp">
              <Marca nome="whatsapp" tamanho={30} />
            </span>
            <h2>Fale pelo WhatsApp</h2>
            <p>O jeito mais rápido de tirar dúvidas e combinar sua visita.</p>
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="botao botao--verde">
              <Marca nome="whatsapp" tamanho={18} /> Chamar a diretoria
            </a>
          </Revelar>

          <Revelar className="contato-cartao brilho" atraso={100} onPointerMove={brilho}>
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
                <span>
                  <strong>{CONTATO.reunioes.igreja}</strong>
                  <br />
                  {CONTATO.reunioes.local}
                </span>
              </li>
            </ul>
            {CONTATO.reunioes.mapa && (
              <a href={CONTATO.reunioes.mapa} target="_blank" rel="noopener noreferrer" className="link-seta contato-mapa">
                <Marca nome="maps" tamanho={17} comCor /> Ver no mapa <Icone nome="setaDiagonal" />
              </a>
            )}
          </Revelar>

          <Revelar className="contato-cartao brilho" atraso={200} onPointerMove={brilho}>
            <span className="contato-cartao__icone contato-cartao__icone--instagram">
              <Marca nome="instagram" tamanho={26} />
            </span>
            <h2>Redes sociais</h2>
            <ul className="contato-cartao__lista contato-cartao__lista--redes">
              {CONTATO.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${CONTATO.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contato-rede contato-rede--instagram"
                  >
                    <Marca nome="instagram" tamanho={20} />
                    <span>
                      <strong>Instagram</strong>
                      @{CONTATO.instagram}
                    </span>
                    <Icone nome="setaDiagonal" tamanho={16} />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={linkWhatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contato-rede contato-rede--whatsapp"
                >
                  <Marca nome="whatsapp" tamanho={20} />
                  <span>
                    <strong>WhatsApp</strong>
                    Diretoria do clube
                  </span>
                  <Icone nome="setaDiagonal" tamanho={16} />
                </a>
              </li>
              {CONTATO.email && (
                <li>
                  <a href={`mailto:${CONTATO.email}`} className="contato-rede">
                    <Icone nome="email" tamanho={20} />
                    <span>
                      <strong>E-mail</strong>
                      {CONTATO.email}
                    </span>
                    <Icone nome="setaDiagonal" tamanho={16} />
                  </a>
                </li>
              )}
              <li>
                <span className="contato-rede contato-rede--local">
                  <Icone nome="globo" tamanho={20} />
                  <span>
                    <strong>Onde estamos</strong>
                    {CLUBE.cidade} · {CLUBE.regiao}
                  </span>
                </span>
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
