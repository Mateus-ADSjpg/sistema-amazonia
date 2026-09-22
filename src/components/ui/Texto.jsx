import { ehModelo, estaPreenchido, MODO_DESENVOLVIMENTO } from '../../conteudo/util'

// Mostra um texto do conteúdo.
// - Texto normal: aparece como está.
// - Texto entre parênteses: aparece discreto, como espaço reservado.
// - Texto começando com "PREENCHER": some do site publicado.
export default function Texto({ valor, as: Tag = 'span', className = '', ...resto }) {
  const preenchido = estaPreenchido(valor)
  const modelo = ehModelo(valor)
  if (!preenchido && !modelo && !MODO_DESENVOLVIMENTO) return null

  const classes = [className, !preenchido && 'modelo', !preenchido && MODO_DESENVOLVIMENTO && 'pendente']
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...resto}>
      {valor}
    </Tag>
  )
}
