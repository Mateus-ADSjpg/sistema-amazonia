// =====================================================================
// PÁGINA "SOBRE" — história, atividades, diretoria e ideais
// =====================================================================

export const CAPA_SOBRE = {
  foto: '/fotos/clube/sobre-capa.jpg',
  titulo: 'Nossa história',
  texto: 'Conheça a trajetória, as pessoas e os ideais que movem o Clube Amazônia.',
}

export const HISTORIA = {
  // Texto entre parênteses = espaço reservado (aparece discreto no site).
  introducao: ['(História do clube: como começou, quem fundou e o significado do nome)'],
  foto: '/fotos/historia/fundacao.jpg',
  // Linha do tempo. Adicione, remova ou reordene os marcos à vontade.
  marcos: [
    {
      ano: '20XX',
      titulo: 'A fundação',
      texto: '(O começo do clube)',
      foto: '/fotos/historia/marco-1.jpg',
    },
    {
      ano: '20XX',
      titulo: 'As primeiras unidades',
      texto: '(Como surgiram as unidades)',
      foto: '/fotos/historia/marco-2.jpg',
    },
    {
      ano: '20XX',
      titulo: 'Um acampamento marcante',
      texto: '(Um acampamento marcante)',
      foto: '/fotos/historia/marco-3.jpg',
    },
    {
      ano: '20XX',
      titulo: 'Hoje',
      texto: '(O clube hoje)',
      foto: '/fotos/historia/marco-4.jpg',
    },
  ],
}

// Ícones disponíveis: barraca, bussola, estrela, maos, coracao, livro,
// fogueira, medalha, bandeira, folha.
export const ATIVIDADES = [
  { icone: 'barraca', titulo: 'Acampamentos', texto: 'Aventuras ao ar livre, técnicas de campo e muita convivência.' },
  { icone: 'medalha', titulo: 'Especialidades', texto: 'Aprender habilidades novas em natureza, ciência, artes e muito mais.' },
  { icone: 'livro', titulo: 'Classes', texto: 'Etapas de crescimento pessoal, físico e espiritual para cada idade.' },
  { icone: 'maos', titulo: 'Serviço comunitário', texto: 'Ações que levam ajuda e esperança para a comunidade.' },
  { icone: 'bandeira', titulo: 'Ordem unida', texto: 'Disciplina, trabalho em equipe e apresentações.' },
  { icone: 'coracao', titulo: 'Fé e amizade', texto: 'Valores cristãos vividos no dia a dia do clube.' },
]

// Diretoria: troque os nomes e coloque as fotos em public/fotos/diretoria/
// (foto quadrada, rosto centralizado). Pode acrescentar quantas pessoas quiser,
// copiando uma linha e criando a foto com o mesmo nome de arquivo.
export const DIRETORIA = [
  { nome: '(Nome do diretor)', cargo: 'Diretor', foto: '/fotos/diretoria/diretor.jpg' },
  { nome: '(Nome da diretora associada)', cargo: 'Diretora Associada', foto: '/fotos/diretoria/diretora-associada.jpg' },
  { nome: '(Nome da secretária)', cargo: 'Secretária', foto: '/fotos/diretoria/secretaria.jpg' },
  { nome: '(Nome do tesoureiro)', cargo: 'Tesoureiro', foto: '/fotos/diretoria/tesoureiro.jpg' },
  { nome: '(Nome do capelão)', cargo: 'Capelão', foto: '/fotos/diretoria/capelao.jpg' },
  { nome: '(Nome do instrutor)', cargo: 'Instrutor', foto: '/fotos/diretoria/instrutor.jpg' },
]

// Ideais oficiais dos Desbravadores (fonte: adventistas.org/pt/desbravadores/ideais).
export const IDEAIS = {
  voto: 'Pela graça de Deus, serei puro, bondoso e leal; guardarei a lei do Desbravador, serei servo de Deus e amigo de todos.',
  lei: [
    'Observar a devoção matinal',
    'Cumprir fielmente a parte que me corresponde',
    'Cuidar de meu corpo',
    'Manter a consciência limpa',
    'Ser cortês e obediente',
    'Andar com reverência na casa de Deus',
    'Ter sempre um cântico no coração',
    'Ir aonde Deus mandar',
  ],
  alvo: 'A mensagem do advento a todo o mundo na minha geração',
  lema: 'O amor de Cristo me motiva',
  objetivo: 'Salvar do pecado e guiar no serviço',
}
