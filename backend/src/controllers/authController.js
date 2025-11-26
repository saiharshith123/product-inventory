const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? AND isDeleted = 0', [email]);
    if (!rows.length) {
      // log attempt with null userId
      await pool.execute('INSERT INTO login_history (userId, ip, userAgent, success) VALUES (?, ?, ?, ?)', [null, req.ip, req.get('User-Agent'), 0]);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    await pool.execute('INSERT INTO login_history (userId, ip, userAgent, success) VALUES (?, ?, ?, ?)', [user.id, req.ip, req.get('User-Agent'), match ? 1 : 0]);

    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.isBlocked) return res.status(403).json({ message: 'User blocked' });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res.cookie('token', token, cookieOptions);
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  // req.user populated in middleware
  res.json({ user: req.user });
};
