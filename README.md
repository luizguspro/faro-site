# Faro Tributário — Landing Page Deploy

## Opção 1: Cloudflare Pages (RECOMENDADO — grátis, mais rápido)

### Passo 1: Subir no GitHub
```bash
cd faro-landing
git init
git add .
git commit -m "landing page faro tributario"
gh repo create faro-landing --public --push
# ou cria o repo manualmente no github.com e faz push
```

### Passo 2: Conectar no Cloudflare Pages
1. Vai em https://dash.cloudflare.com → Pages → Create a project
2. Connect to Git → seleciona o repo `faro-landing`
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Clica "Save and Deploy"

### Passo 3: Configurar domínio custom
1. No projeto do Cloudflare Pages → Custom domains
2. Adiciona `farotributario.com.br` e `www.farotributario.com.br`
3. No registro.br, aponta o DNS:
   - Se usar Cloudflare como DNS (recomendado):
     - Muda os nameservers no registro.br pros do Cloudflare
   - Se manter DNS do registro.br:
     - CNAME `www` → `faro-landing.pages.dev`
     - CNAME `@` → `faro-landing.pages.dev` (ou ALIAS se suportar)

### Tempo total: ~10 minutos

---

## Opção 2: Vercel (alternativa grátis)

```bash
npm i -g vercel
cd faro-landing
vercel
# segue o wizard, seleciona Vite como framework
# depois: vercel domains add farotributario.com.br
```

No registro.br:
- CNAME → `cname.vercel-dns.com`

---

## Opção 3: GCS + Cloud Run (já que tem GCP)

Como tu já tem infra no GCP, pode servir do próprio bucket:

```bash
cd faro-landing
npm run build

# Upload pro GCS
gsutil mb -l southamerica-east1 gs://farotributario-landing
gsutil -m cp -r dist/* gs://farotributario-landing/
gsutil web set -m index.html -e index.html gs://farotributario-landing

# Configurar load balancer + SSL pra custom domain
# (mais complexo, Cloudflare Pages é mais simples)
```

---

## Links configurados

Todos os CTAs já apontam para:
`https://faro-app-756887985367.southamerica-east1.run.app/`

- "Solicitar demonstração" → app
- "Criar conta gratuita" → app
- "Login" → app
- "Conhecer a plataforma" → scroll interno (#solucoes)
- Links de navegação → scroll interno

## Estrutura do projeto

```
faro-landing/
├── index.html          # Entry HTML com meta tags SEO
├── package.json        # Deps: vite + react
├── vite.config.js      # Config Vite
└── src/
    ├── main.jsx        # React mount
    └── App.jsx         # Landing page completa
```
