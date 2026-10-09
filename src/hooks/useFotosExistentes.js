import { useEffect, useState } from 'react'
import { MODO_DESENVOLVIMENTO } from '../conteudo/util'

// Descobre quais fotos de uma lista já foram colocadas em public/fotos.
// No site publicado, as que ainda não existem somem das galerias.
// Rodando no computador (npm run dev), todas aparecem, com o caminho
// esperado de cada arquivo.
//
// Retorna null enquanto confere e, depois, só as fotos que existem.

const verificadas = new Map()

// Pergunta só o cabeçalho do arquivo (sem baixar a foto). Na Vercel, um
// arquivo que não existe devolve a página do site, por isso o tipo conta.
function existe(src) {
  if (!verificadas.has(src)) {
    verificadas.set(
      src,
      fetch(src, { method: 'HEAD' })
        .then((r) => r.ok && (r.headers.get('content-type') ?? '').startsWith('image/'))
        .catch(() => false),
    )
  }
  return verificadas.get(src)
}

export function useFotosExistentes(fotos) {
  const chave = fotos.map((f) => f.src).join('|')
  const [resultado, setResultado] = useState({ chave: null, fotos: null })

  useEffect(() => {
    if (MODO_DESENVOLVIMENTO) return
    let ativo = true
    Promise.all(fotos.map((f) => existe(f.src))).then((ok) => {
      if (ativo) setResultado({ chave, fotos: fotos.filter((_, i) => ok[i]) })
    })
    return () => {
      ativo = false
    }
    // a lista é comparada pela chave (os caminhos), não pela referência
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave])

  if (MODO_DESENVOLVIMENTO) return fotos
  return resultado.chave === chave ? resultado.fotos : null
}
