import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, CreditCard, BookOpen, ScrollText, Sticker, Tag, Flag, Pin, AlertCircle, Menu } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Premium Business Cards",
        subtitle: "Make a lasting impression.",
        description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
        image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=1000",
        color: "from-primary-blue to-cyan-400"
    },
    {
        id: 2,
        title: "Vibrant Marketing Banners",
        subtitle: "Stand out from the crowd.",
        description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
        color: "from-primary-magenta to-pink-500"
    },
    {
        id: 3,
        title: "Custom Packaging",
        subtitle: "Unbox the experience.",
        description: "Tailored boxes and labels that elevate your brand value.",
        image: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=1000",
        color: "from-purple-600 to-indigo-600"
    }
];

const categories = [
    { name: "Business Cards", icon: <CreditCard size={18} /> },
    { name: "Booklets", icon: <BookOpen size={18} /> },
    { name: "Flyers", icon: <ScrollText size={18} /> },
    { name: "Stickers", icon: <Sticker size={18} /> },
    { name: "Labels", icon: <Tag size={18} /> },
    { name: "Banners", icon: <Flag size={18} /> },
    { name: "Posters", icon: <Pin size={18} /> },
    { name: "Signs", icon: <AlertCircle size={18} /> }
];

const HeroSlider = () => {
    // ... logic remains ...
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Sidebar Categories (1 Col) */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary-magenta text-white px-6 py-4 flex items-center gap-3 font-bold uppercase tracking-wide">
                    <Menu size={20} />
                    Shop By Categories
                </div>
                <ul>
                    {categories.map((cat, idx) => (
                        <li key={idx} className="border-b border-gray-100 last:border-none">
                            <Link to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:text-primary-blue hover:bg-gray-50 transition-colors group">
                                <span className="text-gray-400 group-hover:text-primary-blue transition-colors">{cat.icon}</span>
                                <span className="font-medium">{cat.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Slider (3 Cols) */}
            <div className="lg:col-span-3 h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-xl group">
                <AnimatePresence mode='wait'>
                    <motion.div
                        // ... props ...
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Background Image */}
                        <img
                            src={slides[current].image}
                            alt={slides[current].title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].color} opacity-90 mixing-blend-multiply`}></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center px-12 md:px-20 text-white z-10">
                            <div className="max-w-xl">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg md:text-xl font-medium mb-4 tracking-wider uppercase opacity-90"
                                >
                                    {slides[current].subtitle}
                                </motion.h2>
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                                >
                                    {slides[current].title}
                                </motion.h1>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link to="/products">
                                        <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg shadow-lg">
                                            Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Floating Mockup Image (Right Side) */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                            >
                                <div className="text-center">
                                    <span className="block text-5xl font-bold mb-2">Save</span>
                                    <span className="block text-4xl w-24 h-24 bg-white text-primary-magenta rounded-full flex items-center justify-center font-extrabold mx-auto shadow-xl">RM5.00</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <button onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all">
                    <ArrowRight className="rotate-180" />
                </button>
                <button onClick={() => setCurrent((prev) => (prev + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all">
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default HeroSlider;
