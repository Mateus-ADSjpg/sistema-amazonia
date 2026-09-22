import { useState } from 'react'
import './Emblema.css'

// Logo/emblema redondo. Se a imagem não existir, mostra a letra inicial.
export default function Emblema({ src, alt, letra = 'A', tamanho = 44, cor = 'var(--ouro)', className = '' }) {
  const [srcComErro, setSrcComErro] = useState(null)
  const semImagem = !src || srcComErro === src

  return (
    <span className={`emblema ${className}`} style={{ '--tamanho': `${tamanho}px`, '--cor-emblema': cor }}>
      {semImagem ? (
        <span className="emblema__letra" role="img" aria-label={alt}>
          {letra}
        </span>
      ) : (
        <img src={src} alt={alt} onError={() => setSrcComErro(src)} />
      )}
    </span>
  )
}
