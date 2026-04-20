import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/lib/models/Order';
import { verifyAdmin } from '@/lib/auth';

// @desc    Get all orders (Admin Only)
// @route   GET /api/orders
export async function GET(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const orders = await Order.find().sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// @desc    Create new order (Public/Checkout)
// @route   POST /api/orders
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { customerName, customerEmail, customerPhone, items, totalAmount, advanceAmount, taxAmount, status } = body;
        
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
            status: status || 'Pending'
        });

        const savedOrder = await newOrder.save();
        return NextResponse.json(savedOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
