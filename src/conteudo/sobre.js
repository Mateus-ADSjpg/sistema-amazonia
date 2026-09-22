// =====================================================================
// PÁGINA "SOBRE" — história, atividades, diretoria e ideais
// =====================================================================

export const CAPA_SOBRE = {
  foto: '/fotos/clube/sobre-capa.jpg',
  titulo: 'Nossa história',
  texto: 'Conheça a trajetória, as pessoas e os ideais que movem o Clube Amazônia.',
}

export const HISTORIA = {
  // PREENCHER: texto de abertura da história do clube.
  introducao: [
    'Escreva aqui como o clube começou: em que ano, em qual igreja, quem teve a ideia e quem foram os primeiros desbravadores.',
    'Conte também por que o nome Amazônia foi escolhido e o que o clube representa para a comunidade de Barueri.',
  ],
  foto: '/fotos/historia/fundacao.jpg',
  // Linha do tempo. Adicione, remova ou reordene os marcos à vontade.
  marcos: [
    {
      ano: '20XX',
      titulo: 'A fundação',
      texto: 'Descreva o primeiro ano do clube: a primeira reunião, o primeiro diretor e quantos desbravadores começaram.',
      foto: '/fotos/historia/marco-1.jpg',
    },
    {
      ano: '20XX',
      titulo: 'As primeiras unidades',
      texto: 'Conte quando surgiram as unidades Suruí, Suyá, Xavantes e Ye\'kwana e como os nomes foram escolhidos.',
      foto: '/fotos/historia/marco-2.jpg',
    },
    {
      ano: '20XX',
      titulo: 'Um acampamento marcante',
      texto: 'Registre um acampamento, campori ou evento que marcou a história do clube.',
      foto: '/fotos/historia/marco-3.jpg',
    },
    {
      ano: '20XX',
      titulo: 'Hoje',
      texto: 'Mostre como o clube está hoje: quantos membros, conquistas recentes e planos para o futuro.',
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

// PREENCHER: nomes e fotos da diretoria (foto quadrada, rosto centralizado).
export const DIRETORIA = [
  { nome: 'Nome do Diretor', cargo: 'Diretor', foto: '/fotos/diretoria/diretor.jpg' },
  { nome: 'Nome da Diretora Associada', cargo: 'Diretora Associada', foto: '/fotos/diretoria/diretora-associada.jpg' },
  { nome: 'Nome da Secretária', cargo: 'Secretária', foto: '/fotos/diretoria/secretaria.jpg' },
  { nome: 'Nome do Tesoureiro', cargo: 'Tesoureiro', foto: '/fotos/diretoria/tesoureiro.jpg' },
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
