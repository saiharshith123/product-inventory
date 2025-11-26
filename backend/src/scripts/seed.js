// Run: npm run seed
const pool = require('../db');
const bcrypt = require('bcrypt');

(async () => {
  try {
    console.log("Seeding database...");

    // Hash passwords
    const adminPass = await bcrypt.hash('admin123', 10);
    const managerPass = await bcrypt.hash('manager123', 10);

    // Insert users
    await pool.execute(
      `INSERT IGNORE INTO users (id, name, email, password, role)
       VALUES 
       (1, 'Admin', 'admin@inventory.com', ?, 'admin'),
       (2, 'Manager', 'manager@inventory.com', ?, 'manager')`,
      [adminPass, managerPass]
    );

    // Insert categories
    await pool.execute(
      `INSERT IGNORE INTO categories (id, name, description)
       VALUES
       (1, 'Electronics', 'Gadgets'),
       (2, 'Apparel', 'Clothes'),
       (3, 'Home', 'Home & Kitchen')`
    );

    // Insert sample products
    await pool.execute(
      `INSERT IGNORE INTO products
       (id, name, sku, description, price, quantity, categoryId, imagePath, createdBy)
       VALUES
       (1, 'Wireless Mouse', 'SKU-MOUSE-001', 'Smooth wireless mouse', 15.99, 25, 1, '/uploads/sample-mouse.jpg', 1),
       (2, 'T-Shirt Blue', 'SKU-TSHIRT-001', 'Cotton t-shirt', 9.99, 50, 2, '/uploads/sample-tshirt.jpg', 1),
       (3, 'Ceramic Mug', 'SKU-MUG-001', '350ml ceramic mug', 5.50, 0, 3, '/uploads/sample-mug.jpg', 1)`
    );

    console.log("✔ Seed completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();
