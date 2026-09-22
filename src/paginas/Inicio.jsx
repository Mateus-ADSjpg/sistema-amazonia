import { Link } from 'react-router'
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

  return (
    <>
      <CapaCarrossel />

      <FaixaCorrida
        itens={[
          ...UNIDADES.map((u) => ({ texto: u.nome, cor: u.tema.claro })),
          { texto: CLUBE.hashtag, cor: 'var(--ouro)' },
        ]}
      />

      {/* ================= QUEM SOMOS ================= */}
      <section id="quem-somos" className="secao inicio-sobre">
        <div className="container inicio-sobre__grade">
          <div className="inicio-sobre__texto">
            <Revelar>
              <span className="sobretitulo">01 — Quem somos</span>
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
                efeito={i === 0 ? 'zoom' : i === 1 ? 'direita' : 'subir'}
                atraso={i * 140}
                className={`inicio-sobre__foto inicio-sobre__foto--${i + 1}`}
              >
                <Foto src={foto.src} alt={foto.alt} preencher tom={i === 1 ? 'var(--ouro-escuro)' : 'var(--mata)'} />
              </Revelar>
            ))}
            <div className="inicio-sobre__selo" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="circulo-selo" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                </defs>
                <text>
                  <textPath href="#circulo-selo" textLength="272" lengthAdjust="spacing">
                    DESBRAVADORES · {CLUBE.hashtag.toUpperCase()} ·
                  </textPath>
                </text>
              </svg>
              <img src={CLUBE.logo} alt="" className="inicio-sobre__logo" />
            </div>
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
                <span className="sobretitulo">02 — Unidades</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Quatro unidades, <em>uma só tribo</em>
                </h2>
              </Revelar>
            </div>
            <Revelar atraso={160} className="cabeca-secao__lado">
              <p className="texto-grande">{CAPA_UNIDADES.texto}</p>
            </Revelar>
          </div>

          <Revelar className="paineis-unidades" efeito="zoom">
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
                <span className="sobretitulo">03 — Nossa história</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Uma trilha feita <em>de gente</em>
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
              <Revelar as="li" key={i} className="trilha__marco" atraso={i * 120}>
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
                <span className="sobretitulo">04 — Momentos</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Aventuras que <em>viram memória</em>
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
      <section className="secao inicio-ideais grao">
        <div className="container inicio-ideais__conteudo">
          <Revelar>
            <span className="sobretitulo">O Voto do Desbravador</span>
          </Revelar>
          <Revelar as="blockquote" atraso={100} className="inicio-ideais__voto">
            <span className="inicio-ideais__aspas" aria-hidden="true">“</span>
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
