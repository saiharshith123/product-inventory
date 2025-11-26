const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { getUsers, createManager, updateUser, blockUser, getLoginHistory } = require('../controllers/userController');

router.use(authenticate);
router.get('/', requireRole('admin'), getUsers);
router.post('/', requireRole('admin'), createManager);
router.put('/:id', requireRole('admin'), updateUser);
router.post('/:id/block', requireRole('admin'), blockUser);
router.get('/:id/login-history', requireRole('admin'), getLoginHistory);

module.exports = router;
