import './FaixaCorrida.css'

// Faixa com texto passando sem parar (os nomes das unidades, por exemplo).
export default function FaixaCorrida({ itens, velocidade = 38, invertida = false }) {
  const grupo = (copia) => (
    <div className="faixa-corrida__grupo" aria-hidden={copia || undefined}>
      {itens.map((item, i) => (
        <span key={i} className="faixa-corrida__item" style={{ '--cor-item': item.cor }}>
          {item.texto}
          <span className="faixa-corrida__separador">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`faixa-corrida ${invertida ? 'faixa-corrida--invertida' : ''}`}
      style={{ '--duracao': `${velocidade}s` }}
    >
      <div className="faixa-corrida__trilho">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  )
}
