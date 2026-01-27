import React from 'react';
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react';

const ServiceIcons = () => {
    const services = [
        { icon: <Truck size={32} />, title: "Worldwide Shipping", subtitle: "On orders over RM150" },
        { icon: <RotateCcw size={32} />, title: "Returns", subtitle: "Within 30 days for an exchange" },
        { icon: <Headphones size={32} />, title: "Online Support", subtitle: "24/7 online support center" },
        { icon: <CreditCard size={32} />, title: "Secure Payment", subtitle: "Pay with multiple credit cards" }
    ];

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 mb-4 group-hover:bg-primary-magenta group-hover:text-white transition-colors duration-300">
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.subtitle}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceIcons;
