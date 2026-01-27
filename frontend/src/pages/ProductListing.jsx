import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/home/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

// Mock Data (Expanded)
const MOCK_PRODUCTS = [
    { _id: '1', title: 'Matte Business Card', category: 'Business Card', price: 45.00, discount: 25, image: 'https://images.unsplash.com/photo-1617726487103-6058d927dcc3?auto=format&fit=crop&q=80&w=400' },
    { _id: '2', title: 'Vinyl Banner 8x4', category: 'Banner', price: 120.00, image: 'https://images.unsplash.com/photo-1630328905030-802525cdad66?auto=format&fit=crop&q=80&w=400' },
    { _id: '3', title: 'Label Stickers (Round)', category: 'Stickers', price: 35.00, image: 'https://images.unsplash.com/photo-1616613386341-8692634e9dfc?auto=format&fit=crop&q=80&w=400' },
    { _id: '4', title: 'A5 Flyer (Gloss art)', category: 'Flyers', price: 80.00, discount: 15, image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c3a?auto=format&fit=crop&q=80&w=400' },
    { _id: '5', title: 'Letterhead Printing', category: 'Documents', price: 150.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400' },
    { _id: '6', title: 'Roll-up Bunting', category: 'Banner', price: 85.00, image: 'https://images.unsplash.com/photo-1563986768494-4dee46a38531?auto=format&fit=crop&q=80&w=400' },
];

const ProductListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Shop Products</h1>

                <div className="flex gap-4 w-full md:w-auto">
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                    <div className="relative group">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter size={16} /> Filter <ChevronDown size={14} />
                        </Button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden border z-20 hidden group-hover:block">
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${category === cat ? 'bg-primary-blue/10 text-primary-blue font-semibold' : 'text-gray-700'}`}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    No products found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default ProductListing;
