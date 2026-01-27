import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const PromoBanners = () => {
    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Banner 1 */}
                <div className="relative h-64 bg-pink-50 rounded-2xl p-8 overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative z-10 max-w-[60%]">
                        <span className="inline-block px-3 py-1 bg-yellow-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">New Design</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">Colorful Sticker Pack</h3>
                        <Link to="/products" className="inline-flex items-center text-sm font-semibold text-primary-magenta mt-2 hover:underline">
                            View Now <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=400"
                        alt="Stickers"
                        className="absolute right-0 bottom-0 w-32 md:w-40 mr-[-20px] mb-[-20px] rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
                    />
                </div>

                {/* Banner 2 */}
                <div className="relative h-64 bg-gray-50 rounded-2xl p-8 overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative z-10 max-w-[60%]">
                        <span className="inline-block px-3 py-1 bg-green-400 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">Gift</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">Gift Card for your friend</h3>
                        <Link to="/products" className="inline-flex items-center text-sm font-semibold text-primary-blue mt-2 hover:underline">
                            View Now <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400"
                        alt="Gift Card"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-32 shadow-xl rounded-lg group-hover:scale-110 transition-all duration-500"
                    />
                </div>

                {/* Banner 3 */}
                <div className="relative h-64 bg-teal-50 rounded-2xl p-8 overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative z-10 max-w-[60%]">
                        <span className="inline-block px-3 py-1 bg-blue-400 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">Combo</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">Cardboard Package Box</h3>
                        <Link to="/products" className="inline-flex items-center text-sm font-semibold text-teal-600 mt-2 hover:underline">
                            Shop Now <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=400"
                        alt="Box"
                        className="absolute right-0 bottom-0 w-32 md:w-36 mr-[-10px] mb-[-10px] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default PromoBanners;
