import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '../../lib/utils';

// Mock Data
const products = [
    { _id: '1', title: 'Matte Business Card', category: 'Business Card', price: 45.00, oldPrice: 60.00, discount: 25, image: 'https://images.unsplash.com/photo-1617726487103-6058d927dcc3?auto=format&fit=crop&q=80&w=400', tags: ['best-seller', 'top-rated'] },
    { _id: '2', title: 'Vinyl Banner 8x4', category: 'Banner', price: 120.00, image: 'https://images.unsplash.com/photo-1630328905030-802525cdad66?auto=format&fit=crop&q=80&w=400', tags: ['new', 'top-rated'] },
    { _id: '3', title: 'Label Stickers (Round)', category: 'Stickers', price: 35.00, image: 'https://images.unsplash.com/photo-1616613386341-8692634e9dfc?auto=format&fit=crop&q=80&w=400', tags: ['best-seller'] },
    { _id: '4', title: 'A5 Flyer (Gloss art)', category: 'Flyers', price: 80.00, oldPrice: 95.00, discount: 15, image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c3a?auto=format&fit=crop&q=80&w=400', tags: ['new'] },
];

const tabs = [
    { id: 'best-seller', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'top-rated', label: 'Top Rated' }
];

const ProductGrid = () => {
    const [activeTab, setActiveTab] = useState('best-seller');

    const filteredProducts = products.filter(p => p.tags.includes(activeTab) || activeTab === 'all');

    return (
        <section className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <h2 className="text-3xl font-bold mb-6 md:mb-0">Trending Products</h2>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-white text-primary-blue shadow-md"
                                    : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
