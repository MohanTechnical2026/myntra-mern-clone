# local-assets/

This folder is where **you** manually place your own product photos, banners,
videos, and audio. The app is already wired up to read from here — you don't
need to change any code, just drop files in and update the product data to
point at them.

## How it works

The backend serves this entire folder as static files. Whatever you place at:

```
local-assets/images/men/shirt1.jpg
```

becomes reachable in the browser at:

```
http://localhost:5000/local-assets/images/men/shirt1.jpg
```

And in the database, a product's `images` field just stores that same path:

```js
images: ["/local-assets/images/men/shirt1.jpg"]
```

## Folder guide

| Folder | What goes here |
|---|---|
| `images/men/` | Men's clothing product photos |
| `images/women/` | Women's clothing product photos |
| `images/kids/` | Kids' clothing product photos |
| `images/footwear/` | Shoes, sandals, sneakers |
| `images/beauty/` | Makeup, skincare, haircare, fragrance photos |
| `images/accessories/` | Watches, bags, belts, jewellery |
| `images/home/` | Bedsheets, decor, kitchen items |
| `banners/` | Homepage hero/category banner images |
| `videos/` | Any product or promo videos |
| `audio/` | Any audio files, if you use them |

## Adding a new product with your own photos

1. Save your image file(s) into the right category folder, e.g.:
   ```
   local-assets/images/men/shirt2.jpg
   local-assets/images/men/shirt2-2.jpg
   ```
2. Add a new product either:
   - by editing `server/seed/products.js` and re-running `npm run seed`, or
   - by sending a `POST` request to `/api/products` (see README.md) with an
     `images` array pointing at your new file paths.
3. Refresh the frontend — your product and images will show up automatically.

## Placeholder images

Until you add your own photos, product cards/pages will try to load
`/local-assets/images/placeholder.jpg` if a product has no images. Add a
simple placeholder image at that exact path so the layout doesn't show
broken image icons while you're still adding real photos.

## Naming tip

Keep filenames simple and lowercase with no spaces, e.g. `shirt1.jpg`,
`shirt1-2.jpg`, `shirt1-3.jpg` for multiple angles of the same product.
