// =====================================================================
// UNIDADES
// Cada unidade tem sua própria página em /unidades/<slug>.
// As cores de "tema" pintam a página inteira da unidade:
//   principal = cor forte da unidade (fundos e degradês)
//   claro     = cor que aparece bem sobre fundo escuro (títulos, detalhes)
//   apoio     = segunda cor do degradê
// Fotos de cada unidade: public/fotos/unidades/<slug>/
//
// Textos entre parênteses são espaços reservados: aparecem no site com
// um visual discreto, mostrando o que ainda falta escrever.
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

export const UNIDADES = [
  {
    slug: 'surui',
    nome: 'Suruí',
    povo: 'Paiter Suruí',
    publico: 'Meninos',
    idade: '13 a 15 anos',
    tema: { principal: '#2E7D32', claro: '#7CCB7F', apoio: '#E8F5E9' },
    cores: [
      { nome: 'Verde', hex: '#2E7D32' },
      { nome: 'Branco', hex: '#FFFFFF' },
    ],
    valores: ['Bravura', 'Superação', 'Harmonia com a natureza'],
    resumo: 'Identidade em branco e verde. Focada em bravura, superação e harmonia com a natureza.',
    grito: '(Grito de guerra)',
    capa: '/fotos/unidades/surui/capa.jpg',
    emblema: '/fotos/unidades/surui/emblema.png',
    tribo: {
      titulo: 'O povo Paiter Suruí',
      paragrafos: ['(Texto sobre o povo Paiter Suruí)'],
      fatos: [
        { rotulo: 'Onde vivem', valor: '(região)' },
        { rotulo: 'Língua', valor: '(família linguística)' },
        { rotulo: 'Marca cultural', valor: '(costume marcante)' },
      ],
      foto: '/fotos/unidades/surui/tribo.jpg',
    },
    historia: ['(História da unidade Suruí)'],
    conselheiros: [
      { nome: '(Nome do conselheiro)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/surui/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('surui'),
  },
  {
    slug: 'suya',
    nome: 'Suyá',
    povo: 'Suyá (Kĩsêdjê)',
    publico: 'Meninas',
    idade: '13 a 15 anos',
    tema: { principal: '#1A3A7A', claro: '#F2C230', apoio: '#D32F2F' },
    cores: [
      { nome: 'Azul-marinho', hex: '#1A3A7A' },
      { nome: 'Amarelo', hex: '#F2C230' },
      { nome: 'Vermelho', hex: '#D32F2F' },
    ],
    valores: ['Liderança', 'União'],
    resumo: 'Identidade em azul-marinho, com detalhes em amarelo e vermelho. Espírito de liderança e união.',
    grito: '(Grito de guerra)',
    capa: '/fotos/unidades/suya/capa.jpg',
    emblema: '/fotos/unidades/suya/emblema.png',
    tribo: {
      titulo: 'O povo Suyá',
      paragrafos: ['(Texto sobre o povo Suyá, também chamado Kĩsêdjê)'],
      fatos: [
        { rotulo: 'Onde vivem', valor: '(região)' },
        { rotulo: 'Língua', valor: '(família linguística)' },
        { rotulo: 'Marca cultural', valor: '(costume marcante)' },
      ],
      foto: '/fotos/unidades/suya/tribo.jpg',
    },
    historia: ['(História da unidade Suyá)'],
    conselheiros: [
      { nome: '(Nome do conselheiro)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/suya/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('suya'),
  },
  {
    slug: 'xavantes',
    nome: 'Xavantes',
    povo: "Xavante (A'uwẽ)",
    publico: 'Meninos',
    idade: '10 a 12 anos',
    tema: { principal: '#C62828', claro: '#FF6B5E', apoio: '#141414' },
    cores: [
      { nome: 'Preto', hex: '#141414' },
      { nome: 'Vermelho', hex: '#C62828' },
    ],
    valores: ['Força', 'Energia', 'Determinação'],
    resumo: 'Identidade preta com detalhes marcantes em vermelho. Força, energia e determinação.',
    grito: '(Grito de guerra)',
    capa: '/fotos/unidades/xavantes/capa.jpg',
    emblema: '/fotos/unidades/xavantes/emblema.png',
    tribo: {
      titulo: 'O povo Xavante',
      paragrafos: ["(Texto sobre o povo Xavante, também chamado A'uwẽ)"],
      fatos: [
        { rotulo: 'Onde vivem', valor: '(região)' },
        { rotulo: 'Língua', valor: '(família linguística)' },
        { rotulo: 'Marca cultural', valor: '(costume marcante)' },
      ],
      foto: '/fotos/unidades/xavantes/tribo.jpg',
    },
    historia: ['(História da unidade Xavantes)'],
    conselheiros: [
      { nome: '(Nome do conselheiro)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/xavantes/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('xavantes'),
  },
  {
    slug: 'yekwana',
    nome: "Ye'kwana",
    povo: "Ye'kwana",
    publico: 'Meninas',
    idade: '10 a 12 anos',
    tema: { principal: '#7B3FA6', claro: '#C9A7E8', apoio: '#FFFFFF' },
    cores: [
      { nome: 'Roxo', hex: '#7B3FA6' },
      { nome: 'Lilás', hex: '#C9A7E8' },
      { nome: 'Branco', hex: '#FFFFFF' },
    ],
    valores: ['Criatividade', 'Foco', 'Companheirismo'],
    resumo: 'Identidade roxa e lilás com detalhes em branco. Criatividade, foco e companheirismo.',
    grito: '(Grito de guerra)',
    capa: '/fotos/unidades/yekwana/capa.jpg',
    emblema: '/fotos/unidades/yekwana/emblema.png',
    tribo: {
      titulo: "O povo Ye'kwana",
      paragrafos: ["(Texto sobre o povo Ye'kwana)"],
      fatos: [
        { rotulo: 'Onde vivem', valor: '(região)' },
        { rotulo: 'Língua', valor: '(família linguística)' },
        { rotulo: 'Marca cultural', valor: '(costume marcante)' },
      ],
      foto: '/fotos/unidades/yekwana/tribo.jpg',
    },
    historia: ["(História da unidade Ye'kwana)"],
    conselheiros: [
      { nome: '(Nome do conselheiro)', cargo: 'Conselheiro(a)', foto: '/fotos/unidades/yekwana/conselheiro.jpg' },
    ],
    fotos: fotosDaUnidade('yekwana'),
  },
]

export const NOMES_UNIDADES = UNIDADES.map((u) => u.nome)

export const buscarUnidade = (slug) => UNIDADES.find((u) => u.slug === slug)
