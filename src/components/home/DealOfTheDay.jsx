"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DealOfTheDay = ({ customDeal }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const targetDate = customDeal?.expiryTime ? new Date(customDeal.expiryTime) : new Date();
        if (!customDeal?.expiryTime) {
            targetDate.setDate(targetDate.getDate() + 2);
        }

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [customDeal]);

    // If no custom deal, we could show a placeholder or nothing. 
    // For now, let's show a fallback if nothing provided.
    if (!customDeal?.product) return null;

    const product = customDeal.product;

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-bold">{customDeal.title || "Deal of The Day"}</h2>
                    <div className="flex gap-2">
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.hours}H</div>
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.minutes}M</div>
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.seconds}S</div>
                    </div>
                </div>
                <Link href="/products" className="text-sm font-semibold text-gray-500 hover:text-primary-blue">View all deals &gt;</Link>
            </div>

            <div className="max-w-md mx-auto">
                <Link href={`/products/${product._id}`} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all group block border border-red-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 font-black rounded-bl-2xl z-10 animate-pulse">
                        {customDeal.discountText || "HOT DEAL"}
                    </div>
                    <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-50 h-64 flex items-center justify-center">
                        <img src={product.imagePath || product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-900 truncate">{product.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-4 pt-2">
                            <span className="text-2xl font-black text-red-600">RM{product.price.toFixed(2)}</span>
                            <span className="text-gray-400 line-through">RM{(product.price * 1.5).toFixed(2)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default DealOfTheDay;
