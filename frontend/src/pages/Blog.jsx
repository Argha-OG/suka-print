import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Top 5 Design Trends for Business Cards in 2026",
            excerpt: "Discover the latest styles that are making professionals stand out this year. Minimalist, holographic, and eco-friendly materials are leading the way.",
            date: "Jan 15, 2026",
            author: "Sarah Lee",
            image: "https://images.unsplash.com/photo-1557053503-0c252e5c8093?auto=format&fit=crop&q=80&w=800",
            category: "Design Tips"
        },
        {
            id: 2,
            title: "Why Printed Marketing Materials Still Matter",
            excerpt: "In a digital world, physical touchpoints create memorable brand experiences. Learn why flyers, brochures, and banners are essential for local marketing.",
            date: "Dec 10, 2025",
            author: "James Tan",
            image: "https://images.unsplash.com/photo-1563986768494-4dee46a38531?auto=format&fit=crop&q=80&w=800",
            category: "Marketing"
        },
        {
            id: 3,
            title: "Guide to Choosing the Right Paper Stock",
            excerpt: "GSM, matte, glossy, or uncoated? We break down everything you need to know about paper types to ensure your print project looks perfect.",
            date: "Nov 28, 2025",
            author: "Suka Print Team",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
            category: "Printing Guides"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Blog</h1>
                <p className="text-gray-600">Insights, tips, and news from the printing world.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-primary-gray">
                                {post.category}
                            </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-primary-blue line-clamp-2">
                                <Link to="#">{post.title}</Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto">
                                <Link to="#" className="text-primary-blue font-semibold text-sm hover:underline">Read More →</Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
