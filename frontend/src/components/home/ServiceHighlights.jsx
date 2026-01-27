import React from 'react';
import { Truck, RotateCcw, Headset, CreditCard } from 'lucide-react';
import { Card } from '../ui/card';

const services = [
    {
        icon: Truck,
        title: "Worldwide Shipping",
        desc: "Fast and reliable delivery to your doorstep."
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        desc: "Hassle-free 30-day return policy."
    },
    {
        icon: Headset,
        title: "24/7 Support",
        desc: "Dedicated support team ready to help."
    },
    {
        icon: CreditCard,
        title: "Secure Payment",
        desc: "Multiple secure payment options available."
    }
];

const ServiceHighlights = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((item, index) => (
                <Card key={index} glass className="flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-default border-primary-blue/10 hover:border-primary-blue/40">
                    <div className="p-3 bg-primary-blue/10 rounded-full text-primary-blue">
                        <item.icon size={28} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ServiceHighlights;
