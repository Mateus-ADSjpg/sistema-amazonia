import { useMemo, useState } from 'react'
import { CONTATO } from '../conteudo/clube'
import {
  AGENDA_CONFIRMADA,
  ANO,
  CAPA_CALENDARIO,
  CULTOS,
  MESES,
  TIPOS,
  baixarIcs,
  escreverData,
  eventosOrganizados,
  proximoEvento,
} from '../conteudo/calendario'
import { useTitulo } from '../hooks/useTitulo'
import { useBrilho } from '../hooks/useBrilho'
import CapaPagina from '../components/ui/CapaPagina'
import Chamada from '../components/ui/Chamada'
import Icone from '../components/ui/Icone'
import Marca from '../components/ui/Marca'
import Revelar from '../components/ui/Revelar'
import Texto from '../components/ui/Texto'
import './Calendario.css'

const contagem = (evento) => {
  if (evento.acontecendoAgora) return 'Acontecendo agora'
  if (evento.diasParaComecar === 0) return 'É hoje!'
  if (evento.diasParaComecar === 1) return 'É amanhã'
  if (evento.diasParaComecar < 7) return `Faltam ${evento.diasParaComecar} dias`
  const semanas = Math.round(evento.diasParaComecar / 7)
  return semanas === 1 ? 'Falta 1 semana' : `Faltam ${semanas} semanas`
}

