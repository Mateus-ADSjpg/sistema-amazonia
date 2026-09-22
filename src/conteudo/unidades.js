// =====================================================================
// UNIDADES
// Cada unidade tem sua própria página em /unidades/<slug>.
// As cores de "tema" pintam a página inteira da unidade:
//   principal = cor forte da unidade (fundos e degradês)
//   claro     = cor que aparece bem sobre fundo escuro (títulos, detalhes)
//   apoio     = segunda cor do degradê
// Fotos de cada unidade: public/fotos/unidades/<slug>/
// =====================================================================

// Capa da página /unidades
export const CAPA_UNIDADES = {
  foto: '/fotos/unidades/capa.jpg',
  titulo: 'Quatro tribos, um só clube',
  texto: 'Cada unidade leva o nome de um povo indígena brasileiro e tem suas próprias cores, história e grito de guerra.',
}

// Cria a lista de fotos 1.jpg, 2.jpg, ... de uma unidade.
// Para ter mais fotos, aumente a quantidade (ex.: fotosDaUnidade('surui', 10)).
const FORMATOS = ['horizontal', 'vertical', 'quadrada', 'vertical', 'horizontal', 'quadrada']
const fotosDaUnidade = (slug, quantidade = 6) =>
  Array.from({ length: quantidade }, (_, i) => ({
    src: `/fotos/unidades/${slug}/${i + 1}.jpg`,
    legenda: '',
    formato: FORMATOS[i % FORMATOS.length],
  }))

// Textos-guia usados enquanto você não escreve os textos de cada unidade.
const guiaTribo = (povo) => [
  `Escreva aqui quem são os ${povo}: onde vivem, qual língua falam e como é a vida na aldeia.`,
  'Conte sobre os costumes, festas, artesanato e a relação desse povo com a floresta.',
  'Explique por que esse povo inspira a unidade e o que os desbravadores aprendem com ele.',
]

const guiaHistoria = [
  'Conte como a unidade começou: em que ano, quem foi o primeiro conselheiro e quem foram os primeiros membros.',
  'Registre conquistas, acampamentos marcantes e momentos especiais da unidade.',
]

