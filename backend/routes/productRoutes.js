// routes/productRoutes.js
const express = require('express');
const { getProducts, updateProductStock } = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { updateStockSchema } = require('../validation/productValidate');
const router = express.Router();
router.get('/', getProducts);
router.put("/:productId/stock", authenticateToken, isAdmin, validate(updateStockSchema), updateProductStock);


module.exports = router;