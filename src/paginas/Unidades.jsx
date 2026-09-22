import { Link } from 'react-router'
import { CAPA_UNIDADES, UNIDADES } from '../conteudo/unidades'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import Chamada from '../components/ui/Chamada'
import Emblema from '../components/ui/Emblema'
import Foto from '../components/ui/Foto'
import Icone from '../components/ui/Icone'
import Revelar from '../components/ui/Revelar'
import './Unidades.css'

export default function Unidades() {
  useTitulo('Unidades')

  return (
    <>
      <CapaPagina
        foto={CAPA_UNIDADES.foto}
        sobretitulo="Nossas unidades"
        titulo={CAPA_UNIDADES.titulo}
        texto={CAPA_UNIDADES.texto}
      >
        <div className="unidades-capa__atalhos">
          {UNIDADES.map((u) => (
            <a key={u.slug} href={`#${u.slug}`} style={{ '--cor-unidade': u.tema.claro }}>
              <span className="cabecalho__ponto" />
              {u.nome}
            </a>
          ))}
        </div>
      </CapaPagina>

      <section className="secao">
        <div className="container lista-unidades">
          {UNIDADES.map((u, i) => (
            <article
              key={u.slug}
              id={u.slug}
              className="linha-unidade"
              style={{ '--u1': u.tema.principal, '--u2': u.tema.claro, '--u3': u.tema.apoio }}
            >
              <Revelar efeito={i % 2 ? 'direita' : 'esquerda'} className="linha-unidade__imagem">
                <Link to={`/unidades/${u.slug}`} tabIndex={-1} aria-hidden="true">
                  <Foto src={u.capa} alt="" proporcao="horizontal" tom={u.tema.principal} />
                  <span className="linha-unidade__faixa" />
                </Link>
              </Revelar>

              <Revelar className="linha-unidade__texto" atraso={120}>
                <div className="linha-unidade__topo">
                  <Emblema src={u.emblema} alt={`Emblema da unidade ${u.nome}`} letra={u.nome[0]} cor={u.tema.claro} tamanho={56} />
                  <span className="linha-unidade__numero">Unidade {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="linha-unidade__nome">{u.nome}</h2>
                <p className="linha-unidade__povo">Inspirada no povo {u.povo}</p>
                <p className="linha-unidade__resumo">{u.resumo}</p>
                <div className="linha-unidade__cores" aria-label="Cores da unidade">
                  {u.cores.map((c) => (
                    <span key={c.nome} title={c.nome} style={{ background: c.hex }} />
                  ))}
                </div>
                <Link to={`/unidades/${u.slug}`} className="botao linha-unidade__botao">
                  Conhecer a {u.nome} <Icone nome="seta" />
                </Link>
              </Revelar>
            </article>
          ))}
        </div>
      </section>

      <Chamada titulo="Qual será a sua unidade?" />
    </>
  )
}
