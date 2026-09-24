# DB Imports — Catálogo de Moda Masculina

Site de catálogo da **DB Imports** com tela de loading animada (caminhão 3D) que
aparece por 5 segundos ao abrir o site e entra em modo **"Recuperando"** caso o
site caia ou encontre algum erro, até o site voltar ao normal.

- **Stack:** React 19 + Next.js (via [vinext](https://www.npmjs.com/package/vinext)) + Tailwind CSS v4 + Vite
- **Deploy:** GitHub Pages (via GitHub Actions, export estático)

---

## ▶️ Rodar localmente

Requisitos: **Node.js 22+** e **npm**.

```bash
npm install
npm run dev
```

Abra **http://localhost:3000** no navegador.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (http://localhost:3000) |
| `npm run build` | Gera o site estático em `dist/client/` |
| `npm start` | Serve o build de produção |
| `npm run lint` | Roda o eslint |

> O build de produção é um **export estático** (não precisa de servidor Node),
> ideal para GitHub Pages.

---

## 🚀 Publicar no GitHub Pages

O repositório já vem com o workflow `.github/workflows/deploy.yml` pronto:

1. **Crie um repositório no GitHub** e faça o *push* do projeto:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. No GitHub, vá em **Settings → Pages** e escolha **GitHub Actions** como fonte
   de deploy (o workflow faz o resto automaticamente).
3. O site ficará disponível em:
   - Repositório comum: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`
   - Repositório `SEU_USUARIO.github.io`: `https://SEU_USUARIO.github.io/`
   - Ou no **domínio personalizado** que você configurar em Settings → Pages.

O workflow calcula o caminho base automaticamente (`NEXT_PUBLIC_ASSET_PREFIX`),
então **funciona em qualquer repositório**, com ou sem domínio customizado.

### Testar como vai ficar no GitHub Pages (antes de publicar)

```bash
npm run build
# Roda um servidor local que simula GitHub Pages sob /nome-do-repo/
PAGES_BASE=/nome-do-repo node scripts/serve-ghpages.mjs
```

Abra **http://localhost:8090/nome-do-repo/** para validar.

---

## 🧩 Estrutura

```
app/            Páginas e layout (Next.js App Router)
components/     AppGate (loading/recovery) + TruckLoader (caminhão 3D) + Dialog/Sheet UI
lib/            Dados do catálogo e funções utilitárias
public/         Arquivos estáticos (assets, catalog.json, favicon)
scripts/        Utilitários locais
.github/workflows/deploy.yml   Deploy automático no GitHub Pages
```

## 🖼️ Catálogo

As peças do catálogo ficam em `public/catalog.json`. Cada produto pode ter:
`name`, `category`, `description`, `price`, `image`, `colors`, `sizes`, `tag`
e `published`. Se o arquivo não estiver disponível, o site usa uma coleção
demonstrativa local (`lib/catalog-data.ts`).