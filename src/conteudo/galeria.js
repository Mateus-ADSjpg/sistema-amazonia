// =====================================================================
// GALERIA
// Cada álbum vira um filtro na página Galeria.
// Fotos: public/fotos/galeria/<id-do-album>/1.jpg, 2.jpg, ...
// "formato" só serve para desenhar o espaço enquanto a foto não existe:
// 'vertical', 'horizontal' ou 'quadrada'.
// =====================================================================

export const CAPA_GALERIA = {
  foto: '/fotos/galeria/capa.jpg',
  titulo: 'Momentos do clube',
  texto: 'Acampamentos, investiduras, eventos e muita aventura registrados pelos nossos desbravadores.',
}

const fotosDoAlbum = (id, formatos) =>
  formatos.map((formato, i) => ({
    src: `/fotos/galeria/${id}/${i + 1}.jpg`,
    legenda: '',
    formato,
  }))

export const ALBUNS = [
  {
    id: 'acampamentos',
    titulo: 'Acampamentos',
    fotos: fotosDoAlbum('acampamentos', ['horizontal', 'vertical', 'quadrada', 'horizontal', 'vertical', 'horizontal']),
  },
  {
    id: 'investiduras',
    titulo: 'Investiduras',
    fotos: fotosDoAlbum('investiduras', ['vertical', 'horizontal', 'horizontal', 'quadrada']),
  },
  {
    id: 'eventos',
    titulo: 'Eventos',
    fotos: fotosDoAlbum('eventos', ['quadrada', 'horizontal', 'vertical', 'horizontal', 'quadrada', 'vertical']),
  },
]

// Fotos que aparecem na página inicial (as 6 primeiras de todos os álbuns).
export const FOTOS_DESTAQUE = ALBUNS.flatMap((a) => a.fotos).slice(0, 6)
