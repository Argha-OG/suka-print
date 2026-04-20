"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Filter, ChevronDown, SearchX } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { getBaseURL } from '@/lib/api';

import ListingCard from '@/components/products/ListingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProductListingContent = () => {
    const searchParams = useSearchParams();
    const urlSearchParam = searchParams.get('search') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState(urlSearchParam);
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${getBaseURL()}/products`);
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setSearchTerm(urlSearchParam);
    }, [urlSearchParam]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getFilteredProducts = () => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        let matches = products;

        if (category !== 'All') {
            matches = matches.filter(p => p.category === category);
        }

        if (!lowerSearch) return { exact: matches, suggestions: [] };

        const exactMatches = matches.filter(p =>
            p.title.toLowerCase().includes(lowerSearch) ||
            p.category.toLowerCase().includes(lowerSearch)
        );

        const suggestionMatches = matches.filter(p => {
            const isExact = exactMatches.some(em => em._id === p._id);
            if (isExact) return false;
            return p.keywords && p.keywords.some(k => k.toLowerCase().includes(lowerSearch));
        });

        return { exact: exactMatches, suggestions: suggestionMatches };
    };

    const { exact: filteredProducts, suggestions } = getFilteredProducts();
    const hasSearchQuery = searchTerm.trim().length > 0;
    const showSuggestions = hasSearchQuery && filteredProducts.length === 0;

    const categories = ['All', ...new Set(products.map(p => p.category))];

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    {hasSearchQuery ? `Results for "${searchTerm}"` : 'Shop Products'}
                </h1>

                <div className="flex gap-4 w-full md:w-auto">
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
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

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ListingCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Product Not Available</h3>
                        <p className="text-gray-500 mt-1">We couldn't find any exact matches for "{searchTerm}".</p>
                    </div>

                    {(showSuggestions && suggestions.length > 0) && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                You might like these similar items:
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {suggestions.map(product => (
                                    <ListingCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ProductListing = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductListingContent />
        </Suspense>
    );
};

export default ProductListing;
