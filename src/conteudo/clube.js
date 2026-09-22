// =====================================================================
// DADOS GERAIS DO CLUBE
// Tudo que aparece no cabeçalho, rodapé e contato vem daqui.
// Fotos ficam em public/fotos/ (veja public/fotos/LEIA-ME.txt).
// =====================================================================

export const CLUBE = {
  nome: 'Clube de Desbravadores Amazônia',
  nomeCurto: 'Amazônia',
  slogan: 'Todos juntos por um só objetivo!',
  cidade: 'Barueri - SP',
  // CONFERIR: a bandeira do clube na foto diz "7ª Região - AP".
  regiao: 'R10',
  associacao: 'Associação Paulistana · UCB',
  hashtag: '#AmazôniaMeMove',
  // Logo do clube (PNG quadrado com fundo transparente).
  logo: '/fotos/clube/logo.png',
}

export const CONTATO = {
  // PREENCHER: WhatsApp da diretoria, só dígitos, com 55 + DDD.
  whatsapp: '5511999999999',
  whatsappMensagem: 'Olá! Vim pelo site e quero saber mais sobre o Clube Amazônia.',
  // PREENCHER: usuário do Instagram, sem @ (deixe '' para esconder).
  instagram: 'clubeamazonia',
  // PREENCHER: e-mail de contato (deixe '' para esconder).
  email: 'contato@exemplo.com',
  // PREENCHER: dia, horário e local das reuniões.
  reunioes: {
    dia: 'Domingos',
    horario: '9h às 12h',
    local: 'Igreja Adventista — endereço completo, Barueri - SP',
    // Link do Google Maps (abrir o local no Maps → Compartilhar → Copiar link).
    mapa: 'https://maps.google.com',
  },
}

// PREENCHER: link de compartilhamento do álbum do clube no Google Fotos.
export const ALBUM_FOTOS_URL = 'https://photos.google.com'

export const linkWhatsapp = (mensagem = CONTATO.whatsappMensagem) =>
  `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`

// Cargos disponíveis no cadastro de membros (Painel da Secretaria).
export const CARGOS = ['Desbravador', 'Conselheiro', 'Diretor', 'Diretora Associada']
