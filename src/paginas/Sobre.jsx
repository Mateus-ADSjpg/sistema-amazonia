import { ATIVIDADES, CAPA_SOBRE, DIRETORIA, HISTORIA, IDEAIS } from '../conteudo/sobre'
import { classeModelo } from '../conteudo/util'
import { useTitulo } from '../hooks/useTitulo'
import { useBrilho } from '../hooks/useBrilho'
import CapaPagina from '../components/ui/CapaPagina'
import CarrosselPessoas from '../components/ui/CarrosselPessoas'
import Chamada from '../components/ui/Chamada'
import Foto from '../components/ui/Foto'
import Icone from '../components/ui/Icone'
import Revelar from '../components/ui/Revelar'
import Texto from '../components/ui/Texto'
import './Sobre.css'

export default function Sobre() {
  useTitulo('Nossa história')
  const brilho = useBrilho()

  return (
    <>
      <CapaPagina foto={CAPA_SOBRE.foto} sobretitulo="Sobre o clube" titulo={CAPA_SOBRE.titulo} texto={CAPA_SOBRE.texto} />

      {/* ---------- Introdução ---------- */}
      <section className="secao">
        <div className="container sobre-intro">
          <Revelar efeito="esquerda" className="sobre-intro__foto">
            <Foto src={HISTORIA.foto} alt="Início do clube" proporcao="vertical" />
          </Revelar>
          <div>
            <Revelar>
              <span className="sobretitulo">Como tudo começou</span>
            </Revelar>
            <Revelar atraso={80}>
              <h2 className="titulo-secao">
                De uma ideia a <em>uma tribo inteira</em>
              </h2>
            </Revelar>
            <div className="sobre-intro__texto">
              {HISTORIA.introducao.map((p, i) => (
                <Revelar as="p" key={i} className={`texto-grande ${classeModelo(p)}`} atraso={160 + i * 80}>
                  {p}
                </Revelar>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Linha do tempo ---------- */}
      <section className="secao sobre-linha">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Linha do tempo</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Marcos da <em>nossa trilha</em>
                </h2>
              </Revelar>
            </div>
          </div>

          <ol className="linha-tempo">
            {HISTORIA.marcos.map((m, i) => (
              <li key={i} className="linha-tempo__item">
                <Revelar efeito={i % 2 ? 'direita' : 'esquerda'} className="linha-tempo__foto">
                  <Foto src={m.foto} alt={m.titulo} proporcao="horizontal" tom={i % 2 ? 'var(--ouro-escuro)' : 'var(--mata)'} />
                </Revelar>
                <span className="linha-tempo__ponto" aria-hidden="true" />
                <Revelar className="linha-tempo__texto" atraso={120}>
                  <span className="linha-tempo__ano">{m.ano}</span>
                  <h3>{m.titulo}</h3>
                  <Texto as="p" valor={m.texto} />
                </Revelar>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- O que fazemos ---------- */}
      <section className="secao">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">O que fazemos</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Aprender, servir e <em>explorar</em>
                </h2>
              </Revelar>
            </div>
          </div>
          <div className="atividades">
            {ATIVIDADES.map((a, i) => (
              <Revelar key={a.titulo} className="atividade brilho" atraso={(i % 3) * 100} onPointerMove={brilho}>
                <span className="atividade__icone">
                  <Icone nome={a.icone} tamanho={28} />
                </span>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Diretoria ---------- */}
      <section className="secao sobre-diretoria">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Liderança</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Nossa <em>diretoria</em>
                </h2>
              </Revelar>
            </div>
            <Revelar className="cabeca-secao__lado" atraso={140}>
              <p className="sobre-diretoria__dica">
                Quem cuida do clube no dia a dia. Arraste para o lado ou use as setas para conhecer todo mundo.
              </p>
            </Revelar>
          </div>
          <Revelar>
            <CarrosselPessoas pessoas={DIRETORIA} rotulo="Diretoria do clube" />
          </Revelar>
        </div>
      </section>

      {/* ---------- Ideais ---------- */}
      <section id="ideais" className="secao sobre-ideais grao">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Ideais dos Desbravadores</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  O que <em>nos guia</em>
                </h2>
              </Revelar>
            </div>
          </div>

          <div className="ideais">
            <Revelar className="ideal ideal--voto">
              <span className="ideal__rotulo">Voto</span>
              <blockquote>{IDEAIS.voto}</blockquote>
            </Revelar>

            <Revelar className="ideal ideal--lei" atraso={100}>
              <span className="ideal__rotulo">Lei</span>
              <p className="ideal__intro">A Lei do Desbravador ordena-me:</p>
              <ol>
                {IDEAIS.lei.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </Revelar>

            {[
              ['Alvo', IDEAIS.alvo],
              ['Lema', IDEAIS.lema],
              ['Objetivo', IDEAIS.objetivo],
            ].map(([rotulo, texto], i) => (
              <Revelar key={rotulo} className={i === 2 ? 'ideal ideal--largo' : 'ideal'} atraso={i * 100}>
                <span className="ideal__rotulo">{rotulo}</span>
                <p className="ideal__frase">{texto}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <Chamada />
    </>
  )
}
