import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Se as variáveis não existirem (ex.: faltou configurar na Vercel), o site
// público continua funcionando e só o Painel da Secretaria mostra o aviso.
export const supabaseConfigurado = Boolean(supabaseUrl && supabaseAnonKey)

if (!supabaseConfigurado) {
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (veja o arquivo .env.example).'
  )
}

export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
