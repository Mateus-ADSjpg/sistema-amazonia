import { estaPreenchido, MODO_DESENVOLVIMENTO } from '../../conteudo/util'

// Mostra um texto do conteúdo. Se ele ainda não foi preenchido:
// no computador aparece destacado; no site publicado, some.
export default function Texto({ valor, as: Tag = 'span', className = '', ...resto }) {
  const preenchido = estaPreenchido(valor)
  if (!preenchido && !MODO_DESENVOLVIMENTO) return null
  return (
    <Tag className={`${className} ${preenchido ? '' : 'pendente'}`.trim()} {...resto}>
      {valor}
    </Tag>
  )
}
