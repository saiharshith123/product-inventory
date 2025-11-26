USE inventory_db;

-- ============================
--  USERS (with bcrypt hashes)
-- ============================

-- Password for both:
-- admin123  →  $2b$10$D5Xyo1F2mnQbjzvS5BQCLOjcePRC5Hz94R7h3a2EO/MbO9G8iOQVa
-- manager123 → $2b$10$B4WZP6gP0X3s.V9rVnp0Oe8cxm8s93Hd3vVAg7hXupG4InENcy9b6

INSERT INTO users (id, name, email, password, role, isBlocked, isDeleted)
VALUES
(1, 'Admin', 'admin@inventory.com',
 '$2b$10$D5Xyo1F2mnQbjzvS5BQCLOjcePRC5Hz94R7h3a2EO/MbO9G8iOQVa',
 'admin', 0, 0),

(2, 'Manager', 'manager@inventory.com',
 '$2b$10$B4WZP6gP0X3s.V9rVnp0Oe8cxm8s93Hd3vVAg7hXupG4InENcy9b6',
 'manager', 0, 0);


-- ============================
--  CATEGORIES
-- ============================

INSERT INTO categories (id, name, description, isDeleted)
VALUES
(1, 'Electronics', 'Electronic gadgets and devices', 0),
(2, 'Apparel', 'Clothing and fashion items', 0),
(3, 'Home & Kitchen', 'Household and kitchen utilities', 0),
(4, 'Toys', 'Kids toys and accessories', 0);


-- ============================
--  PRODUCTS
-- ============================

INSERT INTO products 
(id, name, sku, description, price, quantity, categoryId, imagePath, isDeleted, createdBy)
VALUES
(1, 'Wireless Mouse', 'SKU-MOUSE-001', '2.4Ghz Wireless Mouse', 599.00, 25, 1, '/uploads/sample-mouse.jpg', 0, 1),

(2, 'Bluetooth Keyboard', 'SKU-KEYBOARD-002', 'Slim Bluetooth Keyboard', 899.00, 12, 1, '/uploads/sample-keyboard.jpg', 0, 1),

(3, 'Cotton T-shirt Blue', 'SKU-TSHIRT-001', 'High-quality cotton t-shirt (Blue)', 499.00, 50, 2, '/uploads/sample-tshirt.jpg', 0, 1),

(4, 'Ceramic Coffee Mug', 'SKU-MUG-001', '350ml white ceramic mug', 199.00, 0, 3, '/uploads/sample-mug.jpg', 0, 1),

(5, 'Toy Car Red', 'SKU-TOYCAR-003', 'Premium toy car for kids', 299.00, 18, 4, '/uploads/sample-toycar.jpg', 0, 1);


-- ============================
--  SAMPLE AUDIT LOGS
-- ============================

INSERT INTO audit_logs (userId, actionType, entity, entityId, details)
VALUES
(1, 'CREATE', 'product', 1, JSON_OBJECT('message','Initial product creation')),
(1, 'CREATE', 'product', 2, JSON_OBJECT('message','Initial product creation')),
(1, 'CREATE', 'category', 1, JSON_OBJECT('message','Initial category setup'));


-- ============================
--  SAMPLE LOGIN HISTORY
-- ============================

INSERT INTO login_history (userId, ip, userAgent, success)
VALUES
(1, '127.0.0.1', 'Chrome', 1),
(2, '127.0.0.1', 'Chrome', 1);
