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
  regiao: 'R10', // Décima Região
  associacao: 'Associação Paulistana · UCB',
  hashtag: '#AmazôniaMeMove',
  // Logo do clube (PNG quadrado com fundo transparente).
  logo: '/fotos/clube/logo.png',
}

export const CONTATO = {
  // PREENCHER: WhatsApp da diretoria, só dígitos, com 55 + DDD.
  whatsapp: '5511999999999',
  whatsappMensagem: 'Olá! Vim pelo site e quero saber mais sobre o Clube Amazônia.',
  instagram: 'amazoniadbv',
  // O clube quase não usa e-mail. Deixe '' para esconder do site.
  email: '',
  // CONFERIR com a diretoria: dia e horário das reuniões.
  reunioes: {
    dia: 'Domingos',
    horario: '9h às 12h',
    igreja: 'IASD Central de Barueri',
    local: 'R. Antônio Chalupe, 95 - Vila Boa Vista, Barueri - SP, 06411-080',
    mapa: 'https://www.google.com/maps/place/IASD+Central+de+Barueri/@-23.5037851,-46.8778468,17z/data=!4m6!3m5!1s0x94cf03c5bbd2095f:0xd68c78959df6562e!8m2!3d-23.5037345!4d-46.8754055!16s%2Fg%2F1ptysbwdb',
  },
}

// PREENCHER: link de compartilhamento do álbum do clube no Google Fotos.
export const ALBUM_FOTOS_URL = 'https://photos.google.com'

export const linkWhatsapp = (mensagem = CONTATO.whatsappMensagem) =>
  `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`

// Cargos disponíveis no cadastro de membros (Painel da Secretaria).
// Pode acrescentar ou remover à vontade: o banco aceita qualquer texto.
export const CARGOS = [
  'Desbravador',
  'Conselheiro',
  'Instrutor',
  'Capelão',
  'Secretária',
  'Tesoureiro',
  'Diretor',
  'Diretora Associada',
]
