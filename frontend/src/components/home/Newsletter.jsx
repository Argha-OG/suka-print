import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="mb-16">
            <div className="bg-secondary-pink rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Newsletter</h2>
                    <p className="text-gray-700 mb-8">Subscribe to our newsletter and be among the first to receive our exclusive deals and updates on printing services.</p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            placeholder="Your email address"
                            className="bg-white/80 border-0 h-12 px-6 rounded-full focus:bg-white transition-all shadow-sm"
                        />
                        <Button className="h-12 px-8 rounded-full bg-primary-magenta text-white hover:bg-magenta-600 font-bold shadow-lg">
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* Decor Icons */}
                <Mail className="absolute top-10 left-10 text-white/30 rotate-12 w-24 h-24" />
                <Mail className="absolute bottom-10 right-10 text-white/30 -rotate-12 w-32 h-32" />
            </div>
        </section>
    );
};

export default Newsletter;
