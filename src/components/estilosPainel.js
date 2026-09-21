// Estilos compartilhados do Painel da Secretaria (mesma identidade do portal).

export const cores = {
  dourado: '#C5A059',
  verde: '#2E7D32',
  vermelho: '#C62828',
  azul: '#1976D2',
  fundoCartao: '#1a1a1a',
  fundoCampo: '#222',
  borda: '#333',
  bordaCampo: '#444',
  textoSecundario: '#aaa',
}

export const campo = {
  padding: '10px',
  background: cores.fundoCampo,
  border: `1px solid ${cores.bordaCampo}`,
  color: '#fff',
  borderRadius: '4px',
  fontSize: '1rem',
  width: '100%',
  boxSizing: 'border-box',
}

export const cartao = {
  background: cores.fundoCartao,
  padding: '20px',
  borderRadius: '8px',
  border: `1px solid ${cores.borda}`,
  textAlign: 'left',
}

export const botao = (fundo = cores.verde) => ({
  background: fundo,
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
})

export const botaoPequeno = (fundo) => ({
  background: fundo,
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
})

export const aviso = (tipo) => ({
  padding: '10px 14px',
  borderRadius: '4px',
  margin: '15px 0',
  textAlign: 'left',
  background: tipo === 'erro' ? 'rgba(198, 40, 40, 0.15)' : 'rgba(46, 125, 50, 0.15)',
  border: `1px solid ${tipo === 'erro' ? cores.vermelho : cores.verde}`,
  color: tipo === 'erro' ? '#ffb4b4' : '#b9f6ca',
})
