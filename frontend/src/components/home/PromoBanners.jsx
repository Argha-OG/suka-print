"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PromoBanners = ({ customBanners }) => {
    // Fallback default banners if none provided from database
    const defaultBanners = [
        {
            _id: 'd1',
            image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=400",
            title: "Colorful Sticker Pack",
            subtitle: "New Design",
            link: "/products",
            bgColor: "bg-pink-50",
            tagColor: "bg-yellow-400"
        },
        {
            _id: 'd2',
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400",
            title: "Gift Card for your friend",
            subtitle: "Gift",
            link: "/products",
            bgColor: "bg-gray-50",
            tagColor: "bg-green-400"
        },
        {
            _id: 'd3',
            image: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=400",
            title: "Cardboard Package Box",
            subtitle: "Combo",
            link: "/products",
            bgColor: "bg-teal-50",
            tagColor: "bg-blue-400"
        }
    ];

    const banners = customBanners && customBanners.length > 0 ? customBanners : defaultBanners;

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {banners.map((banner, index) => (
                    <div 
                        key={banner._id || index} 
                        className={`relative h-64 ${banner.bgColor || (index % 3 === 0 ? 'bg-pink-50' : index % 3 === 1 ? 'bg-gray-50' : 'bg-teal-50')} rounded-2xl p-8 overflow-hidden group hover:shadow-lg transition-all duration-300`}
                    >
                        <div className="relative z-10 max-w-[60%]">
                            {banner.subtitle && (
                                <span className={`inline-block px-3 py-1 ${banner.tagColor || (index % 3 === 0 ? 'bg-yellow-400' : index % 3 === 1 ? 'bg-green-400 text-white' : 'bg-blue-400 text-white')} text-xs font-bold rounded-full mb-3 uppercase tracking-wider`}>
                                    {banner.subtitle}
                                </span>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{banner.title}</h3>
                            <Link href={banner.link || "/products"} className="inline-flex items-center text-sm font-semibold text-primary-blue mt-2 hover:underline">
                                View Now <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="absolute right-0 bottom-0 w-32 md:w-40 mr-[-20px] mb-[-20px] rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PromoBanners;
