import React from 'react';
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react';

const ServiceIcons = () => {
    const services = [
        {
            icon: <Truck size={32} />,
            title: "Worldwide Shipping",
            subtitle: "On orders over RM150",
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: <RotateCcw size={32} />,
            title: "Returns",
            subtitle: "Within 30 days for an exchange",
            color: "from-purple-400 to-purple-600"
        },
        {
            icon: <Headphones size={32} />,
            title: "Online Support",
            subtitle: "24/7 online support center",
            color: "from-pink-400 to-pink-600"
        },
        {
            icon: <CreditCard size={32} />,
            title: "Secure Payment",
            subtitle: "Pay with multiple credit cards",
            color: "from-orange-400 to-orange-600"
        }
    ];

    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((item, index) => (
                    <div key={index} className="group relative p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        {/* Gradient Background Decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-500`}></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-blue transition-colors">{item.title}</h3>
                            <p className="text-gray-500 text-sm font-medium">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceIcons;
