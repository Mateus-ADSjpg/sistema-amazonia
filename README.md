# Sistema Amazônia 🏕️

Portal institucional e painel administrativo do **Clube de Desbravadores Amazônia** (Barueri - SP, R10), com as unidades **Suruí, Suyá, Xavantes e Ye'kwana**.

🔗 **Site no ar:** [sistema-amazonia.vercel.app](https://sistema-amazonia.vercel.app)

## Funcionalidades

**Portal público** (funciona bem no computador e no celular)
- **Abertura:** animação com o logo e a #AmazôniaMeMove na primeira página da visita
- **Início:** capa com destaques que se revezam a cada 5 segundos (foto do clube apagada sob as cores da paleta, cortina com as cores das quatro unidades na troca, texto aparecendo do desfoque, barras de progresso, setas e deslizar no celular), faixa do próximo evento da agenda, faixa animada com as unidades, "Quem somos", números do clube, painéis das unidades, trilha da história, galeria, Voto do Desbravador e chamada para participar
- **Sobre:** história com linha do tempo, atividades e a diretoria em carrossel (anda sozinho devagar, com setas e arraste), além dos ideais (Voto, Lei, Alvo, Lema e Objetivo)
- **Unidades:** visão geral e uma página para cada unidade (`/unidades/surui`, `/unidades/suya`, `/unidades/xavantes`, `/unidades/yekwana`), com as cores da unidade, a tribo que a inspira, história, grito de guerra, conselheiros e galeria
- **Calendário:** agenda do ano em `/calendario` — próximo evento com contagem, reunião de toda semana, filtro por mês, opção de esconder o que já passou e botão que salva os eventos na agenda do celular (arquivo `.ics`)
- **Galeria:** álbuns com filtro e visualizador em tela cheia
- **Contato:** WhatsApp, reuniões, redes (com os ícones oficiais) e perguntas frequentes

**Painel da Secretaria (acesso restrito)**
- **Não aparece no menu do site.** Chega-se até ele pelo endereço `/secretaria`, pelo atalho `Ctrl + Alt + S` em qualquer página ou pelo cadeadinho discreto no canto do rodapé
- Login com e-mail e senha (Supabase Auth)
- Só contas cadastradas como administradoras entram no painel
- Cadastro, edição e exclusão de membros (nome, unidade, cargo e telefone)

## Tecnologias

| Camada | Ferramenta |
| --- | --- |
| Front-end | [React](https://react.dev) + [Vite](https://vite.dev) + [React Router](https://reactrouter.com) |
| Back-end / banco | [Supabase](https://supabase.com) (PostgreSQL, Auth e Row Level Security) |
| Hospedagem | [Vercel](https://vercel.com) |
| Lint | [oxlint](https://oxc.rs) |

## Estrutura do projeto

```
├── public/
│   └── fotos/                 # TODAS as fotos do site (veja fotos/LEIA-ME.txt)
├── src/
│   ├── conteudo/              # TEXTOS do site: é aqui que você edita o conteúdo
│   │   ├── clube.js           #   nome, contato, WhatsApp, reuniões, álbum
│   │   ├── inicio.js          #   página inicial
│   │   ├── sobre.js           #   história, atividades, diretoria, ideais
│   │   ├── unidades.js        #   as 4 unidades (cores, tribo, história, grito...)
│   │   ├── calendario.js      #   agenda do ano (datas, tipos de evento)
│   │   ├── galeria.js         #   álbuns de fotos
│   │   └── contato.js         #   perguntas frequentes
│   ├── paginas/               # Uma página por arquivo (Inicio, Sobre, Unidade...)
│   ├── components/
│   │   ├── layout/            # Cabeçalho, menu do celular e rodapé
│   │   ├── ui/                # Peças reutilizáveis (Foto, Galeria, Capa...)
│   │   └── secretaria/        # Painel da Secretaria (login e membros)
│   ├── hooks/                 # Animações ao rolar, título da aba etc.
│   ├── index.css              # Cores, fontes e estilos gerais do site
│   ├── App.jsx                # Endereços (rotas) das páginas
│   └── supabase.js            # Conexão com o Supabase
├── supabase/
│   └── seguranca.sql          # Tabelas, RLS e políticas de acesso
├── .env.example               # Modelo das variáveis de ambiente
└── vercel.json                # Rotas da Vercel
```

## Editando textos e fotos

O site foi montado para que o conteúdo seja trocado **sem mexer no layout**:

- **Textos:** edite os arquivos de `src/conteudo/`. Cada campo tem um comentário explicando onde aparece.
- **Fotos:** coloque os arquivos em `public/fotos/` com os nomes listados em [`public/fotos/LEIA-ME.txt`](public/fotos/LEIA-ME.txt). Enquanto uma foto não existe, o site mostra um espaço colorido no lugar.
- **Espaços reservados:** textos entre parênteses, como `(História do clube)`, aparecem no site em cinza e itálico, mostrando o que ainda falta escrever. Textos que começam com `PREENCHER` somem do site publicado. Rodando `npm run dev`, os dois aparecem com borda tracejada, e cada espaço de foto mostra o caminho do arquivo esperado.
- **Peso das fotos:** depois de colocar fotos novas, rode `npm run fotos`. O comando reduz e comprime tudo que está em `public/fotos` (capas até 1920 px, demais fotos até 1400 px). O site já carrega cada foto só quando ela chega na tela.
- **Destaques da capa:** ficam em `DESTAQUES`, no arquivo `src/conteudo/inicio.js` (texto, botões, foto e enquadramento de cada um). O tempo de cada destaque na tela está logo abaixo, em `TEMPO_DESTAQUE`.
- **Agenda do ano:** as datas ficam em `EVENTOS`, no arquivo `src/conteudo/calendario.js`. Cada evento tem data, título, tipo, horário, local e uma linha de explicação; o site ordena, separa por mês e marca o que já passou sozinho. Quando a diretoria confirmar a agenda, troque `AGENDA_CONFIRMADA` para `true` para tirar o aviso de "agenda em montagem".
- **Cores:** a paleta geral (amarelo, preto, verde-petróleo e laranja do logo) fica no início de `src/index.css`; as cores de cada unidade ficam em `src/conteudo/unidades.js` e pintam a página inteira da unidade.
- **Mais fotos numa galeria:** aumente a quantidade em `src/conteudo/unidades.js` (`fotosDaUnidade('surui', 10)`) ou adicione itens ao álbum em `src/conteudo/galeria.js`.

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org) 20 ou superior e uma conta no Supabase.

```bash
git clone https://github.com/Mateus-ADSjpg/sistema-amazonia.git
cd sistema-amazonia
npm install
```

Crie o arquivo `.env` a partir do modelo e preencha com os dados do seu projeto Supabase (**Project Settings → API**):

```bash
cp .env.example .env
```

Depois é só rodar:

```bash
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run fotos    # comprime as fotos de public/fotos (rode sempre que adicionar fotos)
npm run lint     # verifica o código
```

## Configurando o Supabase

1. **Banco de dados:** abra **SQL Editor → New query**, cole o conteúdo de [`supabase/seguranca.sql`](supabase/seguranca.sql) e clique em **Run**. O script cria as tabelas `membros` e `administradores`, ativa o Row Level Security e define que só administradores logados podem ler ou alterar os membros.
2. **Conta da secretaria:** em **Authentication → Users → Add user → Create new user**, crie o usuário com e-mail e senha (marque *Auto Confirm User*).
3. **Liberar o painel para essa conta:** no SQL Editor, rode (trocando o e-mail):
   ```sql
   insert into public.administradores (user_id, email)
   select id, email from auth.users where email = 'secretaria@exemplo.com'
   on conflict (user_id) do nothing;
   ```
4. **Recomendado:** em **Authentication → Sign In / Providers**, desative o cadastro de novos usuários (*Allow new users to sign up*), já que as contas são criadas manualmente.

## Deploy na Vercel

O deploy acontece automaticamente a cada `git push` na branch `main`.
Em **Settings → Environment Variables** do projeto na Vercel, cadastre:

| Variável | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave publicável (`sb_publishable_...`) ou `anon` |

## Segurança

- O arquivo `.env` **não** vai para o repositório (está no `.gitignore`).
- A chave usada no front-end é a **publicável**, feita para ficar exposta no navegador. Quem protege os dados são as políticas de **Row Level Security** do banco, não o front-end.
- A chave secreta (`service_role` / `sb_secret_...`) **nunca** deve ser usada neste projeto nem enviada ao GitHub.
- Os dados dos membros ficam apenas no banco do Supabase, nunca no código.

---

Desenvolvido por [Mateus](https://github.com/Mateus-ADSjpg) para o Clube de Desbravadores Amazônia.
