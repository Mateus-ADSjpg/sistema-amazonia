// Um texto conta como "preenchido" quando não está vazio e não começa
// com "PREENCHER". Campos não preenchidos somem do site publicado e
// aparecem destacados só quando você roda o projeto no computador.
export const estaPreenchido = (texto) =>
  typeof texto === 'string' ? texto.trim() !== '' && !/^PREENCHER/i.test(texto.trim()) : texto != null

export const MODO_DESENVOLVIMENTO = import.meta.env.DEV

// Deve aparecer na tela? (preenchido, ou estamos em desenvolvimento)
export const deveMostrar = (texto) => estaPreenchido(texto) || MODO_DESENVOLVIMENTO
