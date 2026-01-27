import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400' },
    { name: 'Flyers & Leaflets', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400' },
    { name: 'Stickers & Labels', image: 'https://images.unsplash.com/photo-1626084478347-160c8cbfa2aa?auto=format&fit=crop&q=80&w=400' },
    { name: 'Banners', image: 'https://images.unsplash.com/photo-1563986768494-4dee46a38531?auto=format&fit=crop&q=80&w=400' },
    { name: 'Booklets', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400' },
    { name: 'Posters', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=400' },
];

const PopularCategories = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                            <span className="text-white font-medium text-center text-sm md:text-base">{cat.name}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
