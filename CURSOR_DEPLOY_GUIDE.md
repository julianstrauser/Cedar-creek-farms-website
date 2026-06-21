# Cursor + Domain Launch Guide

This site is a plain HTML/CSS/JavaScript website, so it is simple to edit in Cursor and publish.

## 1. Open the site in Cursor

1. Unzip this folder.
2. Open Cursor.
3. Choose **File > Open Folder**.
4. Select the unzipped website folder.

Main files to edit:

- `index.html` — home page
- `inventory.html` — tree availability page layout
- `services.html` — transplanting page
- `gallery.html` — project/photo gallery
- `contact.html` — quote request form
- `styles.css` — colors, spacing, fonts, buttons, mobile layout
- `script.js` — inventory filtering, selected trees, gallery behavior
- `data/trees.json` — tree inventory
- `data/gallery.json` — gallery photos

## 2. Preview locally

In Cursor, open the terminal and run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

If you are on Windows and `python3` does not work, try:

```bash
python -m http.server 8080
```

## 3. Replace the placeholder company info

Search the whole project for:

```text
Cedar Creek Farms
(000) 000-0000
info@example.com
Your city / region
```

Replace those with the real company name, phone, email, and service area.

## 4. Update tree availability

Edit:

```text
data/trees.json
```

Each tree item looks like this:

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

Use `admin.html` if you want to paste a CSV and download a fresh `trees.json` file.

## 5. Add real photos

Put photos in the `assets` folder, then edit:

```text
data/gallery.json
```

Example:

```json
{
  "title": "Large live oak transplant",
  "category": "Transplanting",
  "caption": "Moving and planting a mature live oak.",
  "image": "assets/live-oak-transplant.jpg"
}
```

## 6. Put the project on GitHub

Recommended repo name:

```text
tree-farm-website
```

From Cursor terminal:

```bash
git init
git add .
git commit -m "Initial tree farm website"
```

Then create a new GitHub repository and follow GitHub’s instructions to push the existing folder.

## 7. Deploy on Netlify

Use Netlify for this version because this site is static and the quote form is already set up for Netlify Forms.

Netlify settings:

```text
Build command: leave blank
Publish directory: .
```

After deployment, go to **Forms** in Netlify and enable form detection. Then redeploy the site. Quote requests should appear in Netlify under Forms.

## 8. Connect your domain

In Netlify:

1. Open the project.
2. Go to **Domain management**.
3. Add your custom domain.
4. Netlify will show DNS records or nameservers.
5. Go to the website where you bought the domain and update DNS there.

Typical setup:

- `www.yourdomain.com` points to Netlify using a CNAME record.
- `yourdomain.com` points to Netlify using the records Netlify provides.

Use exactly what Netlify gives you because every domain registrar screen looks a little different.

## 9. Every future update

Edit in Cursor, then run:

```bash
git add .
git commit -m "Update website"
git push
```

Netlify will automatically publish the new version.

## 10. Next upgrades

Good upgrades after launch:

- Real logo
- Real farm/project photos
- Real tree inventory
- Google Business Profile link
- Better SEO titles for the exact city/service area
- Netlify form email notifications
- Simple CMS so non-coders can update availability and photos
