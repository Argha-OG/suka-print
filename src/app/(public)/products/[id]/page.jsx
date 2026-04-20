import React from 'react';
import ProductClient from '@/components/products/ProductClient';
import { products as staticProducts } from '@/data/products';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';

export async function generateMetadata({ params }) {
    const { id } = await params;
    
    try {
        await dbConnect();
        const product = await Product.findById(id);
        
        if (product) {
            return {
                title: `${product.title} | Suka Print`,
                description: product.description || `Premium quality printing services.`,
                openGraph: { images: [product.image] }
            };
        }
    } catch (e) {
        console.error("Metadata fetch fail:", e.message);
    }

    // Fallback to static data if DB fails or item is not found
    const fallback = staticProducts.find(p => p._id === id);
    return {
        title: fallback ? `${fallback.title} | Suka Print` : 'Product Details',
        description: fallback ? fallback.description : 'Suka Print Premium Services'
    };
}

const Page = async ({ params }) => {
    const { id } = await params;
    
    let product = null;
    let relatedProducts = [];

    try {
        await dbConnect();
        product = await Product.findById(id).lean();
        
        if (product) {
            // Convert MongoDB object to plain JSON safely for the client
            product = JSON.parse(JSON.stringify(product));
            
            const related = await Product.find({ 
                category: product.category, 
                _id: { $ne: product._id } 
            }).limit(4).lean();
            
            relatedProducts = JSON.parse(JSON.stringify(related));
        }
    } catch (err) {
        console.warn("Database error, falling back to static data:", err.message);
    }

    // Fallback logic for legacy/static items
    if (!product) {
        product = staticProducts.find(p => p._id === id);
        if (product) {
            relatedProducts = staticProducts
                .filter(p => p.category === product.category && p._id !== product._id)
                .slice(0, 4);
        }
    }

    if (!product) notFound();

    return (
        <ProductClient product={product} relatedProducts={relatedProducts} />
    );
};

export default Page;
