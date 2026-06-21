import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Portfolio from '@/lib/models/Portfolio';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
export async function GET() {
    try {
        if (!process.env.MONGO_URI) {
            return NextResponse.json([]); // Return empty list for graceful fallback
        }

        await dbConnect();
        const portfolio = await Portfolio.find({ active: true }).sort({ order: 1 });
        return NextResponse.json(portfolio);
    } catch (error) {
        console.error("API GET Portfolio Error:", error.message);
        return NextResponse.json([]);
    }
}

// @desc    Create a portfolio item (Admin Only)
// @route   POST /api/portfolio
export async function POST(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const body = await req.json();
        const { title, category, image, description, order } = body;
        
        const item = new Portfolio({ title, category, image, description, order });
        const createdItem = await item.save();
        
        return NextResponse.json(createdItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data', error: error.message }, { status: 400 });
    }
}
