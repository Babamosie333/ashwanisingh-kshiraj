# Kshiraj website (Next.js + Tailwind + Framer Motion + Supabase, light theme)

    npm install
    npm run dev        # http://localhost:3000   (admin: /admin)
    npm run build

- Works before Supabase is set up: the public site shows the 8 starter sites.
- Fill `.env.local` (URL + anon key), run `supabase/schema.sql`, create one admin user. Then use /admin.
- Business details: `lib/config.js` · Colors/fonts: `tailwind.config.js` · Starter sites: `lib/seed.js`
- Deploy: push to GitHub, import in Vercel, add the same two env vars in Vercel settings.
