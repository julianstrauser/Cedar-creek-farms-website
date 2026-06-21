# Cedar Creek Farms — Supabase & Admin Setup

This site uses **Next.js** for the public website and a protected **owner admin dashboard** at `/admin`. Content (products, gallery photos, orders) is stored in **Supabase**.

The farm owner only needs the admin dashboard. They do **not** need GitHub, Cursor, or Vercel access for day-to-day updates.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Choose a strong database password and save it somewhere safe.
3. Wait for the project to finish provisioning.

---

## 2. Run the database migration

1. In Supabase, open **SQL Editor**.
2. Open `supabase/migrations/001_initial.sql` from this repo.
3. Paste the full SQL script and click **Run**.

This creates:

- `profiles` — admin/user roles
- `products` — tree inventory
- `gallery` — public photo gallery
- `orders` — quote requests from the contact form
- Row Level Security (RLS) policies
- `site-images` storage bucket
- Starter product and gallery rows (placeholder SVG images)

---

## 3. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in values from Supabase **Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

- `NEXT_PUBLIC_*` values are safe for the browser.
- **Never** expose `SUPABASE_SERVICE_ROLE_KEY` in client code. It is only needed for one-time admin setup scripts if you use them.

Add the same variables in **Vercel** (or your host) under **Environment Variables** when you deploy.

---

## 4. Create the owner account and make them admin

Public sign-up must **not** automatically grant admin access. Only users listed in `profiles` with `role = 'admin'` can use `/admin`.

### Step A — Create the owner user in Supabase Auth

1. Supabase dashboard → **Authentication → Users**
2. Click **Add user → Create new user**
3. Enter the owner's email and a secure password
4. Copy the new user's **UUID** (user id)

### Step B — Grant admin role

In **SQL Editor**, run (replace the placeholders):

```sql
insert into public.profiles (id, email, role)
values ('OWNER_USER_UUID', 'owner@example.com', 'admin')
on conflict (id) do update set role = 'admin', email = excluded.email;
```

Only this user (and any others you add the same way) can access the admin dashboard.

### Optional — Disable public sign-ups

In Supabase → **Authentication → Providers → Email**, turn off **Enable sign ups** if you only want manually created accounts.

---

## 5. Storage bucket

The migration creates a public bucket named `site-images`.

- **Public visitors** can view images used on the site.
- **Only admins** can upload, update, or delete files (enforced by storage RLS).

If you create the bucket manually instead of running the migration:

1. **Storage → New bucket**
2. Name: `site-images`
3. Public bucket: **Yes**
4. Apply the storage policies from `001_initial.sql`

---

## 6. Run locally

```bash
npm install
npm run dev
```

Open:

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 7. Deploy (recommended: Vercel)

This project is a Next.js app. **Vercel** is the recommended host.

1. Push the repo to GitHub.
2. Import the project in [vercel.com](https://vercel.com).
3. Add the three Supabase environment variables.
4. Deploy.

After deploy, set the Supabase **Site URL** and **Redirect URLs**:

- Supabase → **Authentication → URL Configuration**
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/admin`, `http://localhost:3000/admin`

---

## 8. What the owner can do in `/admin`

| Page | Actions |
|------|---------|
| **Dashboard** | Counts for products, visible items, sold out, new orders |
| **Products** | Add, edit, delete trees; upload images; mark available / sold out / hidden |
| **Gallery** | Upload photos, titles, alt text; show or hide; delete |
| **Orders** | View quote requests; set status: new, contacted, fulfilled, archived |

---

## 9. Security summary

| Audience | Can do |
|----------|--------|
| **Public** | View site, browse products/gallery, submit orders |
| **Public** | Cannot upload, edit content, view orders, or access `/admin` |
| **Admin** | Full CRUD on products and gallery; read/update orders; upload images |

RLS policies in Supabase enforce this at the database level, not only in the UI.

---

## 10. Migrating from the old JSON files

If you had content in `data/trees.json` or `data/gallery.json`, either:

- Re-enter it through `/admin`, or
- Insert rows via Supabase **Table Editor** / SQL using the same field names as the `products` and `gallery` tables.

The migration SQL already seeds the original starter inventory and gallery using the placeholder SVG assets in `/public/assets`.
