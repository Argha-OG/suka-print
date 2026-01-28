import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const sliderImages = [
    "https://sukaprint.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-8.56.47-AM-4-768x768.jpeg",
    "https://sukaprint.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-8.56.47-AM-3-768x768.jpeg",
    "https://sukaprint.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-8.56.48-AM-1-768x576.jpeg",
    "https://sukaprint.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-8.56.48-AM-768x768.jpeg",
    "https://sukaprint.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-8.56.47-AM-2-768x768.jpeg"
];

const CustomPrintsSection = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % sliderImages.length);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Text Content */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                                Personalized Solutions
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                                Make Every Gift Unforgettable with Custom Prints.
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                Looking for personalized gifts and high-quality printing services in Malaysia? We offer creative, customized solutions for personal celebrations, corporate events, and business branding.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                From unique keepsakes and stylish packaging to professional printing for flyers, banners, and clothing, we ensure top-notch quality and fast, reliable service. Let us bring your vision to life and make every moment memorable!
                            </p>

                            <Link to="/contact">
                                <Button className="bg-gray-900 text-white hover:bg-black px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                    Start Your Project <ArrowRight size={20} />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Slider */}
                    <div className="relative h-[400px] lg:h-auto overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current}
                                src={sliderImages[current]}
                                alt="Custom Printing Service"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                        {/* Slider Indicators */}
                        <div className="absolute bottom-6 left-6 flex gap-2 z-10">
                            {sliderImages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CustomPrintsSection;
