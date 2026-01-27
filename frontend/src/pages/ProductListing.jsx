import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, SearchX } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/products/ListingCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SEO from '../components/utils/SEO';

import { products } from '../data/products';

const ProductListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearchParam = searchParams.get('search') || '';

    // Initialize state from URL param if available
    const [searchTerm, setSearchTerm] = useState(urlSearchParam);
    const [category, setCategory] = useState('All');

    // Sync URL param changes to state (e.g. back button or new search from navbar)
    useEffect(() => {
        setSearchTerm(urlSearchParam);
    }, [urlSearchParam]);

    // Update URL when typing in local input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Optional: only push to URL on submit or debounce, but keeping simple for now
    };

    const getFilteredProducts = () => {
        const lowerSearch = searchTerm.toLowerCase().trim();

        let matches = products;

        // Category Filter
        if (category !== 'All') {
            matches = matches.filter(p => p.category === category);
        }

        if (!lowerSearch) return { exact: matches, suggestions: [] };

        // 1. Primary Matches (Title or Category) - High relevance
        const exactMatches = matches.filter(p =>
            p.title.toLowerCase().includes(lowerSearch) ||
            p.category.toLowerCase().includes(lowerSearch)
        );

        // 2. Suggestion Matches (Keywords) - Lower relevance, excluding items already found
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

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <SEO
                title={hasSearchQuery ? `Search: ${searchTerm}` : "Shop Products"}
                description="Browse our extensive collection of printing products. Custom designs, bulk orders, and fast delivery."
            />
            {/* Header & Filter */}
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

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ListingCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Not Found Message */}
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Product Not Available</h3>
                        <p className="text-gray-500 mt-1">We couldn't find any exact matches for "{searchTerm}".</p>
                    </div>

                    {/* Suggestions Fallback */}
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

export default ProductListing;
