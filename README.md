# Cedar Creek Farms Website

Next.js website for a tree farm with a public catalog, quote requests, and an **owner-only admin dashboard** powered by Supabase.

## Public site

- Home, tree availability, services, gallery, and contact/quote form
- Inventory and gallery load from Supabase (not hardcoded JSON)
- Visitors can submit quote requests; they cannot edit content or access admin pages

## Owner admin

Sign in at **`/admin/login`**, then manage:

- Products (add, edit, delete, availability, images)
- Gallery photos
- Incoming orders / quote requests

See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for full setup: Supabase project, database migration, storage, env vars, creating the admin user, local dev, and deployment.

## Quick start (developers)

```bash
cp .env.example .env.local
# Fill in Supabase URL and keys (see SUPABASE_SETUP.md)

npm install
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Deploy

Recommended: **Vercel** with the Supabase environment variables from `.env.example`.

See **[SUPABASE_SETUP.md → Vercel Environment Variables](./SUPABASE_SETUP.md#vercel-environment-variables)** for the exact Production import template and redeploy steps.

Netlify is also supported via `@netlify/plugin-nextjs` (see `netlify.toml`).

## Legacy static files

The original static HTML/JSON starter files (`index.html`, `data/trees.json`, etc.) remain in the repo for reference. The live app is the Next.js routes under `app/`. Old `.html` URLs redirect to the new paths.
