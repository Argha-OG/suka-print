import React from 'react';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/utils/SEO';

const About = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <SEO
                title="About Us"
                description="Learn about SukaPrint's journey from a local print shop to a comprehensive design and print house in Malaysia."
            />
            {/* Hero */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="flex-1">
                    <span className="text-primary-magenta font-bold uppercase tracking-wider text-sm mb-2 block">Our Story</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Printing Excellence Since 2015</h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Suka Print started with a simple mission: to provide high-quality, affordable printing solutions for local businesses in Kuala Lumpur. Over the years, we've grown into a comprehensive design and print house, serving thousands of satisfied clients across Malaysia.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We believe that print is not just about ink on paper; it's about bringing your brand's vision to reality. Whether it's a simple business card or a complex marketing campaign, we treat every project with the same level of passion and precision.
                    </p>
                </div>
                <div className="flex-1 relative">
                    <img
                        src="https://images.unsplash.com/photo-1568284587372-b2586e92c2ae?auto=format&fit=crop&q=80&w=800"
                        alt="Printing Press"
                        className="rounded-2xl shadow-2xl z-10 relative"
                    />
                    <div className="absolute top-10 right-10 w-full h-full border-2 border-primary-blue rounded-2xl -z-0 translate-x-4 -translate-y-4 hidden md:block"></div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Suka Print?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Quality Guaranteed", desc: "We use premium materials and state-of-the-art machinery." },
                        { title: "Fast Turnaround", desc: "Most orders are ready within 24-48 hours." },
                        { title: "Eco-Friendly Options", desc: "Sustainable paper choices and soy-based inks available." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                            <CheckCircle className="text-green-500 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team/Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-b border-gray-100 py-12">
                {[
                    { label: "Happy Clients", value: "5000+" },
                    { label: "Projects Completed", value: "12500+" },
                    { label: "Years Experience", value: "10+" },
                    { label: "Awards Won", value: "15" }
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl font-bold text-primary-blue mb-2">{stat.value}</div>
                        <div className="text-gray-500 text-sm uppercase font-semibold">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
