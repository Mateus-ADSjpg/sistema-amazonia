// =====================================================================
// CALENDÁRIO ANUAL
//
// É aqui que a agenda do clube é montada. Cada evento é uma linha da
// lista EVENTOS, logo abaixo. O site cuida sozinho de:
//   · ordenar por data
//   · separar por mês
//   · marcar o que já passou
//   · mostrar qual é o próximo evento e quantos dias faltam
//
// Assim que a diretoria confirmar a agenda oficial, troque
// AGENDA_CONFIRMADA para true e o aviso de "agenda em montagem" some.
// =====================================================================

export const ANO = 2026

// Enquanto false, o site avisa que as datas ainda são um exemplo.
export const AGENDA_CONFIRMADA = false

export const CAPA_CALENDARIO = {
  foto: '/fotos/clube/calendario-capa.jpg',
  titulo: 'Agenda do ano',
  texto: 'Todas as datas do clube em um lugar só: reuniões, acampamentos, eventos da região e programações especiais.',
}

// ---------------------------------------------------------------------
// Tipos de evento (mudam a cor e o ícone do cartão).
// Para criar um tipo novo, acrescente uma linha aqui e use a mesma
// chave no campo "tipo" do evento.
// ---------------------------------------------------------------------
export const TIPOS = {
  clube: { rotulo: 'Clube', icone: 'bandeira', cor: 'var(--ouro)' },
  acampamento: { rotulo: 'Acampamento', icone: 'barraca', cor: 'var(--mata-clara)' },
  regional: { rotulo: 'Região / Associação', icone: 'medalha', cor: 'var(--coroa)' },
  igreja: { rotulo: 'Igreja', icone: 'livro', cor: '#8fa5e8' },
  especial: { rotulo: 'Data especial', icone: 'estrela', cor: '#e88fa5' },
}

// ---------------------------------------------------------------------
// EVENTOS
//
// Campos de cada evento:
//   data     obrigatório — 'AAAA-MM-DD' (ex.: '2026-03-14')
//   fim      só para eventos de vários dias — 'AAAA-MM-DD' do último dia
//   titulo   nome do evento
//   tipo     uma das chaves de TIPOS, acima
//   horario  opcional — ex.: '8h às 17h'
//   local    opcional — onde acontece
//   texto    opcional — uma linha explicando. Texto entre parênteses
//            aparece discreto, como espaço reservado.
//
// Para apagar um evento, apague a linha inteira (do { até o },).
// ---------------------------------------------------------------------
export const EVENTOS = [
  // Ainda não há eventos definidos. Exemplo de como acrescentar um:
  // {
  //   data: '2026-10-16',
  //   fim: '2026-10-18',
  //   titulo: 'Campori da Associação Paulistana',
  //   tipo: 'regional',
  //   horario: '8h às 17h',
  //   local: 'IASD Central de Barueri',
  //   texto: 'Uma linha explicando o evento',
  // },
]

// ---------------------------------------------------------------------
// CULTOS DA SEMANA
//
// Aparecem na página do calendário toda semana, independentemente da
// agenda do ano. Para mudar um horário, troque o texto de "horario".
// ---------------------------------------------------------------------
export const CULTOS = [
  { dia: 'Sábado', periodo: 'Manhã', horario: '9h', titulo: 'Culto de sábado', icone: 'livro' },
  { dia: 'Domingo', periodo: 'Noite', horario: '19h', titulo: 'Culto de domingo', icone: 'estrela' },
  { dia: 'Quarta-feira', periodo: 'Noite', horario: '19h30', titulo: 'Culto de quarta', icone: 'maos' },
]

// ---------------------------------------------------------------------
// Daqui para baixo é o funcionamento do calendário. Não precisa mexer.
// ---------------------------------------------------------------------

export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

// Transforma '2026-03-14' em uma data do dia (sem fuso atrapalhando).
export const paraData = (texto) => {
  const [ano, mes, dia] = String(texto).split('-').map(Number)
  return new Date(ano, (mes || 1) - 1, dia || 1)
}

const hojeZerado = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// Lista pronta para a tela: ordenada, com mês, dia da semana e se já passou.
export const eventosOrganizados = () => {
  const hoje = hojeZerado()

  return EVENTOS.filter((e) => e?.data)
    .map((e) => {
      const inicio = paraData(e.data)
      const fim = e.fim ? paraData(e.fim) : inicio
      return {
        ...e,
        inicio,
        fim,
        mes: inicio.getMonth(),
        diaSemana: DIAS_SEMANA[inicio.getDay()],
        variosDias: fim.getTime() !== inicio.getTime(),
        passou: fim < hoje,
        acontecendoAgora: inicio <= hoje && fim >= hoje,
        diasParaComecar: Math.ceil((inicio - hoje) / 86400000),
      }
    })
    .sort((a, b) => a.inicio - b.inicio)
}

// Primeiro evento que ainda não terminou.
export const proximoEvento = (lista = eventosOrganizados()) => lista.find((e) => !e.passou) ?? null

// Escreve a data do jeito que se fala: "14 de março" ou "3 a 5 de abril".
export const escreverData = (evento) => {
  const dia = evento.inicio.getDate()
  const mes = MESES[evento.inicio.getMonth()].toLowerCase()
  if (!evento.variosDias) return `${dia} de ${mes}`

  const diaFim = evento.fim.getDate()
  const mesFim = MESES[evento.fim.getMonth()].toLowerCase()
  return mes === mesFim ? `${dia} a ${diaFim} de ${mes}` : `${dia} de ${mes} a ${diaFim} de ${mesFim}`
}

// ---------------------------------------------------------------------
// Arquivo .ics — o que faz o botão "Salvar na minha agenda".
// Funciona no celular (Google Agenda, Calendário do iPhone) e no
// computador (Outlook, Apple Calendário).
// ---------------------------------------------------------------------

const comoDataIcs = (data) =>
  `${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}${String(data.getDate()).padStart(2, '0')}`

const limpar = (texto = '') =>
  String(texto)
    .replace(/^\((.*)\)$/, '$1')
    .replace(/[\\;,]/g, (c) => `\\${c}`)
    .replace(/\n/g, '\\n')

export const montarIcs = (eventos, nomeClube = 'Clube Amazônia') => {
  const linhas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Clube Amazonia//Agenda//PT', 'CALSCALE:GREGORIAN']

  eventos.forEach((e, i) => {
    // No formato .ics o último dia não entra, então soma-se um dia.
    const termina = new Date(e.fim)
    termina.setDate(termina.getDate() + 1)

    linhas.push(
      'BEGIN:VEVENT',
      `UID:amazonia-${comoDataIcs(e.inicio)}-${i}@clubeamazonia`,
      `DTSTAMP:${comoDataIcs(new Date())}T000000Z`,
      `DTSTART;VALUE=DATE:${comoDataIcs(e.inicio)}`,
      `DTEND;VALUE=DATE:${comoDataIcs(termina)}`,
      `SUMMARY:${limpar(e.titulo)} — ${limpar(nomeClube)}`,
      e.local ? `LOCATION:${limpar(e.local)}` : null,
      e.texto ? `DESCRIPTION:${limpar(e.texto)}${e.horario ? ` (${limpar(e.horario)})` : ''}` : null,
      'END:VEVENT',
    )
  })

  linhas.push('END:VCALENDAR')
  return linhas.filter(Boolean).join('\r\n')
}

export const baixarIcs = (eventos, nomeArquivo) => {
  const blob = new Blob([montarIcs(eventos)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nomeArquivo
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