export const UNIDADES = [
  {
    slug: 'surui',
    nome: 'Suruí',
    povo: 'Paiter Suruí',
    tema: { principal: '#2E7D32', claro: '#7CCB7F', apoio: '#E8F5E9' },
    cores: [
      { nome: 'Verde', hex: '#2E7D32' },
      { nome: 'Branco', hex: '#FFFFFF' },
    ],
    valores: ['Bravura', 'Superação', 'Harmonia com a natureza'],
    resumo: 'Identidade em branco e verde. Focada em bravura, superação e harmonia com a natureza.',
    lema: 'PREENCHER: lema da unidade',
    grito: 'PREENCHER: grito de guerra da unidade',
    capa: '/fotos/unidades/surui/capa.jpg',
    emblema: '/fotos/unidades/surui/emblema.png',
    tribo: {
      titulo: 'O povo Paiter Suruí',
      paragrafos: guiaTribo('Paiter Suruí'),
      fatos: [
        { rotulo: 'Onde vivem', valor: 'PREENCHER' },
        { rotulo: 'Língua', valor: 'PREENCHER' },
        { rotulo: 'Marca cultural', valor: 'PREENCHER' },
      ],
      foto: '/fotos/unidades/surui/tribo.jpg',
    },
    historia: guiaHistoria,
    conselheiros: [
      { nome: 'Nome do(a) Conselheiro(a)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/surui/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('surui'),
  },
  {
    slug: 'suya',
    nome: 'Suyá',
    povo: 'Suyá (Kĩsêdjê)',
    tema: { principal: '#1A3A7A', claro: '#F2C230', apoio: '#D32F2F' },
    cores: [
      { nome: 'Azul-marinho', hex: '#1A3A7A' },
      { nome: 'Amarelo', hex: '#F2C230' },
      { nome: 'Vermelho', hex: '#D32F2F' },
    ],
    valores: ['Liderança', 'União'],
    resumo: 'Identidade em azul-marinho, com detalhes em amarelo e vermelho. Espírito de liderança e união.',
    lema: 'PREENCHER: lema da unidade',
    grito: 'PREENCHER: grito de guerra da unidade',
    capa: '/fotos/unidades/suya/capa.jpg',
    emblema: '/fotos/unidades/suya/emblema.png',
    tribo: {
      titulo: 'O povo Suyá',
      paragrafos: guiaTribo('Suyá (Kĩsêdjê)'),
      fatos: [
        { rotulo: 'Onde vivem', valor: 'PREENCHER' },
        { rotulo: 'Língua', valor: 'PREENCHER' },
        { rotulo: 'Marca cultural', valor: 'PREENCHER' },
      ],
      foto: '/fotos/unidades/suya/tribo.jpg',
    },
    historia: guiaHistoria,
    conselheiros: [
      { nome: 'Nome do(a) Conselheiro(a)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/suya/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('suya'),
  },
  {
    slug: 'xavantes',
    nome: 'Xavantes',
    povo: 'Xavante (A\'uwẽ)',
    tema: { principal: '#C62828', claro: '#FF6B5E', apoio: '#141414' },
    cores: [
      { nome: 'Preto', hex: '#141414' },
      { nome: 'Vermelho', hex: '#C62828' },
    ],
    valores: ['Força', 'Energia', 'Determinação'],
    resumo: 'Identidade preta com detalhes marcantes em vermelho. Força, energia e determinação.',
    lema: 'PREENCHER: lema da unidade',
    grito: 'PREENCHER: grito de guerra da unidade',
    capa: '/fotos/unidades/xavantes/capa.jpg',
    emblema: '/fotos/unidades/xavantes/emblema.png',
    tribo: {
      titulo: 'O povo Xavante',
      paragrafos: guiaTribo('Xavante (A\'uwẽ)'),
      fatos: [
        { rotulo: 'Onde vivem', valor: 'PREENCHER' },
        { rotulo: 'Língua', valor: 'PREENCHER' },
        { rotulo: 'Marca cultural', valor: 'PREENCHER' },
      ],
      foto: '/fotos/unidades/xavantes/tribo.jpg',
    },
    historia: guiaHistoria,
    conselheiros: [
      { nome: 'Nome do(a) Conselheiro(a)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/xavantes/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('xavantes'),
  },
  {
    slug: 'yekwana',
    nome: "Ye'kwana",
    povo: "Ye'kwana",
    tema: { principal: '#7B3FA6', claro: '#C9A7E8', apoio: '#FFFFFF' },
    cores: [
      { nome: 'Roxo', hex: '#7B3FA6' },
      { nome: 'Lilás', hex: '#C9A7E8' },
      { nome: 'Branco', hex: '#FFFFFF' },
    ],
    valores: ['Criatividade', 'Foco', 'Companheirismo'],
    resumo: 'Identidade roxa e lilás com detalhes em branco. Criatividade, foco e companheirismo.',
    lema: 'PREENCHER: lema da unidade',
    grito: 'PREENCHER: grito de guerra da unidade',
    capa: '/fotos/unidades/yekwana/capa.jpg',
    emblema: '/fotos/unidades/yekwana/emblema.png',
    tribo: {
      titulo: "O povo Ye'kwana",
      paragrafos: guiaTribo("Ye'kwana"),
      fatos: [
        { rotulo: 'Onde vivem', valor: 'PREENCHER' },
        { rotulo: 'Língua', valor: 'PREENCHER' },
        { rotulo: 'Marca cultural', valor: 'PREENCHER' },
      ],
      foto: '/fotos/unidades/yekwana/tribo.jpg',
    },
    historia: guiaHistoria,
    conselheiros: [
      { nome: 'Nome do(a) Conselheiro(a)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/yekwana/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('yekwana'),
  },
]

export const NOMES_UNIDADES = UNIDADES.map((u) => u.nome)

export const buscarUnidade = (slug) => UNIDADES.find((u) => u.slug === slug)
