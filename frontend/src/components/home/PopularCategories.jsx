"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const defaultCategories = [
    { name: 'Business Cards', image: '/assets/images/products/cards/standard.png' },
    { name: 'Banners', image: '/assets/images/products/banners/vinyl.png' },
    { name: 'Packaging', image: '/assets/images/products/packaging/mailer.png' },
    { name: 'Stickers', image: '/assets/images/products/stickers/vinyl.png' },
    { name: 'Gifts', image: '/assets/images/products/gifts/flask.png' },
    { name: 'Booklets', image: '/assets/images/products/booklets/catalog.png' },
];

const PopularCategories = ({ customCategories }) => {
    const categories = customCategories || defaultCategories;

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                    <Link 
                        key={index} 
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="block"
                    >
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer border border-gray-100 shadow-sm"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=400";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-center p-4">
                                <span className="text-white font-bold text-center text-sm md:text-base tracking-tight">{cat.name}</span>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
