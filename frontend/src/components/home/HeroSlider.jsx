import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, Menu, Plug, Notebook, Utensils, Coffee, Pen, PenTool } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Premium Business Cards",
        subtitle: "MAKE A LASTING IMPRESSION",
        description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
        image: "https://i.pinimg.com/736x/d2/17/37/d21737ad3b3efafb0447396cd90e72b5.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-blue-600 to-cyan-600"
    },
    {
        id: 2,
        title: "Vibrant Marketing Banners",
        subtitle: "STAND OUT FROM THE CROWD",
        description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
        image: "https://i.pinimg.com/1200x/a9/18/72/a9187200aba807217c92d379d7d5bd14.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: 3,
        title: "Custom Packaging",
        subtitle: "UNBOX THE EXPERIENCE",
        description: "Tailored boxes and labels that elevate your brand value.",
        image: "https://i.pinimg.com/1200x/9a/b0/c5/9ab0c5eb69dcde68d501687f2775df40.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-purple-600 to-indigo-600"
    },
    {
        id: 4,
        title: "Custom Stickers & Labels",
        subtitle: "STICK WITH EXCELLENCE",
        description: "Waterproof, durable, and custom-cut options for product branding and promotions.",
        image: "https://i.pinimg.com/1200x/ec/ad/dc/ecaddc22a5b10b944662fbb9cf9372d1.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-orange-500 to-amber-500"
    },
    {
        id: 5,
        title: "Professional Booklets",
        subtitle: "SHARE YOUR STORY",
        description: "Perfect for company profiles, reports, and product catalogs with premium binding.",
        image: "https://i.pinimg.com/1200x/9c/49/80/9c4980dd6228bdfca44fc82791c78901.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-emerald-600 to-teal-600"
    },
    {
        id: 6,
        title: "Corporate Gifts & Apparel",
        subtitle: "BRANDED MERCHANDISE",
        description: "High-quality pens, mugs, and shirts to promote your business identity.",
        image: "https://i.pinimg.com/736x/ce/af/d3/ceafd31acddcdce3322cd0c348c1c602.jpg?auto=format&fit=crop&q=80&w=1000",
        gradient: "from-red-600 to-rose-600"
    }
];

const categories = [
    { name: "Travel Adapter", icon: <Plug size={18} /> },
    { name: "Notepad", icon: <Notebook size={18} /> },
    { name: "Kitchenware", icon: <Utensils size={18} /> },
    { name: "Vacuum Flask", icon: <Coffee size={18} /> },
    { name: "Plastic pen", icon: <Pen size={18} /> },
    { name: "Metal Pen", icon: <PenTool size={18} /> }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Sidebar Categories (1 Col) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                <div className="bg-primary-magenta text-white px-6 py-4 flex items-center gap-3 font-bold uppercase tracking-wide">
                    <Menu size={20} />
                    Shop By Categories
                </div>
                <ul className="py-2">
                    {categories.map((cat, idx) => (
                        <li key={idx}>
                            <Link to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-primary-blue hover:bg-gray-50 transition-colors group">
                                <span className="text-gray-400 group-hover:text-primary-blue transition-colors">{cat.icon}</span>
                                <span className="font-medium text-sm">{cat.name}</span>
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
                        className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient} flex items-center justify-between p-8 md:p-16`}
                    >
                        {/* Text Content */}
                        <div className="relative z-10 max-w-lg text-white space-y-6">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block text-sm md:text-base font-bold tracking-[0.2em] uppercase opacity-90"
                            >
                                {slides[current].subtitle}
                            </motion.span>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-extrabold leading-tight"
                            >
                                {slides[current].title}
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/90 text-sm md:text-lg max-w-md hidden md:block"
                            >
                                {slides[current].description}
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/products">
                                    <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full h-12 px-8 text-base font-bold shadow-lg flex items-center gap-2">
                                        Shop Now <ArrowRight size={18} />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Content - Hidden on small mobile to save space, visible on md+ */}
                        <motion.div
                            initial={{ x: 50, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="hidden md:block relative z-10"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                {/* Decorative circle */}
                                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-110"></div>
                                <img
                                    src={slides[current].image}
                                    alt={slides[current].title}
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl rotate-[-5deg] border-4 border-white/20"
                                />
                            </div>
                        </motion.div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30 group-hover:opacity-100 opacity-0 md:opacity-100"
                    aria-label="Previous Slide"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30 group-hover:opacity-100 opacity-0 md:opacity-100"
                    aria-label="Next Slide"
                >
                    <ArrowRight size={24} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
