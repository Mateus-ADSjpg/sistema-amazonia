// =====================================================================
// PÁGINA INICIAL
// =====================================================================

// Destaques da capa: eles se revezam sozinhos (como no site da FIAP).
// Adicione, remova ou reordene à vontade. O primeiro é o principal.
//   foto:    imagem de fundo (fica escurecida para o texto ler bem)
//   posicao: qual parte da foto aparece (ex.: 'center 60%', '30% 80%')
//   botoes:  para: endereço dentro do site | whatsapp: true abre o WhatsApp
export const DESTAQUES = [
  {
    foto: '/fotos/clube/capa.jpg',
    posicao: 'center 62%',
    chamada: 'Clube de Desbravadores',
    titulo: 'Amazônia',
    texto: 'Desenvolvendo caráter, liderança e amor pela natureza. Todos juntos por um só objetivo!',
    botoes: [
      { texto: 'Conheça o clube', para: '/sobre' },
      { texto: 'Nossas unidades', para: '/unidades', vazado: true },
    ],
  },
  {
    foto: '/fotos/clube/capa.jpg',
    posicao: '20% 75%',
    chamada: "Suruí · Suyá · Xavantes · Ye'kwana",
    titulo: 'Quatro tribos, um só clube',
    texto: 'Cada unidade tem suas cores, sua história e seu grito de guerra.',
    botoes: [{ texto: 'Conhecer as unidades', para: '/unidades' }],
  },
  {
    foto: '/fotos/clube/capa.jpg',
    posicao: '80% 70%',
    chamada: '#AmazôniaMeMove',
    titulo: 'Venha ser um desbravador',
    texto: 'Aventura, amizade e fé para crianças e adolescentes. Fale com a diretoria e venha conhecer uma reunião.',
    botoes: [
      { texto: 'Quero participar', whatsapp: true },
      { texto: 'Ver a galeria', para: '/galeria', vazado: true },
    ],
  },
]

// Tempo de cada destaque na tela, em milissegundos.
// 5000 = 5 segundos. Diminua para passar mais rápido, aumente para dar
// mais tempo de leitura (abaixo de 4000 fica cansativo).
export const TEMPO_DESTAQUE = 5000

export const QUEM_SOMOS = {
  titulo: 'Mais que um clube, uma grande tribo',
  paragrafos: [
    'O Clube de Desbravadores Amazônia, localizado em Barueri - SP, atua com a missão de guiar juvenis e adolescentes no desenvolvimento físico, mental e espiritual.',
    'Inspirados pelas riquezas e grandiosidade da Amazônia, trabalhamos em equipe com as nossas unidades para formar cidadãos íntegros e líderes capacitados.',
  ],
  // Três fotos para a colagem ao lado do texto.
  fotos: [
    { src: '/fotos/clube/quem-somos-1.jpg', alt: 'Desbravadores do clube em atividade' },
    { src: '/fotos/clube/quem-somos-2.jpg', alt: 'Acampamento do clube' },
    { src: '/fotos/clube/quem-somos-3.jpg', alt: 'Cerimônia do clube' },
  ],
}

// Números que "contam" na tela. Troque os 0 pelos números reais.
export const NUMEROS = [
  { valor: 4, rotulo: 'Unidades' },
  { valor: 0, sufixo: '+', rotulo: 'Desbravadores' }, // PREENCHER
  { valor: 0, rotulo: 'Anos de história' }, // PREENCHER
  { valor: 0, sufixo: '+', rotulo: 'Acampamentos' }, // PREENCHER
]

export const CHAMADA_FINAL = {
  titulo: 'Venha ser um desbravador',
  texto: 'Crianças e adolescentes são bem-vindos para viver aventuras, aprender na natureza e crescer em comunidade. Fale com a nossa diretoria e venha conhecer uma reunião.',
}
