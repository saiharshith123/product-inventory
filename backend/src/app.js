const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require("path");
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - allow frontend to send cookies (adjust origin)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Health
app.get("/", (req, res) => {
  res.send("Inventory Backend API is running");
});
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
