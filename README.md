# 🛒 E-Commerce Application

A full-stack e-commerce web application built with React.js, Node.js, Express.js, and MongoDB. Features include user authentication, product management, shopping cart functionality, and an admin dashboard.

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication with cookies
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Protected routes and middleware

### 🛍️ Shopping Experience
- Browse products with search and filter functionality
- Real-time filtering by category, price range, and search terms
- Product details page with full product information
- Add to cart functionality with quantity management
- Shopping cart with item management (add, remove, increase/decrease quantity)
- Login required for cart operations

### 👨‍💼 Admin Dashboard
- Product management (Create, Read, Update, Delete)
- Advanced search and filtering for product management
- Real-time product count and statistics
- Responsive admin interface with modern UI
- Image management for products
- Category-based product organization

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Clean white background with black text and red accents
- Smooth animations and hover effects
- Loading states and error handling
- Professional card-based layouts
- Backdrop blur modals instead of harsh overlays

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Navigation and routing
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie parsing middleware
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
ecommerce/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx   # Navigation component
│   │   │   └── ProductCard.jsx # Product display component
│   │   ├── pages/           # Page components
│   │   │   ├── AdminPage.jsx    # Admin dashboard
│   │   │   ├── AuthPage.jsx     # Login/Register page
│   │   │   ├── CartPage.jsx     # Shopping cart page
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── ProductPage.jsx  # Product listing page
│   │   │   └── ProductDetails.jsx # Product detail page
│   │   ├── store/           # Zustand state management
│   │   │   ├── authStore.js     # Authentication state
│   │   │   ├── cartStore.js     # Shopping cart state
│   │   │   └── productStore.js  # Product management state
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js           # Axios configuration
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   └── db.js            # Database connection
│   │   ├── controllers/     # Route controllers
│   │   │   ├── authController.js    # Authentication logic
│   │   │   ├── cartController.js    # Cart operations
│   │   │   └── productController.js # Product operations
│   │   ├── middlewares/     # Custom middleware
│   │   │   └── authMiddleware.js    # Authentication middleware
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── Product.js           # Product model
│   │   │   └── User.js              # User model
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js        # Authentication routes
│   │   │   ├── cartRoutes.js        # Cart routes
│   │   │   └── productRoutes.js     # Product routes
│   │   ├── services/        # Business logic
│   │   │   ├── authService.js       # Authentication services
│   │   │   ├── cartService.js       # Cart services
│   │   │   └── productService.js    # Product services
│   │   └── index.js         # Server entry point
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
└── README.md               # Project documentation



## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/filter` - Filter products by category/price
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `PUT /api/cart/decrease/:id` - Decrease item quantity
- `DELETE /api/cart/clear` - Clear entire cart

## 🔑 Key Features Explained

### Real-time Filtering
- Client-side filtering for instant results
- Search by product name or description
- Filter by category and price range
- No page reloads or API calls during filtering

### Admin Dashboard
- Modern, responsive interface
- Product CRUD operations with form validation
- Real-time search and filtering
- Auto-scroll to edit forms
- Confirmation modals with blur effects

### Shopping Cart
- Persistent cart state linked to user authentication
- Real-time quantity updates
- Cart synchronization on login/logout
- Clean, modern cart interface

### Authentication Flow
- JWT tokens stored in HTTP-only cookies
- Automatic login redirection for cart operations
- Role-based access control
- Secure password handling

## 🎨 Design System

### Color Scheme
- **Primary**: White backgrounds
- **Text**: Black primary text
- **Accent**: Red (#DC2626) for buttons and highlights
- **Secondary**: Gray shades for borders and secondary elements

### Components
- Card-based layouts with subtle shadows
- Hover effects and smooth transitions
- Responsive grid systems
- Modern form styling with focus states

## 🔧 Development

### Code Style
- ES6+ JavaScript
- Functional React components with hooks
- Modular architecture with separation of concerns
- Consistent naming conventions


