// backend/routes/orderRoutes.js
const express = require('express');
const { createOrder, deleteOrder, getOrders, validateOrder, updateOrderStatus } = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { createOrderSchema, updateOrderStatusSchema, objectIdSchema } = require('../validation/orderValidate');
const router = express.Router();

router.get('/', authenticateToken, isAdmin, getOrders); // Accès pour administrateurs
router.post('/', authenticateToken, validate(createOrderSchema), createOrder); // Accès pour utilisateurs connectés
router.delete('/:id', authenticateToken, deleteOrder); // Accès pour administrateurs
router.put('/:id/validate', authenticateToken, isAdmin, validate(updateOrderStatusSchema), validateOrder); // Accès pour administrateurs
router.put('/:orderId/status', authenticateToken, isAdmin, validate(objectIdSchema), updateOrderStatus); // Accès pour administrateurs


module.exports = router;