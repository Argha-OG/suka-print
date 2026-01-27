import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { products } from '../../data/products';

// Use first 4 products as deals
const deals = products.slice(0, 4);

const DealOfTheDay = () => {
    // ... timer logic ...
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2);
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-bold">Deal of The Day</h2>
                    <div className="flex gap-2">
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.hours}H</div>
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.minutes}M</div>
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">{timeLeft.seconds}S</div>
                    </div>
                </div>
                <Link to="/products" className="text-sm font-semibold text-gray-500 hover:text-primary-blue">View all deals &gt;</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {deals.map(deal => (
                    <Link to={`/products/${deal._id}`} key={deal._id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all group block">
                        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50 h-48 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">HOT</div>
                            <img src={deal.image} alt={deal.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{deal.title}</h3>
                        <div className="text-red-500 font-bold">RM{deal.price.toFixed(2)} <span className="text-gray-400 text-xs font-normal line-through ml-2">RM{(deal.price * 1.2).toFixed(2)}</span></div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default DealOfTheDay;
