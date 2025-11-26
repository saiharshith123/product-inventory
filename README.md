# 📦 Product Inventory Management System

A full-stack web application for managing products, categories, users, and stock using React + Node.js + Express + MySQL with role-based access, secure authentication, image uploads, and audit logs.

## 🚀 Live Demo

👉 Frontend: http://localhost:5173/  
👉 Backend API: http://localhost:4000/ 
*(Replace with your actual URLs)*

## 📸 Project Screenshots

<img width="1920" height="1080" alt="Screenshot (17)" src="https://github.com/user-attachments/assets/ffb04cfd-e8c4-4717-ae43-021b802ea5ec" />



## 🎯 Project Overview

This system helps small/medium businesses manage their inventory easily.

- ✔ Product CRUD  
- ✔ Category Management  
- ✔ User Role Management  
- ✔ Real-time Stock updates  
- ✔ Image Uploads (multer)  
- ✔ CSV Export  
- ✔ Activity Logs  
- ✔ Login History  
- ✔ Security-first JWT Authentication  

## 👥 User Roles

| Role    | Permissions                              |
|---------|-------------------------------------------|
| Admin   | Manage users, categories, products, logs |
| Manager | Manage only products                     |

## 🔐 Authentication

- Email + Password login  
- Passwords hashed with bcrypt  
- JWT stored in httpOnly cookies  
- Protected routes  
- Block/Unblock users (Admin)  

## 🏠 Landing Page Features

- Hero section  
- Features section  
- Sample products  
- Testimonials  
- CTA buttons  
- Footer  

## 🗂️ Core Features After Login

### 📊 Dashboard
- Total products  
- Low stock items  
- Categories count  
- Out of stock count  

### 📦 Product Management
- Add / Edit / Delete (soft delete)  
- Search & Filters  
- Table OR Grid view  
- Image upload  
- Stock increment/decrement with reason  
- Bulk Delete  
- Export CSV  

### 👤 User Management (Admin only)
- Add Manager  
- Edit user  
- Block/Unblock  
- View login history  

### 🏷 Category Management (Admin only)
- Add / Edit / Delete  

### 📜 Audit Logs
Logs all CRUD + Stock actions with:
- User ID  
- Timestamp  
- Action Type  
- Entity  

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- TailwindCSS / Custom CSS

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- Multer (image upload)
- JWT Authentication
- express-validator

### Dev Tools
- Nodemon
- Postman
- Git/GitHub

## 📂 Folder Structure

```
product-inventory/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── sql/
    ├── schema.sql
    └── seed_example.sql
```

## 🛠️ How to Run Locally

### 1️⃣ Clone the repo
```
git clone https://github.com/YOUR_USERNAME/product-inventory.git
cd product-inventory
```

---

# 🔧 Backend Setup

### 2️⃣ Install dependencies
```
cd backend
npm install
```

### 3️⃣ Create `.env` file
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Import schema
```
CREATE DATABASE inventory_db;
USE inventory_db;
SOURCE sql/schema.sql;
```

### 5️⃣ Seed data
```
npm run seed
```

### 6️⃣ Start backend
```
npm run dev
```

Backend runs at:
```
http://localhost:4000
```

---

# 💻 Frontend Setup

### 1️⃣ Install dependencies
```
cd frontend
npm install
```

### 2️⃣ Start frontend
```
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# 🌐 API Endpoints

### 🔐 Auth
- POST /api/auth/login  
- POST /api/auth/logout  
- GET /api/auth/me  

### 📦 Products
- GET /api/products  
- POST /api/products  
- PUT /api/products/:id  
- DELETE /api/products/:id  
- POST /api/products/bulk-delete  
- POST /api/products/:id/stock  

### 👤 Users (Admin)
- GET /api/users  
- POST /api/users  
- PUT /api/users/:id  
- POST /api/users/:id/block  

### 🏷 Categories
CRUD endpoints

### 📝 Logs
- GET /api/audit-logs

---

# ✨ Demo Credentials

### Admin
Email: admin@inventory.com  
Password: admin123  

### Manager
Email: manager@inventory.com  
Password: manager123  

---

# 🐛 Known Issues / Troubleshooting
- If backend doesn't start → check `.env`  
- If image upload fails → ensure `/uploads/` exists  
- If CORS issue occurs → enable origin in backend  

---

# 📽️ Video Walkthrough

---

# 📗 License
MIT License — Free to use & modify.

---

# 🙌 Author
Your Name  
📧 Email: bachina123456789@gmail.com  
🔗 GitHub: https://github.com/saiharshith123

