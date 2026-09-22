import { useState } from 'react'
import { ALBUM_FOTOS_URL } from '../conteudo/clube'
import { ALBUNS, CAPA_GALERIA } from '../conteudo/galeria'
import { useTitulo } from '../hooks/useTitulo'
import CapaPagina from '../components/ui/CapaPagina'
import Chamada from '../components/ui/Chamada'
import GaleriaFotos from '../components/ui/GaleriaFotos'
import Icone from '../components/ui/Icone'
import './Galeria.css'

const TODOS = 'todos'

export default function Galeria() {
  useTitulo('Galeria')
  const [filtro, setFiltro] = useState(TODOS)

  const fotos = filtro === TODOS ? ALBUNS.flatMap((a) => a.fotos) : ALBUNS.find((a) => a.id === filtro)?.fotos ?? []

  return (
    <>
      <CapaPagina
        foto={CAPA_GALERIA.foto}
        sobretitulo="Galeria"
        titulo={CAPA_GALERIA.titulo}
        texto={CAPA_GALERIA.texto}
        tomApoio="var(--ouro)"
      />

      <section className="secao">
        <div className="container">
          <div className="galeria-barra">
            <div className="galeria-filtros" role="group" aria-label="Filtrar por álbum">
              {[{ id: TODOS, titulo: 'Todos' }, ...ALBUNS].map((a) => (
                <button
                  key={a.id}
                  className={`galeria-filtro ${filtro === a.id ? 'galeria-filtro--ativo' : ''}`}
                  aria-pressed={filtro === a.id}
                  onClick={() => setFiltro(a.id)}
                >
                  {a.titulo}
                  <span>{a.id === TODOS ? ALBUNS.reduce((t, x) => t + x.fotos.length, 0) : a.fotos.length}</span>
                </button>
              ))}
            </div>
            <a href={ALBUM_FOTOS_URL} target="_blank" rel="noopener noreferrer" className="link-seta">
              Álbum completo no Google Fotos <Icone nome="setaDiagonal" />
            </a>
          </div>

          <GaleriaFotos key={filtro} fotos={fotos} />
        </div>
      </section>

      <Chamada titulo="Quer viver essas aventuras?" />
    </>
  )
}
