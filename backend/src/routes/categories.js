const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { listCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.use(authenticate);
router.get('/', listCategories);
router.post('/', requireRole('admin'), createCategory);
router.put('/:id', requireRole('admin'), updateCategory);
router.delete('/:id', requireRole('admin'), deleteCategory);

module.exports = router;
