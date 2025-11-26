const pool = require('../db');
const { format } = require("@fast-csv/format");
const fs = require("fs");
const path = require("path");

exports.getProducts = async (req, res) => {
  res.json({ message: "All products" });
};

exports.getProductById = async (req, res) => {
  res.json({ message: "Single product" });
};

exports.createProduct = async (req, res) => {
  res.json({ message: "Product created" });
};

exports.updateProduct = async (req, res) => {
  res.json({ message: "Product updated" });
};

exports.deleteProduct = async (req, res) => {
  res.json({ message: "Product deleted" });
};
