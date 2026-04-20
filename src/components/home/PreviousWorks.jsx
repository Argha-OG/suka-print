"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ZoomIn, X } from 'lucide-react';
import axios from 'axios';
import { getBaseURL } from '@/lib/api';

const PreviousWorks = () => {
    const [selectedWork, setSelectedWork] = useState(null);
    const [previousWorks, setPreviousWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await axios.get(`${getBaseURL()}/portfolio`);
                setPreviousWorks(res.data);
            } catch (err) {
                console.error("Failed to fetch portfolio", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    if (loading) return (
        <div className="py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-primary-magenta border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (previousWorks.length === 0) return null;

    return (
        <section className="mb-20 relative">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 bg-primary-magenta/10 text-primary-magenta text-xs font-bold rounded-full mb-4 uppercase tracking-wider"
                    >
                        Our Portfolio
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold text-gray-900"
                    >
                        Showcasing Our <span className="text-primary-blue">Excellence</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-4 text-gray-600 text-lg"
                    >
                        A glimpse into the high-quality custom printing projects we've delivered for our valued clients across Malaysia.
                    </motion.p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {previousWorks.map((work, index) => (
                    <motion.div
                        key={work._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        onClick={() => setSelectedWork(work)}
                    >
                        {/* Image */}
                        <img 
                            src={work.image.split('/').map(segment => encodeURIComponent(segment)).join('/')} 
                            alt={work.title} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800";
                            }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-primary-magenta text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                {work.category}
                            </span>
                            <h3 className="text-white font-bold text-xl mb-4 group-hover:text-white transition-colors">
                                {work.title}
                            </h3>
                            
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                <button 
                                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary-blue transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedWork(work);
                                    }}
                                >
                                    <ZoomIn size={20} />
                                </button>
                                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary-magenta transition-all">
                                    <ExternalLink size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-12 group-hover:rotate-0">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-1.5 h-1.5 bg-primary-magenta rounded-full"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Zoom Modal */}
            <AnimatePresence>
                {selectedWork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
                        onClick={() => setSelectedWork(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedWork(null)}
                                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary-magenta transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 pointer-events-auto"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative w-full flex flex-col items-center pointer-events-auto">
                                <img 
                                    src={selectedWork.image.split('/').map(segment => encodeURIComponent(segment)).join('/')} 
                                    alt={selectedWork.title} 
                                    className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                                />

                                <div className="mt-6 text-center">
                                    <span className="inline-block px-3 py-1 bg-primary-magenta text-white text-[10px] font-bold rounded-full mb-2 uppercase tracking-[0.2em] shadow-lg shadow-primary-magenta/20">
                                        {selectedWork.category}
                                    </span>
                                    <h3 className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                                        {selectedWork.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PreviousWorks;
