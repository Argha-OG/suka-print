const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all orders (Invoices)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new order (Invoice)
exports.createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items, totalAmount, advanceAmount, taxAmount, status } = req.body;
        
        // Generate Order Number: SUKA-YYYYMMDD-XXXX
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await Order.countDocuments();
        const orderNumber = `SUKA-${dateStr}-${(count + 1).toString().padStart(4, '0')}`;

        const newOrder = new Order({
            orderNumber,
            customerName,
            customerEmail,
            customerPhone,
            items,
            totalAmount,
            advanceAmount,
            taxAmount,
            status
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Dashboard Stats
exports.getStats = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        const orderCount = await Order.countDocuments();
        const productCount = await Product.countDocuments();

        // Orders per day (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesTrend = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$totalAmount" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Category distribution
        const categories = await Order.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            stats: {
                totalRevenue: totalSales[0]?.total || 0,
                totalOrders: orderCount,
                totalProducts: productCount
            },
            salesTrend,
            categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        await order.deleteOne();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update all orders for a customer (Bulk Update)
exports.updateCustomer = async (req, res) => {
    try {
        const { originalName } = req.params;
        const { name, email, phone } = req.body;
        
        const result = await Order.updateMany(
            { customerName: originalName },
            { 
                $set: { 
                    customerName: name, 
                    customerEmail: email, 
                    customerPhone: phone 
                } 
            }
        );
        
        res.json({ message: `Updated ${result.modifiedCount} orders for customer ${originalName}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete all orders for a customer (Bulk Delete)
exports.deleteCustomer = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await Order.deleteMany({ customerName: name });
        res.json({ message: `Deleted customer ${name} and their ${result.deletedCount} orders.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
