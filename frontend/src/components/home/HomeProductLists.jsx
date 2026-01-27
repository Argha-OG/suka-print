import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';

const ProductList = ({ title, items }) => (
    <div className="flex-1">
        <h3 className="font-bold text-lg mb-6 uppercase text-gray-800 border-b pb-2">{title}</h3>
        <div className="space-y-6">
            {items.map((item, idx) => (
                <Link to="/products" key={idx} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-1 group-hover:text-primary-blue transition-colors">{item.title}</h4>
                        <div className="flex text-yellow-400 text-xs mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <div className="font-bold text-primary-magenta text-sm">{item.price}</div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HomeProductLists = () => {
    const listItems = [
        { title: "Leather Bags", price: "$49.00", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=100" },
        { title: "Eco Package", price: "$29.00", image: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=100" },
        { title: "Saddle stitch", price: "$15.00", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=100" },
    ];

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 3 Columns of Lists */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProductList title="Best Seller" items={listItems} />
                    <ProductList title="Top Sale" items={listItems} />
                    <ProductList title="Top Rated" items={listItems} />
                </div>

                {/* Promo Banner / Ad */}
                <div className="bg-orange-100 rounded-xl p-8 flex flex-col items-center text-center justify-center min-h-[400px] relative overflow-hidden group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent"></div>

                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-4">HOT SALE</span>
                    <h3 className="text-2xl font-bold mb-2">Kraft Paper Sacks Package</h3>
                    <p className="text-gray-600 mb-6 text-sm">Start from <span className="text-xl font-bold text-gray-900">$59.00</span></p>

                    <img
                        src="https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=300"
                        alt="Kraft Paper"
                        className="w-48 h-48 object-contain mb-6 group-hover:scale-110 transition-transform duration-500"
                    />

                    <Link to="/products">
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 rounded-full shadow-sm">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeProductLists;
