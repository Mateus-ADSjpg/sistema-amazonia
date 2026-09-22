// Textos entre parênteses — por exemplo "(História do clube)" — são
// espaços reservados: aparecem no site com um visual discreto, para
// mostrar o que ainda falta escrever.
export const ehModelo = (texto) => typeof texto === 'string' && /^\(.*\)$/.test(texto.trim())

// Textos que começam com "PREENCHER" somem do site publicado.
export const estaPreenchido = (texto) =>
  typeof texto === 'string'
    ? texto.trim() !== '' && !ehModelo(texto) && !/^PREENCHER/i.test(texto.trim())
    : texto != null

export const MODO_DESENVOLVIMENTO = import.meta.env.DEV

// Deve aparecer na tela?
export const deveMostrar = (texto) => estaPreenchido(texto) || ehModelo(texto) || MODO_DESENVOLVIMENTO

// Classe de estilo para textos que ainda são espaços reservados.
export const classeModelo = (texto) =>
  estaPreenchido(texto) ? '' : MODO_DESENVOLVIMENTO ? 'modelo pendente' : 'modelo'
