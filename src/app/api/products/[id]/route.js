import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import { verifyAdmin } from '@/lib/auth';

// @desc    Fetch single product
// @route   GET /api/products/[id]
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await dbConnect();
        
        const product = await Product.findById(id);
        if (product) {
            return NextResponse.json(product);
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

// @desc    Update a product (Admin Only)
// @route   PUT /api/products/[id]
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const body = await req.json();
        
        const product = await Product.findById(id);
        if (product) {
            product.title = body.title || product.title;
            product.description = body.description || product.description;
            product.price = body.price || product.price;
            product.category = body.category || product.category;
            product.stock = body.stock !== undefined ? body.stock : product.stock;
            product.image = body.image || product.image;

            const updatedProduct = await product.save();
            return NextResponse.json(updatedProduct);
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Product not found', error: error.message }, { status: 404 });
    }
}

// @desc    Delete a product (Admin Only)
// @route   DELETE /api/products/[id]
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const auth = await verifyAdmin(req);
        if (!auth.authenticated) {
            return NextResponse.json({ message: auth.message }, { status: auth.status });
        }

        await dbConnect();
        const product = await Product.findById(id);
        
        if (product) {
            await product.deleteOne();
            return NextResponse.json({ message: 'Product removed' });
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
