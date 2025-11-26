const pool = require('../db');

exports.listCategories = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, description FROM categories WHERE isDeleted = 0');
    res.json({ data: rows });
  } catch (err) { next(err); }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'CREATE', 'category', result.insertId, JSON.stringify({ name, description })
    ]);
    res.json({ id: result.insertId, name, description });
  } catch (err) { next(err); }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    await pool.execute('UPDATE categories SET name = ?, description = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [name, description, id]);
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'UPDATE', 'category', id, JSON.stringify({ name, description })
    ]);
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await pool.execute('UPDATE categories SET isDeleted = 1 WHERE id = ?', [id]);
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'DELETE', 'category', id, JSON.stringify({})
    ]);
    res.json({ message: 'Deleted (soft)' });
  } catch (err) { next(err); }
};