export default function Calendario() {
  useTitulo('Agenda do ano')
  const brilho = useBrilho()

  const eventos = useMemo(() => eventosOrganizados(), [])
  const proximo = useMemo(() => proximoEvento(eventos), [eventos])

  const [mes, setMes] = useState(null) // null = o ano todo
  const [soOsProximos, setSoOsProximos] = useState(false)

  const mesesComEventos = useMemo(() => [...new Set(eventos.map((e) => e.mes))].sort((a, b) => a - b), [eventos])

  const visiveis = eventos.filter((e) => (mes === null || e.mes === mes) && (!soOsProximos || !e.passou))

  // Agrupa por mês, mantendo a ordem.
  const grupos = mesesComEventos
    .map((m) => ({ mes: m, itens: visiveis.filter((e) => e.mes === m) }))
    .filter((g) => g.itens.length > 0)

  const reuniao = CONTATO.reunioes

  return (
    <>
      <CapaPagina
        foto={CAPA_CALENDARIO.foto}
        sobretitulo={`Calendário ${ANO}`}
        titulo={CAPA_CALENDARIO.titulo}
        texto={CAPA_CALENDARIO.texto}
        compacta
      />

      {/* ---------- Cultos de toda semana ---------- */}
      <section className="secao agenda-cultos">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <Revelar>
                <span className="sobretitulo">Toda semana</span>
              </Revelar>
              <Revelar atraso={80}>
                <h2 className="titulo-secao">
                  Horários dos <em>cultos</em>
                </h2>
              </Revelar>
            </div>
            <Revelar className="cabeca-secao__lado agenda-cultos__local" atraso={140}>
              <p>
                <strong>{reuniao.igreja}</strong>
                <br />
                {reuniao.local}
              </p>
              {reuniao.mapa && (
                <a href={reuniao.mapa} target="_blank" rel="noopener noreferrer" className="link-seta">
                  <Marca nome="maps" tamanho={17} comCor /> Ver no mapa
                </a>
              )}
            </Revelar>
          </div>

          <ul className="agenda-cultos__grade">
            {CULTOS.map((culto, i) => (
              <Revelar as="li" key={culto.dia} className="agenda-culto brilho" atraso={i * 90} onPointerMove={brilho}>
                <span className="agenda-culto__icone">
                  <Icone nome={culto.icone} tamanho={24} />
                </span>
                <span className="agenda-culto__periodo">{culto.periodo}</span>
                <h3>{culto.dia}</h3>
                <p className="agenda-culto__horario">
                  <Icone nome="relogio" tamanho={18} />
                  {culto.horario}
                </p>
                <p className="agenda-culto__titulo">{culto.titulo}</p>
              </Revelar>
            ))}
          </ul>

          {eventos.length === 0 && (
            <p className="agenda-aviso">
              <Icone nome="calendario" tamanho={18} />
              A agenda do clube para o ano ainda está sendo definida. Assim que as datas forem confirmadas, elas aparecem aqui.
            </p>
          )}
        </div>
      </section>

      {/* ---------- Próximo evento ---------- */}
      {proximo && (
        <section className="secao agenda-topo">
          <div className="container">
            <Revelar className="agenda-proximo brilho" onPointerMove={brilho} style={{ '--cor-tipo': TIPOS[proximo.tipo]?.cor }}>
              <span className="agenda-proximo__selo">
                <span className="agenda-proximo__pulso" />
                Próximo no calendário
              </span>
              <p className="agenda-proximo__contagem">{contagem(proximo)}</p>
              <h2>{proximo.titulo}</h2>
              <ul className="agenda-proximo__dados">
                <li>
                  <Icone nome="calendario" tamanho={18} />
                  {escreverData(proximo)}
                  <span className="agenda-proximo__semana">· {proximo.diaSemana}</span>
                </li>
                {proximo.horario && (
                  <li>
                    <Icone nome="relogio" tamanho={18} />
                    {proximo.horario}
                  </li>
                )}
                {proximo.local && (
                  <li>
                    <Icone nome="local" tamanho={18} />
                    {proximo.local}
                  </li>
                )}
              </ul>
              {proximo.texto && <Texto as="p" className="agenda-proximo__texto" valor={proximo.texto} />}
              <button
                type="button"
                className="botao"
                onClick={() => baixarIcs([proximo], `${proximo.titulo.toLowerCase().replace(/\s+/g, '-')}.ics`)}
              >
                Salvar na minha agenda <Icone nome="baixar" />
              </button>
            </Revelar>
          </div>
        </section>
      )}

      {/* ---------- Lista do ano ---------- */}
      {eventos.length > 0 && (
        <section className="secao agenda-lista-secao">
          <div className="container">
            <div className="cabeca-secao">
              <div>
                <Revelar>
                  <span className="sobretitulo">O ano inteiro</span>
                </Revelar>
                <Revelar atraso={80}>
                  <h2 className="titulo-secao">
                    Agenda <em>{ANO}</em>
                  </h2>
                </Revelar>
              </div>
              <Revelar className="cabeca-secao__lado agenda-legenda" atraso={140}>
                {Object.entries(TIPOS).map(([chave, tipo]) => (
                  <span key={chave} className="agenda-legenda__item" style={{ '--cor-tipo': tipo.cor }}>
                    <Icone nome={tipo.icone} tamanho={15} />
                    {tipo.rotulo}
                  </span>
                ))}
              </Revelar>
            </div>
  
            {!AGENDA_CONFIRMADA && (
              <p className="agenda-aviso">
                <Icone nome="estrela" tamanho={18} />
                Agenda em montagem: as datas abaixo são um exemplo, esperando a confirmação da diretoria.
              </p>
            )}
  
            {/* Filtros */}
            <div className="agenda-filtros">
              <div className="agenda-meses" role="group" aria-label="Filtrar por mês">
                <button
                  type="button"
                  className={`agenda-mes ${mes === null ? 'agenda-mes--ativo' : ''}`}
                  onClick={() => setMes(null)}
                  aria-pressed={mes === null}
                >
                  Ano todo
                </button>
                {mesesComEventos.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`agenda-mes ${mes === m ? 'agenda-mes--ativo' : ''}`}
                    onClick={() => setMes(m)}
                    aria-pressed={mes === m}
                  >
                    {MESES[m].slice(0, 3)}
                  </button>
                ))}
              </div>
  
              <label className="agenda-chave">
                <input type="checkbox" checked={soOsProximos} onChange={(e) => setSoOsProximos(e.target.checked)} />
                <span className="agenda-chave__trilho" aria-hidden="true">
                  <span className="agenda-chave__bolinha" />
                </span>
                Esconder o que já passou
              </label>
            </div>
  
            {/* Eventos */}
            {grupos.length === 0 ? (
              <p className="agenda-vazio">Nenhum evento para mostrar com esse filtro.</p>
            ) : (
              grupos.map((grupo) => (
                <div key={grupo.mes} className="agenda-mes-bloco">
                  <h3 className="agenda-mes-titulo">
                    <span>{MESES[grupo.mes]}</span>
                    <em>{ANO}</em>
                  </h3>
  
                  <ol className="agenda-lista">
                    {grupo.itens.map((evento, i) => {
                      const tipo = TIPOS[evento.tipo] ?? TIPOS.clube
                      return (
                        <Revelar
                          as="li"
                          key={`${evento.data}-${evento.titulo}`}
                          className={`agenda-item brilho ${evento.passou ? 'agenda-item--passou' : ''} ${evento.acontecendoAgora ? 'agenda-item--agora' : ''}`}
                          atraso={Math.min(i * 70, 280)}
                          style={{ '--cor-tipo': tipo.cor }}
                          onPointerMove={brilho}
                        >
                          <div className="agenda-item__dia">
                            <strong>{String(evento.inicio.getDate()).padStart(2, '0')}</strong>
                            {evento.variosDias && <span className="agenda-item__ate">a {String(evento.fim.getDate()).padStart(2, '0')}</span>}
                            <span className="agenda-item__semana">{evento.diaSemana.slice(0, 3)}</span>
                          </div>
  
                          <div className="agenda-item__corpo">
                            <span className="agenda-item__tipo">
                              <Icone nome={tipo.icone} tamanho={14} />
                              {tipo.rotulo}
                            </span>
                            <h4>{evento.titulo}</h4>
                            <Texto as="p" className="agenda-item__texto" valor={evento.texto} />
                            <ul className="agenda-item__dados">
                              <li>
                                <Icone nome="calendario" tamanho={15} />
                                {escreverData(evento)}
                              </li>
                              {evento.horario && (
                                <li>
                                  <Icone nome="relogio" tamanho={15} />
                                  {evento.horario}
                                </li>
                              )}
                              {evento.local && (
                                <li>
                                  <Icone nome="local" tamanho={15} />
                                  {evento.local}
                                </li>
                              )}
                            </ul>
                          </div>
  
                          <div className="agenda-item__acao">
                            {evento.passou ? (
                              <span className="agenda-item__marca">Já aconteceu</span>
                            ) : (
                              <button
                                type="button"
                                className="agenda-item__salvar"
                                onClick={() => baixarIcs([evento], `${evento.titulo.toLowerCase().replace(/\s+/g, '-')}.ics`)}
                                aria-label={`Salvar ${evento.titulo} na agenda do celular`}
                              >
                                <Icone nome="baixar" tamanho={18} />
                                <span>Salvar</span>
                              </button>
                            )}
                          </div>
                        </Revelar>
                      )
                    })}
                  </ol>
                </div>
              ))
            )}
  
            {eventos.length > 0 && (
              <div className="agenda-rodape">
                <button type="button" className="botao botao--vazado" onClick={() => baixarIcs(eventos, `agenda-clube-amazonia-${ANO}.ics`)}>
                  <Icone nome="baixar" /> Salvar o calendário inteiro
                </button>
                <p>
                  O arquivo abre no Google Agenda, no calendário do celular e no Outlook — assim as datas acompanham você mesmo
                  sem internet.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <Chamada />
    </>
  )
}
