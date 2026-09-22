// Estilos compartilhados do Painel da Secretaria (mesma identidade do portal).

export const cores = {
  dourado: 'var(--ouro)',
  verde: 'var(--mata)',
  vermelho: '#C62828',
  azul: '#1976D2',
  fundoCartao: 'var(--noite-2)',
  fundoCampo: 'var(--noite-3)',
  borda: 'var(--linha-forte)',
  bordaCampo: 'var(--linha-forte)',
  textoSecundario: 'var(--texto-2)',
}

export const campo = {
  padding: '10px',
  background: cores.fundoCampo,
  border: `1px solid ${cores.bordaCampo}`,
  color: '#fff',
  borderRadius: '10px',
  fontSize: '1rem',
  minHeight: '46px',
  width: '100%',
  boxSizing: 'border-box',
}

export const cartao = {
  background: cores.fundoCartao,
  padding: 'clamp(20px, 3vw, 32px)',
  borderRadius: '18px',
  border: `1px solid ${cores.borda}`,
  textAlign: 'left',
}

export const botao = (fundo = cores.verde) => ({
  background: fundo,
  color: '#fff',
  border: 'none',
  fontSize: '0.95rem',
  padding: '12px 22px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: 'bold',
})

export const botaoPequeno = (fundo) => ({
  background: fundo,
  color: '#fff',
  border: 'none',
  fontSize: '0.85rem',
  padding: '7px 14px',
  borderRadius: '999px',
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
