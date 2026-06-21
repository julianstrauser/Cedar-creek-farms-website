# Cedar Creek Farms Website Starter

This is a complete static website starter for a tree farming company. It includes:

- Home page
- Tree availability page with search and filters
- Tree transplanting services page
- Gallery page
- Quote request/contact page
- Simple admin helper for turning CSV inventory into JSON
- Placeholder SVG images that can be replaced with real photos

## How to preview it

Open `index.html` in a browser. For best results, use a simple local server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## What to customize first

1. Replace the company name if it is not Cedar Creek Farms.
2. Replace the phone number and email in `contact.html`.
3. Replace the service area text in `contact.html` and the homepage schema.
4. Replace placeholder photos in the `assets` folder.
5. Update inventory in `data/trees.json`.
6. Update gallery photos in `data/gallery.json`.

## Inventory format

Edit `data/trees.json` with entries like this:

```json
{
  "id": "live-oak-45",
  "name": "Live Oak",
  "type": "Shade Tree",
  "size": "45 gal",
  "quantity": 18,
  "price": "Call for pricing",
  "notes": "Strong shade tree for large landscapes.",
  "featured": true,
  "image": "assets/tree-live-oak.svg"
}
```

## Admin helper

Open `admin.html` to paste a simple CSV inventory list and download a new `trees.json` file.

This helper does not save directly to the live site. It creates the file you upload/replace.

## Best simple publishing setup

Use one of these:

- Netlify Drop: easiest way to launch quickly.
- GitHub + Netlify: best free professional setup.
- Vercel: also good for static websites.

## Later upgrades

- Connect the form to Netlify Forms, Formspree, HubSpot, or a custom backend.
- Add Decap CMS so the owner can edit inventory and gallery from a private admin login.
- Add Google Analytics or Plausible Analytics.
- Add a real domain and business email.
- Add SEO location pages for nearby towns.
