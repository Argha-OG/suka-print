const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get stats for dashboard
router.get('/stats', protect, admin, orderController.getStats);

// Get all orders (Invoices)
router.get('/', protect, admin, orderController.getOrders);

// Create new order (Invoice)
router.post('/', protect, admin, orderController.createOrder);

// Customer Management Routes
router.put('/customer/:originalName', protect, admin, orderController.updateCustomer);
router.delete('/customer/:name', protect, admin, orderController.deleteCustomer);

router.route('/:id')
    .get(protect, admin, orderController.getOrderById)
    .put(protect, admin, orderController.updateOrder)
    .delete(protect, admin, orderController.deleteOrder);

module.exports = router;

