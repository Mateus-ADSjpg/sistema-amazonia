import { Link, useParams } from 'react-router'
import { buscarUnidade, UNIDADES } from '../conteudo/unidades'
import { deveMostrar } from '../conteudo/util'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import Chamada from '../components/ui/Chamada'
import Emblema from '../components/ui/Emblema'
import Foto from '../components/ui/Foto'
import GaleriaFotos from '../components/ui/GaleriaFotos'
import Icone from '../components/ui/Icone'
import Revelar from '../components/ui/Revelar'
import Texto from '../components/ui/Texto'
import NaoEncontrada from './NaoEncontrada'
import './Unidade.css'

const coresDaUnidade = (u) => ({
  '--u1': u.tema.principal,
  '--u2': u.tema.claro,
  '--u3': u.tema.apoio,
})

export default function Unidade() {
  const { slug } = useParams()
  const unidade = buscarUnidade(slug)
  useTitulo(unidade ? `Unidade ${unidade.nome}` : 'Página não encontrada')

  if (!unidade) return <NaoEncontrada />

  const u = unidade
  const posicao = UNIDADES.indexOf(u) + 1
  const outras = UNIDADES.filter((x) => x.slug !== u.slug)
  const fatos = u.tribo.fatos.filter((f) => deveMostrar(f.valor))

  return (
    // Dentro da página da unidade, o "dourado" vira a cor da unidade.
    <div className="pagina-unidade" style={{ ...coresDaUnidade(u), '--ouro': u.tema.claro }}>
      <CapaPagina
        key={u.slug}
        foto={u.capa}
        sobretitulo={`Unidade ${String(posicao).padStart(2, '0')}`}
        titulo={u.nome}
        texto={u.resumo}
        tom={u.tema.principal}
        tomApoio={u.tema.claro}
      >
        <div className="unidade-capa__extras">
          <Emblema src={u.emblema} alt={`Emblema da unidade ${u.nome}`} letra={u.nome[0]} cor={u.tema.claro} tamanho={72} />
          <ul className="unidade-capa__valores">
            {u.valores.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </CapaPagina>

      <div className="unidade-faixa" aria-hidden="true">
        {u.cores.map((c) => (
          <span key={c.nome} style={{ background: c.hex }} />
        ))}
      </div>

      {/* ---------- A tribo ---------- */}
      <section className="secao">
        <div className="container unidade-tribo">
          <Revelar efeito="esquerda" className="unidade-tribo__foto">
            <Foto src={u.tribo.foto} alt={u.tribo.titulo} proporcao="vertical" tom={u.tema.principal} />
            <span className="unidade-tribo__marca">{u.povo}</span>
          </Revelar>

          <div>
            <Revelar>
              <span className="sobretitulo">A tribo que nos inspira</span>
            </Revelar>
            <Revelar atraso={80}>
              <h2 className="titulo-secao">{u.tribo.titulo}</h2>
            </Revelar>
            <div className="unidade-tribo__texto">
              {u.tribo.paragrafos.map((p, i) => (
                <Revelar as="p" key={i} className="texto-grande" atraso={140 + i * 70}>
                  {p}
                </Revelar>
              ))}
            </div>

            {fatos.length > 0 && (
              <Revelar as="dl" className="unidade-fatos" atraso={200}>
                {fatos.map((f) => (
                  <div key={f.rotulo}>
                    <dt>{f.rotulo}</dt>
                    <Texto as="dd" valor={f.valor} />
                  </div>
                ))}
              </Revelar>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Nossa unidade ---------- */}
      <section className="secao unidade-historia grao">
        <div className="container">
          <div className="unidade-historia__grade">
            <div>
              <Revelar>
                <span className="sobretitulo">Nossa unidade</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  História da <em>{u.nome}</em>
                </h2>
              </Revelar>
              <div className="unidade-historia__texto">
                {u.historia.map((p, i) => (
                  <Revelar as="p" key={i} className="texto-grande" atraso={140 + i * 70}>
                    {p}
                  </Revelar>
                ))}
              </div>
            </div>

            <Revelar efeito="direita" className="identidade">
              <h3 className="identidade__titulo">Identidade</h3>
              <div className="identidade__cores">
                {u.cores.map((c) => (
                  <div key={c.nome} className="identidade__cor">
                    <span style={{ background: c.hex }} />
                    <strong>{c.nome}</strong>
                    <small>{c.hex}</small>
                  </div>
                ))}
              </div>
              {deveMostrar(u.lema) && (
                <div className="identidade__lema">
                  <span>Lema</span>
                  <Texto as="p" valor={u.lema} />
                </div>
              )}
            </Revelar>
          </div>

          {deveMostrar(u.grito) && (
            <Revelar className="grito" efeito="zoom">
              <span className="grito__rotulo">
                <Icone nome="bandeira" tamanho={18} /> Grito de guerra
              </span>
              <Texto as="p" className="grito__texto" valor={u.grito} />
            </Revelar>
          )}
        </div>
      </section>

      {/* ---------- Conselheiros ---------- */}
      {u.conselheiros.length > 0 && (
        <section className="secao">
          <div className="container">
            <div className="cabeca-secao">
              <div>
                <Revelar>
                  <span className="sobretitulo">Quem cuida da unidade</span>
                </Revelar>
                <Revelar atraso={80}>
                  <h2 className="titulo-secao">
                    Nossos <em>conselheiros</em>
                  </h2>
                </Revelar>
              </div>
            </div>
            <div className="pessoas">
              {u.conselheiros.map((p, i) => (
                <Revelar key={p.nome + i} className="pessoa" atraso={i * 90}>
                  <Foto src={p.foto} alt={p.nome} proporcao="quadrada" tom={u.tema.principal} />
                  <h3>{p.nome}</h3>
                  <p>{p.cargo}</p>
                </Revelar>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Galeria da unidade ---------- */}
      <section className="secao unidade-galeria">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Galeria</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Momentos da <em>{u.nome}</em>
                </h2>
              </Revelar>
            </div>
          </div>
          <GaleriaFotos key={u.slug} fotos={u.fotos} tom={u.tema.principal} />
        </div>
      </section>

      {/* ---------- Outras unidades ---------- */}
      <section className="secao outras-unidades">
        <div className="container">
          <Revelar>
            <span className="sobretitulo">Conheça também</span>
          </Revelar>
          <div className="outras-unidades__lista">
            {outras.map((o, i) => (
              <Revelar key={o.slug} atraso={i * 100}>
                <Link to={`/unidades/${o.slug}`} className="cartao-unidade" style={coresDaUnidade(o)}>
                  <Foto src={o.capa} preencher tom={o.tema.principal} />
                  <span className="cartao-unidade__veu" />
                  <span className="cartao-unidade__nome">{o.nome}</span>
                  <span className="cartao-unidade__seta">
                    <Icone nome="setaDiagonal" />
                  </span>
                </Link>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <Chamada tom={u.tema.principal} titulo={`Venha fazer parte da ${u.nome}`} />
    </div>
  )
}
