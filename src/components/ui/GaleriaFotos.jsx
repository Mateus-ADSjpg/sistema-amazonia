import { useState } from 'react'
import { ALBUM_FOTOS_URL } from '../../conteudo/clube'
import { useFotosExistentes } from '../../hooks/useFotosExistentes'
import Foto from './Foto'
import Icone from './Icone'
import Lightbox from './Lightbox'
import Revelar from './Revelar'
import './GaleriaFotos.css'

// Grade de fotos em "mosaico". Clicar abre a foto em tela cheia.
// No site publicado, só aparecem as fotos que já estão em public/fotos;
// se nenhuma estiver, aparece um convite para ver o álbum do Google Fotos.
export default function GaleriaFotos({ fotos: todas, tom, colunas = 3 }) {
  const [aberta, setAberta] = useState(null)
  const fotos = useFotosExistentes(todas)

  if (!todas.length) return null
  // ainda conferindo quais fotos existem: guarda o espaço sem piscar
  if (fotos === null) return <div className="galeria-fotos galeria-fotos--conferindo" aria-busy="true" />
  if (!fotos.length) return <GaleriaVazia tom={tom} />

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

function GaleriaVazia({ tom }) {
  return (
    <Revelar className="galeria-vazia" style={tom ? { '--tom': tom } : undefined}>
      <span className="raios" aria-hidden="true" />
      <div className="galeria-vazia__texto">
        <h3>As fotos estão sendo separadas</h3>
        <p>Enquanto elas não chegam aqui, o álbum completo do clube está no Google Fotos.</p>
      </div>
      <a href={ALBUM_FOTOS_URL} target="_blank" rel="noopener noreferrer" className="botao">
        Abrir o álbum <Icone nome="setaDiagonal" />
      </a>
    </Revelar>
  )
}
