import React from 'react';
import ProductClient from '@/components/products/ProductClient';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    try {
        const res = await fetch(`${apiUrl}/products/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Product not found');
        const product = await res.json();

        return {
            title: product.title,
            description: product.description || `Premium quality ${product.title} printing services in Malaysia. High-quality materials and fast delivery.`,
            openGraph: {
                title: `${product.title} | Suka Print`,
                description: product.description,
                images: [product.image],
                type: 'article',
            },
        };
    } catch (error) {
        // Fallback to hardcoded for legacy IDs if possible
        const legacyProduct = products.find(p => p._id === id);
        if (legacyProduct) return { title: legacyProduct.title };
        return { title: 'Product Not Found' };
    }
}

const Page = async ({ params }) => {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    let product = null;
    let relatedProducts = [];

    try {
        const res = await fetch(`${apiUrl}/products/${id}`, { cache: 'no-store' });
        if (res.ok) {
            product = await res.json();
            
            // Fetch related products by category
            const allRes = await fetch(`${apiUrl}/products`, { cache: 'no-store' });
            const allProducts = await allRes.json();
            relatedProducts = allProducts
                .filter(p => p.category === product.category && p._id !== product._id)
                .slice(0, 4);
        }
    } catch (error) {
        console.error("API Fetch Error:", error);
    }

    // Fallback to hardcoded if API fails or ID is numeric
    if (!product) {
        product = products.find(p => p._id === id);
        if (product) {
            relatedProducts = products
                .filter(p => p.category === product.category && p._id !== product._id)
                .slice(0, 4);
        }
    }

    if (!product) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.image,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Suka Print',
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.sukaprint.com/products/${product._id}`,
            priceCurrency: 'MYR',
            price: product.price,
            availability: 'https://schema.org/InStock',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductClient product={product} relatedProducts={relatedProducts} />
        </>
    );
};

export default Page;
