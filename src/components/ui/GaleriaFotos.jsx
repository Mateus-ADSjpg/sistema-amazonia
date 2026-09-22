import { useState } from 'react'
import Foto from './Foto'
import Icone from './Icone'
import Lightbox from './Lightbox'
import Revelar from './Revelar'
import './GaleriaFotos.css'

// Grade de fotos em "mosaico". Clicar abre a foto em tela cheia.
export default function GaleriaFotos({ fotos, tom, colunas = 3 }) {
  const [aberta, setAberta] = useState(null)

  if (!fotos.length) return null

  return (
    <>
      <div className="galeria-fotos" style={{ '--colunas': colunas }}>
        {fotos.map((foto, i) => (
          <Revelar key={foto.src} atraso={(i % colunas) * 90} className="galeria-fotos__item">
            <button className="galeria-fotos__botao" onClick={() => setAberta(i)} aria-label={`Ampliar foto ${i + 1}`}>
              <Foto src={foto.src} alt={foto.legenda || ''} formato={foto.formato} tom={tom} />
              <span className="galeria-fotos__icone">
                <Icone nome="mais" />
              </span>
              {foto.legenda && <span className="galeria-fotos__legenda">{foto.legenda}</span>}
            </button>
          </Revelar>
        ))}
      </div>

      {aberta !== null && (
        <Lightbox fotos={fotos} indice={aberta} aoMudar={setAberta} aoFechar={() => setAberta(null)} tom={tom} />
      )}
    </>
  )
}
