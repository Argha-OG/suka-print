import React from 'react';
import { Button } from '../ui/button';
import { Smartphone } from 'lucide-react';

const AppBanner = () => {
    return (
        <section className="mb-16">
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                {/* Content */}
                <div className="z-10 max-w-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Faster with SukaPrint App</h2>
                    <p className="text-gray-600 mb-8 text-lg">Available on iOS and Android. Download now and get exclusive app-only deals!</p>

                    <div className="flex gap-4">
                        <Button className="bg-black text-white px-6 py-6 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors">
                            <Smartphone size={24} />
                            <div className="text-left">
                                <div className="text-[10px] uppercase">Download on the</div>
                                <div className="text-sm font-bold leading-none">App Store</div>
                            </div>
                        </Button>
                        <Button className="bg-black text-white px-6 py-6 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors">
                            <Smartphone size={24} />
                            <div className="text-left">
                                <div className="text-[10px] uppercase">Get it on</div>
                                <div className="text-sm font-bold leading-none">Google Play</div>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Mockup Image */}
                <div className="relative mt-8 md:mt-0 z-10">
                    <img
                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400"
                        alt="Mobile App"
                        className="w-64 rotate-[-12deg] shadow-2xl border-[8px] border-black rounded-[2.5rem]"
                    />
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
        </section>
    );
};

export default AppBanner;
