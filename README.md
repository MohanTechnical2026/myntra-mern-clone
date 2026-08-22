# StyleBazaar — MERN E-Commerce (Learning Project)

This project is an **educational MERN Stack e-commerce project inspired by
modern fashion e-commerce websites**. It is not affiliated with or endorsed
by Myntra. It was built for learning the MERN stack and for project
submission — the code is intentionally kept simple and beginner-friendly.

## Technologies

- React (Vite)
- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript (no TypeScript)
- Plain CSS (no framework)
- JWT (authentication)
- bcryptjs (password hashing)

## Required Versions

```
Node.js v24.19.0
npm v12.0.2
```

## Project Structure

```
myntra-mern-project/
├── client/          React frontend
├── server/          Express backend
├── local-assets/    Your own product images/videos/banners go here
├── README.md
└── package.json
```

See `local-assets/README.md` for detailed instructions on adding your own
product photos.

## 1. Installation

From the project root, install both the backend and frontend dependencies.

You can do this in one step:

```bash
npm run install-all
```

Or manually, one folder at a time:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

## 2. MongoDB Setup

You need a running MongoDB instance. Two easy options:

**Option A — Local MongoDB**
Install MongoDB Community Edition and make sure it's running on your
machine (default: `mongodb://127.0.0.1:27017`).

**Option B — MongoDB Atlas (cloud, free tier)**
1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user and get your connection string
3. Use that connection string as `MONGO_URI` in the next step

## 3. Environment Variables

Inside `server/`, copy the example file:

```bash
cd server
cp .env.example .env
```

Then open `.env` and fill in your own values:

```
MONGO_URI=mongodb://127.0.0.1:27017/myntra-mern-project
JWT_SECRET=replace_this_with_a_long_random_string
PORT=5000
```

Never commit your real `.env` file — it's already excluded in `.gitignore`.

## 4. Adding Your Own Product Images

Before running the seed script, either:
- Add your own images into `local-assets/images/<category>/` and edit
  `server/seed/products.js` to point at them, **or**
- Just run the seed script as-is first to see the app working, then swap
  in real images later (the sample data references filenames like
  `shirt1.jpg` that you can add afterwards).

Full instructions are in `local-assets/README.md`.

## 5. Seeding the Database

From inside `server/`, run:

```bash
npm run seed
```

This clears any existing products and inserts ~17 sample products across
all 7 categories (Men, Women, Kids, Footwear, Beauty, Accessories, Home &
Living) so the site isn't empty on first run.

## 6. Running the Project

You need **two terminals** running at the same time — one for the backend,
one for the frontend.

**Terminal 1 — Backend**
```bash
cd server
npm run dev
```
The API will run at `http://localhost:5000`.

**Terminal 2 — Frontend**
```bash
cd client
npm run dev
```
The website will run at `http://localhost:5173`.

Open `http://localhost:5173` in your browser.

> The frontend is configured (in `client/vite.config.js`) to automatically
> forward `/api` and `/local-assets` requests to the backend on port 5000,
> so you don't need to change any URLs in the code.

## 7. Adding Products Manually (without editing the seed file)

You can also add a product directly via the API, for example using a tool
like Postman or `curl`:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New T-Shirt",
    "brand": "MyBrand",
    "category": "men",
    "subCategory": "tshirts",
    "gender": "men",
    "price": 599,
    "originalPrice": 999,
    "discount": 40,
    "sizes": ["S", "M", "L"],
    "colors": ["Black"],
    "images": ["/local-assets/images/men/newshirt1.jpg"]
  }'
```

Make sure the image file referenced actually exists in `local-assets/`.

## Environment Variables Reference

| Variable | Description |
|---|---|
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Any long random string, used to sign login tokens |
| `PORT` | Port for the backend server (default 5000) |

## Folder Reference

| Folder | Purpose |
|---|---|
| `client/src/components/` | Reusable UI pieces (Header, ProductCard, etc.) |
| `client/src/pages/` | Full pages (Home, Cart, Checkout, etc.) |
| `client/src/context/` | App-wide state: auth, cart, wishlist |
| `client/src/services/api.js` | Shared axios instance for all API calls |
| `server/models/` | Mongoose schemas |
| `server/controllers/` | Route logic |
| `server/routes/` | URL → controller mapping |
| `server/middleware/` | Auth checks and error handling |
| `server/seed/` | Sample data script |
| `local-assets/` | Your own images/videos/banners |

## API Overview

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/categories

GET    /api/users/profile        (requires login)
PUT    /api/users/profile        (requires login)
POST   /api/users/address        (requires login)

GET    /api/cart                 (requires login)
POST   /api/cart                 (requires login)
PUT    /api/cart/:itemId         (requires login)
DELETE /api/cart/:itemId         (requires login)

GET    /api/wishlist             (requires login)
POST   /api/wishlist             (requires login)
DELETE /api/wishlist/:productId  (requires login)

POST   /api/orders               (requires login)
GET    /api/orders               (requires login)
GET    /api/orders/:id           (requires login)
```

Protected routes expect a header:
```
Authorization: Bearer <token>
```
The frontend handles this automatically once you're logged in.

## Notes

- **Payments are simulated.** There is no real payment gateway integrated —
  placing an order at checkout just creates an order record directly.
- **No external image URLs are used** in the final app; everything is
  served from `local-assets/` on your own machine.
- This project uses simple React Context instead of Redux, and plain CSS
  instead of a CSS framework, to keep the codebase approachable for
  learning and project review/viva.

## Testing Checklist

- [ ] Backend starts (`npm run dev` in `server/`)
- [ ] MongoDB connects successfully
- [ ] Frontend starts (`npm run dev` in `client/`)
- [ ] Registration works
- [ ] Login / logout works
- [ ] Home page loads products
- [ ] Category pages filter correctly
- [ ] Search returns matching products
- [ ] Filters (gender, price, size, color) work
- [ ] Sorting (price, rating, discount) works
- [ ] Product details page loads and options can be selected
- [ ] Add to wishlist / remove from wishlist works
- [ ] Add to cart, update quantity, remove from cart works
- [ ] Checkout creates an order and empties the cart
- [ ] Order history displays past orders
- [ ] Profile page loads and can be edited
- [ ] Local images display correctly once added
- [ ] Layout is responsive on mobile screen sizes
