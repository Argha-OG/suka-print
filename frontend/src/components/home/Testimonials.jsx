import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Marketing Director",
        content: "Suka Print delivered our exhibition banners in record time. The quality was absolutely stunning and vivid!",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        name: "David Chong",
        role: "Graphic Designer",
        content: "As a designer, I'm picky about color accuracy. They nailed the Pantone matching perfectly. Highly recommended.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        name: "Michelle Tan",
        role: "Small Business Owner",
        content: "The packaging boxes really elevated my product's unboxing experience. My customers love it!",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    }
];

const Testimonials = () => {
    return (
        <section className="mb-20 bg-primary-blue/5 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
                <div className="w-20 h-1 bg-primary-magenta mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-white/40">
                        <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 italic mb-6">"{t.content}"</p>
                        <div className="flex items-center gap-4">
                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary-blue/20" />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                <span className="text-xs text-primary-blue font-medium">{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
