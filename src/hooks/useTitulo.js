import { useEffect } from 'react'
import { CLUBE } from '../conteudo/clube'

// Define o título da aba do navegador em cada página.
export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | ${CLUBE.nome}` : CLUBE.nome
  }, [titulo])
}
