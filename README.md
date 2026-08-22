# StyleBazaar — MERN E-Commerce

A full-stack e-commerce web application inspired by modern fashion e-commerce platforms such as Myntra. This project is built using the MERN stack and is intended for learning, portfolio development, and academic project submission.

> **Disclaimer:** This project is created for educational purposes. It is not affiliated with, endorsed by, or associated with Myntra.

---

## 🚀 Features

### User Authentication
- User registration
- User login and logout
- JWT-based authentication
- Password hashing using bcryptjs
- Protected routes
- User profile management
- Address management

### Product Management
- Product listing
- Product details
- Product categories
- Product search
- Filtering by:
  - Gender
  - Price
  - Size
  - Color
- Sorting by:
  - Price
  - Rating
  - Discount

### Shopping Cart
- Add products to cart
- Update product quantity
- Remove products from cart
- Cart total calculation
- Protected cart operations

### Wishlist
- Add products to wishlist
- Remove products from wishlist
- View wishlist
- Protected wishlist operations

### Orders
- Checkout
- Create orders
- View order history
- View individual order details
- Automatically clear cart after successful order

### UI
- Responsive design
- Product cards
- Product gallery
- Image lightbox
- Category banners
- Navigation header
- Footer
- Mobile-friendly layout

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Context API
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Development Tools

- Git
- GitHub
- VS Code
- npm
- Postman

---

## 📁 Project Structure

```text
myntra-mern-clone/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
├── local-assets/
│   ├── images/
│   ├── banners/
│   ├── audio/
│   └── videos/
│
├── .gitignore
├── package.json
└── README.md