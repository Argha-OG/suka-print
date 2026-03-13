import React from 'react';
import ProductClient from '@/components/products/ProductClient';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = products.find(p => p._id === id);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.title,
        description: product.description || `Premium quality ${product.title} printing services in Malaysia. High-quality materials and fast delivery.`,
        openGraph: {
            title: `${product.title} | Suka Print`,
            description: product.description,
            images: [product.image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: [product.image],
        }
    };
}

const Page = async ({ params }) => {
    const { id } = await params;
    const product = products.find(p => p._id === id);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4);

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
            priceValidUntil: '2027-01-01',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '128',
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
