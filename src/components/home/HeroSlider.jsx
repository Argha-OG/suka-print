"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { 
    ArrowRight, 
    ArrowLeft, 
    Menu, 
    CreditCard, 
    Truck, 
    Notebook, 
    Pen, 
    PenTool, 
    Star 
} from 'lucide-react';

const PREDEFINED_GRADIENTS = [
    "from-blue-600 to-cyan-600",
    "from-pink-500 to-rose-500",
    "from-purple-600 to-indigo-600",
    "from-orange-500 to-amber-500",
    "from-emerald-600 to-teal-600",
    "from-red-600 to-rose-600"
];

const categories = [
    { name: "Business Cards", icon: <CreditCard size={18} /> },
    { name: "Banners", icon: <Truck size={18} /> },
    { name: "Packaging", icon: <Notebook size={18} /> },
    { name: "Stickers", icon: <Pen size={18} /> },
    { name: "Booklets", icon: <Notebook size={18} /> },
    { name: "Gifts", icon: <PenTool size={18} /> }
];

const HeroSlider = ({ customSlides }) => {
    const [current, setCurrent] = useState(0);

    if (!customSlides || customSlides.length === 0) {
        return null;
    }

    const displaySlides = customSlides.map((slide, i) => ({
        ...slide,
        gradient: PREDEFINED_GRADIENTS[i % PREDEFINED_GRADIENTS.length]
    }));

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % displaySlides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Sidebar Categories (1 Col) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                <div className="bg-primary-magenta text-white px-6 py-4 flex items-center gap-3 font-bold uppercase tracking-wide text-sm">
                    <Menu size={20} />
                    Shop By Categories
                </div>
                <ul className="py-2">
                    {categories.map((cat, idx) => (
                        <li key={idx}>
                            <Link 
                                href={`/products?category=${encodeURIComponent(cat.name)}`} 
                                className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-primary-blue hover:bg-gray-50 transition-colors group"
                            >
                                <span className="text-gray-400 group-hover:text-primary-blue transition-colors">{cat.icon}</span>
                                <span className="font-medium text-xs md:text-sm">{cat.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Slider (3 Cols) */}
            <div className="lg:col-span-3 h-[400px] md:h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl group">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 bg-gradient-to-br ${displaySlides[current].gradient} flex items-center justify-between p-8 md:p-16`}
                    >
                        {/* Text Content */}
                        <div className="relative z-10 max-w-lg text-white space-y-6">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-90"
                            >
                                {displaySlides[current].subtitle}
                            </motion.span>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                            >
                                {displaySlides[current].title}
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/90 text-sm md:text-lg max-w-md hidden md:block"
                            >
                                {displaySlides[current].description}
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href={`/products?category=${encodeURIComponent(displaySlides[current].title.replace("Premium ", "").replace("Vibrant ", "").replace("Professional ", "").replace("Custom ", ""))}`}>
                                    <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full h-12 px-8 text-sm md:text-base font-bold shadow-lg flex items-center gap-2">
                                        Shop Now <ArrowRight size={18} />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Content */}
                        <motion.div
                            initial={{ x: 50, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="hidden md:block relative z-10"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-110"></div>
                                <img
                                    src={displaySlides[current].image}
                                    alt={displaySlides[current].title}
                                    className="w-full h-full object-contain rounded-2xl shadow-2xl rotate-[-5deg] border-4 border-white/20"
                                    style={{ background: 'rgba(255,255,255,0.1)' }}
                                />
                            </div>
                        </motion.div>

                        <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
                    aria-label="Previous Slide"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
                    aria-label="Next Slide"
                >
                    <ArrowRight size={24} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {displaySlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${current === idx ? 'bg-white w-6 md:w-8' : 'bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
