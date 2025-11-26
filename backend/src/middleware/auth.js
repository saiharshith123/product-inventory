const jwt = require('jsonwebtoken');
const pool = require('../db');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    // fetch fresh user state (blocked/deleted)
    const [rows] = await pool.execute('SELECT id, name, email, role, isBlocked, isDeleted FROM users WHERE id = ?', [payload.id]);
    if (!rows.length) return res.status(401).json({ message: 'User not found' });
    const user = rows[0];
    if (user.isDeleted) return res.status(401).json({ message: 'User removed' });
    if (user.isBlocked) return res.status(403).json({ message: 'User blocked' });
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (err) {
    console.error('Auth error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const arr = Array.isArray(roles) ? roles : [roles];
  if (!arr.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { authenticate, requireRole };
