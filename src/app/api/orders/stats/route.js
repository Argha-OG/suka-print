import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { verifyAdmin } from '@/lib/auth';

// @desc    Get Dashboard Stats (Admin Only)
// @route   GET /api/orders/stats
export async function GET(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();

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

        // Category breakdown
        const categories = await Order.aggregate([
            { $unwind: "$items" },
            { $lookup: { from: 'products', localField: 'items.product', foreignField: '_id', as: 'productInfo' } },
            { $unwind: "$productInfo" },
            { $group: { _id: "$productInfo.category", count: { $sum: 1 } } }
        ]);

        return NextResponse.json({
            stats: {
                totalRevenue: totalSales[0]?.total || 0,
                totalOrders: orderCount,
                totalProducts: productCount
            },
            salesTrend,
            categories
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
