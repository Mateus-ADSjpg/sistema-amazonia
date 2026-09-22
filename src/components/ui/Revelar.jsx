import { useVisivel } from '../../hooks/useVisivel'

// Faz o conteúdo aparecer com uma animação suave quando entra na tela.
// efeito: 'subir' (padrão), 'esquerda', 'direita' ou 'zoom'.
// atraso: em milissegundos, para criar efeito cascata.
export default function Revelar({ as: Tag = 'div', efeito = 'subir', atraso = 0, className = '', style, children, ...resto }) {
  const [ref, visivel] = useVisivel()
  const classes = ['revelar', efeito !== 'subir' && `revelar--${efeito}`, visivel && 'visivel', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} style={{ '--atraso': `${atraso}ms`, ...style }} {...resto}>
      {children}
    </Tag>
  )
}
