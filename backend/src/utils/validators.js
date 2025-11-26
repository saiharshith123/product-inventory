// backend/src/utils/validators.js
const { body, param } = require("express-validator");

// =============================
// AUTH VALIDATION
// =============================
exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// =============================
// USER VALIDATION (Admin Only)
// =============================
exports.validateCreateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateUpdateUser = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email required")
];

// =============================
// CATEGORY VALIDATION
// =============================
exports.validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
];

// =============================
// PRODUCT VALIDATION
// =============================
exports.validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("sku")
    .notEmpty()
    .withMessage("SKU is required"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID must be valid"),
];

// =============================
// STOCK CHANGE VALIDATION
// =============================
exports.validateStockChange = [
  body("delta")
    .isInt()
    .withMessage("delta must be an integer"),
  body("reason")
    .notEmpty()
    .withMessage("Reason is required")
];

// =============================
// BULK DELETE VALIDATION
// =============================
exports.validateBulkDelete = [
  body("ids")
    .isArray({ min: 1 })
    .withMessage("IDs array is required"),
  body("ids.*")
    .isInt()
    .withMessage("Each ID must be an integer")
];

// =============================
// VALIDATE ALL MIDDLEWARE
// =============================
const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};
