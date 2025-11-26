const pool = require('../db');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email, role, isBlocked, createdAt FROM users WHERE isDeleted = 0');
    res.json({ data: rows });
  } catch (err) { next(err); }
};

exports.createManager = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute('INSERT INTO users (name,email,password,role) VALUES (?, ?, ?, ?)', [name, email, hashed, 'manager']);
    // audit log
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'CREATE', 'user', result.insertId, JSON.stringify({ name, email, role: 'manager' })
    ]);
    res.json({ id: result.insertId, name, email, role: 'manager' });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    await pool.execute('UPDATE users SET name = ?, email = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [name, email, id]);
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'UPDATE', 'user', id, JSON.stringify({ name, email })
    ]);
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
};

exports.blockUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { block } = req.body; // true/false
    await pool.execute('UPDATE users SET isBlocked = ? WHERE id = ?', [block ? 1 : 0, id]);
    await pool.execute('INSERT INTO audit_logs (userId, actionType, entity, entityId, details) VALUES (?, ?, ?, ?, ?)', [
      req.user.id, 'UPDATE', 'user', id, JSON.stringify({ isBlocked: !!block })
    ]);
    res.json({ message: 'User block status updated' });
  } catch (err) { next(err); }
};

exports.getLoginHistory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.execute('SELECT id, ip, userAgent, success, createdAt FROM login_history WHERE userId = ? ORDER BY createdAt DESC LIMIT 100', [id]);
    res.json({ data: rows });
  } catch (err) { next(err); }
};
