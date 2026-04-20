"use client";
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = ({ customTestimonials }) => {
    const defaultTestimonials = [
        {
            name: "Jason L.",
            feedback: "Fast service and very affordable. I printed some custom t-shirts for my team and the quality was amazing. Will definitely come back for future orders.",
            avatar: "https://i.pravatar.cc/150?u=jason",
            rating: 5
        },
        {
            name: "Siti Mariam",
            feedback: "Kedai printing terbaik yang saya pernah guna! Design cantik, harga berpatutan, dan staff pun sangat membantu. Tempah kad kahwin saya pun dari sini!",
            avatar: "https://i.pravatar.cc/150?u=siti",
            rating: 5
        },
        {
            name: "David Tan",
            feedback: "Professional work for my restaurant's menus. The premium cards they recommended were also a huge hit. Highly recommended!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            name: "Amira Zahari",
            feedback: "Sangat cepat! Order banner pagi, petang dah siap. Kualiti gambar pun tajam tak pecah. Terima kasih Suka Print!",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            rating: 5
        }
    ];

    const displayTestimonials = customTestimonials && customTestimonials.length > 0 ? customTestimonials : defaultTestimonials;

    return (
        <section className="mb-20 bg-primary-blue/5 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
                <div className="w-20 h-1 bg-primary-magenta mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {displayTestimonials.map((t, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-white/40">
                        <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 italic mb-6">"{t.feedback}"</p>
                        <div className="flex items-center gap-4">
                            <img src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary-blue/20" />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                <span className="text-xs text-primary-blue font-medium">Customer</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
