import { Link } from 'react-router'
import { escreverData, eventosOrganizados, proximoEvento } from '../conteudo/calendario'
import { ALBUM_FOTOS_URL, CLUBE } from '../conteudo/clube'
import { FOTOS_DESTAQUE } from '../conteudo/galeria'
import { NUMEROS, QUEM_SOMOS } from '../conteudo/inicio'
import { HISTORIA, IDEAIS } from '../conteudo/sobre'
import { CAPA_UNIDADES, UNIDADES } from '../conteudo/unidades'
import { MODO_DESENVOLVIMENTO } from '../conteudo/util'
import { useTitulo } from '../hooks/useTitulo'
import CapaCarrossel from '../components/inicio/CapaCarrossel'
import Chamada from '../components/ui/Chamada'
import Contador from '../components/ui/Contador'
import FaixaCorrida from '../components/ui/FaixaCorrida'
import Foto from '../components/ui/Foto'
import GaleriaFotos from '../components/ui/GaleriaFotos'
import Icone from '../components/ui/Icone'
import Revelar from '../components/ui/Revelar'
import './Inicio.css'

export default function Inicio() {
  useTitulo(null)

  const numeros = NUMEROS.filter((n) => n.valor > 0 || MODO_DESENVOLVIMENTO)
  const proximo = proximoEvento(eventosOrganizados())

  return (
    <>
      <CapaCarrossel />

      <FaixaCorrida
        itens={[
          ...UNIDADES.map((u) => ({ texto: u.nome, cor: u.tema.claro })),
          { texto: CLUBE.hashtag, cor: 'var(--ouro)' },
        ]}
      />


      {/* ============ PRÓXIMO EVENTO (vem da agenda) ============ */}
      {proximo && (
        <section className="inicio-proximo" aria-label="Próximo evento do clube">
          <div className="container inicio-proximo__caixa">
            <span className="inicio-proximo__rotulo">
              <Icone nome="calendario" tamanho={16} />
              Próximo no calendário
            </span>
            <p className="inicio-proximo__evento">
              <strong>{proximo.titulo}</strong>
              <span>{escreverData(proximo)}</span>
            </p>
            <Link to="/calendario" className="link-seta inicio-proximo__link">
              Ver a agenda do ano <Icone nome="seta" />
            </Link>
          </div>
        </section>
      )}

      {/* ================= QUEM SOMOS ================= */}
      <section id="quem-somos" className="secao inicio-sobre">
        <div className="container inicio-sobre__grade">
          <div className="inicio-sobre__texto">
            <Revelar>
              <span className="sobretitulo">Quem somos</span>
            </Revelar>
            <Revelar atraso={80}>
              <h2 className="titulo-secao">{QUEM_SOMOS.titulo}</h2>
            </Revelar>
            <div className="inicio-sobre__paragrafos">
              {QUEM_SOMOS.paragrafos.map((p, i) => (
                <Revelar as="p" key={i} className="texto-grande" atraso={160 + i * 80}>
                  {p}
                </Revelar>
              ))}
            </div>
            <Revelar atraso={320}>
              <Link to="/sobre" className="link-seta">
                Conheça nossa história <Icone nome="seta" />
              </Link>
            </Revelar>
          </div>

          <div className="inicio-sobre__colagem">
            {QUEM_SOMOS.fotos.slice(0, 3).map((foto, i) => (
              <Revelar
                key={foto.src}
                atraso={i * 80}
                className={`inicio-sobre__foto inicio-sobre__foto--${i + 1}`}
              >
                <Foto src={foto.src} alt={foto.alt} preencher tom="var(--mata)" />
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NÚMEROS ================= */}
      {numeros.length >= 2 && (
        <section className="inicio-numeros" aria-label="O clube em números">
          <div className="container inicio-numeros__grade" style={{ '--qtd': numeros.length }}>
            {numeros.map((n, i) => (
              <Revelar key={n.rotulo} className="inicio-numeros__item" atraso={i * 100}>
                <strong className={n.valor === 0 ? 'pendente' : undefined}>
                  <Contador valor={n.valor} sufixo={n.sufixo} />
                </strong>
                <span>{n.rotulo}</span>
              </Revelar>
            ))}
          </div>
        </section>
      )}

      {/* ================= UNIDADES ================= */}
      <section className="secao inicio-unidades">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Unidades</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Quatro unidades, uma só tribo
                </h2>
              </Revelar>
            </div>
            <Revelar atraso={160} className="cabeca-secao__lado">
              <p className="texto-grande">{CAPA_UNIDADES.texto}</p>
            </Revelar>
          </div>

          <Revelar className="paineis-unidades">
            {UNIDADES.map((u, i) => (
              <Link
                key={u.slug}
                to={`/unidades/${u.slug}`}
                className="painel-unidade"
                style={{ '--u1': u.tema.principal, '--u2': u.tema.claro, '--u3': u.tema.apoio }}
              >
                <Foto src={u.capa} preencher tom={u.tema.principal} />
                <span className="painel-unidade__veu" />
                <span className="painel-unidade__numero">{String(i + 1).padStart(2, '0')}</span>
                <div className="painel-unidade__conteudo">
                  <h3 className="painel-unidade__nome">{u.nome}</h3>
                  <p className="painel-unidade__publico">
                    {u.publico} · {u.idade}
                  </p>
                  <div className="painel-unidade__detalhes">
                    <p>{u.resumo}</p>
                    <ul>
                      {u.valores.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="painel-unidade__cta">
                    Conhecer a unidade <Icone nome="seta" tamanho={18} />
                  </span>
                </div>
              </Link>
            ))}
          </Revelar>
        </div>
      </section>

      {/* ================= HISTÓRIA ================= */}
      <section className="secao inicio-historia">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Nossa história</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Uma trilha feita de gente
                </h2>
              </Revelar>
            </div>
            <Revelar atraso={160} className="cabeca-secao__lado">
              <Link to="/sobre" className="link-seta">
                Ver a história completa <Icone nome="seta" />
              </Link>
            </Revelar>
          </div>

          <ol className="trilha">
            {HISTORIA.marcos.slice(0, 4).map((m, i) => (
              <Revelar as="li" key={i} className="trilha__marco" atraso={i * 80}>
                <span className="trilha__ano">{m.ano}</span>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= GALERIA ================= */}
      <section className="secao inicio-galeria">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Momentos</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Aventuras que viram memória
                </h2>
              </Revelar>
            </div>
            <Revelar atraso={160} className="cabeca-secao__lado inicio-galeria__botoes">
              <Link to="/galeria" className="botao botao--vazado">
                Ver galeria <Icone nome="seta" />
              </Link>
              <a href={ALBUM_FOTOS_URL} target="_blank" rel="noopener noreferrer" className="link-seta">
                Álbum no Google Fotos <Icone nome="setaDiagonal" />
              </a>
            </Revelar>
          </div>
          <GaleriaFotos fotos={FOTOS_DESTAQUE} />
        </div>
      </section>

      {/* ================= IDEAIS ================= */}
      <section className="secao inicio-ideais">
        <div className="container inicio-ideais__conteudo">
          <Revelar>
            <span className="sobretitulo">O Voto do Desbravador</span>
          </Revelar>
          <Revelar as="blockquote" atraso={100} className="inicio-ideais__voto">
            {IDEAIS.voto}
          </Revelar>
          <Revelar atraso={200} className="inicio-ideais__lema">
            <span>Lema</span>
            <strong>{IDEAIS.lema}</strong>
          </Revelar>
          <Revelar atraso={260}>
            <Link to="/sobre#ideais" className="link-seta">
              Conheça a Lei e os ideais <Icone nome="seta" />
            </Link>
          </Revelar>
        </div>
      </section>

      <Chamada />
    </>
  )
}
