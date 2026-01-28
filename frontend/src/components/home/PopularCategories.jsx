import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { name: 'Business Cards', image: 'https://i.pinimg.com/736x/d2/17/37/d21737ad3b3efafb0447396cd90e72b5.jpg?auto=format&fit=crop&q=80&w=400' },
    { name: 'Flyers & Leaflets', image: 'https://i.pinimg.com/1200x/a9/18/72/a9187200aba807217c92d379d7d5bd14.jpg?auto=format&fit=crop&q=80&w=400' },
    { name: 'Stickers & Labels', image: 'https://i.pinimg.com/1200x/9a/b0/c5/9ab0c5eb69dcde68d501687f2775df40.jpg?auto=format&fit=crop&q=80&w=400' },
    { name: 'Banners', image: 'https://i.pinimg.com/1200x/ec/ad/dc/ecaddc22a5b10b944662fbb9cf9372d1.jpg?auto=format&fit=crop&q=80&w=400' },
    { name: 'Booklets', image: 'https://i.pinimg.com/1200x/9c/49/80/9c4980dd6228bdfca44fc82791c78901.jpg?auto=format&fit=crop&q=80&w=400' },
    { name: 'Posters', image: 'https://i.pinimg.com/736x/ce/af/d3/ceafd31acddcdce3322cd0c348c1c602.jpg?auto=format&fit=crop&q=80&w=400' },
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
