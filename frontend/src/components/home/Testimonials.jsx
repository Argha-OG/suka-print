import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Jason L.",
        role: "Customer",
        content: "Fast service and very affordable. I printed some custom t-shirts for my team and the quality was amazing. Will definitely come back for future orders.",
        avatar: "https://i.pravatar.cc/150?u=jason"
    },
    {
        name: "Nurul A.",
        role: "Event Organizer",
        content: "Layanan sangat mesra dan hasil cetakan memang berkualiti tinggi! Saya tempah banner untuk event sekolah dan semuanya siap tepat pada masanya. Highly recommended!",
        avatar: "https://i.pravatar.cc/150?u=nurul"
    },
    {
        name: "Siti Mariam",
        role: "Bride-to-be",
        content: "Kedai printing terbaik yang saya pernah guna! Design cantik, harga berpatutan, dan staff pun sangat membantu. Tempah kad kahwin saya pun dari sini!",
        avatar: "https://i.pravatar.cc/150?u=siti"
    },
    {
        name: "Priya Subramaniam",
        role: "Business Owner",
        content: "Superb service! I needed last-minute printing for my business flyers and they delivered everything perfectly and on time. Thank you!",
        avatar: "https://i.pravatar.cc/150?u=priya"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
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
