import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import { verifyAdmin } from '@/lib/auth';

// @desc    Fetch all products with optional category filter
// @route   GET /api/products
export async function GET(req) {
    try {
        if (!process.env.MONGO_URI) {
            return NextResponse.json([]); // Return empty for graceful frontend fallback
        }

        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        
        const query = category ? { category } : {};
        const products = await Product.find(query).sort({ createdAt: -1 });
        
        return NextResponse.json(products);
    } catch (error) {
        console.error("API GET Products Error:", error.message);
        // Still return empty to prevent frontend crash
        return NextResponse.json([]);
    }
}

// @desc    Create a product (Admin Only)
// @route   POST /api/products
export async function POST(req) {
    try {
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const body = await req.json();
        
        const { title, description, price, category, image, stock } = body;
        
        if (!title || !price || !category) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const product = new Product({
            title, description, price, category, image, stock
        });
        
        const createdProduct = await product.save();
        return NextResponse.json(createdProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid product data', error: error.message }, { status: 400 });
    }
}
