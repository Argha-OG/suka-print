import React from 'react';
import { Printer, FileText, Image, Layers, Package, PenTool } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
    const serviceList = [
        {
            icon: <Printer size={40} />,
            title: "Digital Printing",
            description: "High-quality digital printing for business cards, flyers, and brochures with quick turnaround times."
        },
        {
            icon: <Image size={40} />,
            title: "Large Format",
            description: "Banners, bunting, and outdoor signage that gets you noticed from a distance."
        },
        {
            icon: <Package size={40} />,
            title: "Packaging Solutions",
            description: "Custom boxes, labels, and stickers to elevate your product presentation."
        },
        {
            icon: <FileText size={40} />,
            title: "Corporate Stationary",
            description: "Letterheads, envelopes, and folders that maintain brand consistency."
        },
        {
            icon: <PenTool size={40} />,
            title: "Graphic Design",
            description: "Professional design services to bring your creative ideas to life."
        },
        {
            icon: <Layers size={40} />,
            title: "Offset Printing",
            description: "Cost-effective high-volume printing for magazines, booklets, and catalogs."
        }
    ];

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-gray-600">We offer a comprehensive range of printing solutions tailored to your business needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {serviceList.map((service, index) => (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-magenta group-hover:text-white transition-colors">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                        <Link to="/products" className="text-sm font-bold text-primary-blue uppercase tracking-wide group-hover:text-primary-magenta">
                            Learn More &rarr;
                        </Link>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="bg-primary-blue rounded-2xl p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-6">Need a Custom Quote?</h2>
                    <p className="mb-8 text-blue-100 max-w-xl mx-auto">Contact our team for specialized printing projects or bulk orders.</p>
                    <Link to="/contact">
                        <Button variant="secondary" size="lg" className="bg-white text-primary-blue hover:bg-gray-100">Get a Quote</Button>
                    </Link>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
        </div>
    );
};

export default Services;
