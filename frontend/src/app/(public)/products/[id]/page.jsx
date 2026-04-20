import React from 'react';
import ProductClient from '@/components/products/ProductClient';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    
    try {
        // Try DB first
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://suka-print-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/products/${id}`, { 
            next: { revalidate: 3600 }, // Cache for 1 hour
            signal: AbortSignal.timeout(3000) // 3s timeout
        });
        
        if (res.ok) {
            const product = await res.json();
            return {
                title: `${product.title} | Suka Print`,
                description: product.description || `Premium quality printing services.`,
                openGraph: { images: [product.image] }
            };
        }
    } catch (e) {
        console.error("Metadata fetch fail:", e.message);
    }

    // ALWAYS Fallback to hardcoded to prevent 500
    const fallback = products.find(p => p._id === id);
    return {
        title: fallback ? `${fallback.title} | Suka Print` : 'Product Details',
        description: fallback ? fallback.description : 'Suka Print Premium Services'
    };
}

const Page = async ({ params }) => {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://suka-print-backend.vercel.app/api';
    
    let product = null;
    let relatedProducts = [];

    // Attempt API Fetch
    try {
        const res = await fetch(`${apiUrl}/products/${id}`, { 
            next: { revalidate: 60 },
            signal: AbortSignal.timeout(5000)
        });
        
        if (res.ok) {
            product = await res.json();
            
            const allRes = await fetch(`${apiUrl}/products`, { next: { revalidate: 3600 } });
            if (allRes.ok) {
                const all = await allRes.json();
                relatedProducts = all
                    .filter(p => p.category === product.category && p._id !== product._id)
                    .slice(0, 4);
            }
        }
    } catch (err) {
        console.warn("API Down, falling back to static data:", err.message);
    }

    // Fallback logic
    if (!product) {
        product = products.find(p => p._id === id);
        if (product) {
            relatedProducts = products
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
