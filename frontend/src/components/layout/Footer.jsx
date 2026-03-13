"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/api/settings`);
                const data = await res.json();
                setSettings(data);
            } catch (err) {
                console.error('Failed to fetch footer settings');
            }
        };
        fetchSettings();
    }, []);

    const brandName = settings?.brandName || "Suka Print";

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 mt-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            <span className="text-primary-blue">{brandName.split(' ')[0] || "Suka"}</span>
                            <span className="text-primary-magenta">{brandName.split(' ').slice(1).join(' ') || "Print"}</span>
                        </h2>
                        <p className="text-gray-400 text-sm mb-6">
                            {settings?.footerDescription || "Premium printing solutions for businesses and individuals. High-quality materials, fast delivery, and exceptional service."}
                        </p>
                        <div className="flex gap-4">
                            <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-primary-blue text-white rounded-full" asChild>
                                <a href={settings?.socialLinks?.facebook || "#"}><Facebook size={18} /></a>
                            </Button>
                            <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-primary-magenta text-white rounded-full" asChild>
                                <a href={settings?.socialLinks?.instagram || "#"}><Instagram size={18} /></a>
                            </Button>
                            <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-primary-blue text-white rounded-full" asChild>
                                <a href={settings?.socialLinks?.twitter || "#"}><Twitter size={18} /></a>
                            </Button>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/help-center" className="hover:text-primary-blue transition-colors">Help Center</Link></li>
                            <li><Link href="/returns-refunds" className="hover:text-primary-blue transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/shipping-info" className="hover:text-primary-blue transition-colors">Shipping Info</Link></li>
                            <li><Link href="/track-order" className="hover:text-primary-blue transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Quick Link */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Company</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-primary-blue transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-blue transition-colors">Our Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-primary-blue transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-blue transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
                        <p className="text-gray-400 text-sm mb-4">Get the latest updates and offers.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                            <Button className="bg-primary-blue hover:bg-blue-600">Join</Button>
                        </div>
                        <div className="mt-6 space-y-2 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-primary-blue" /> {settings?.contactPhone || "+60 11-1414 1509"}
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-primary-blue" /> {settings?.contactEmail || "hello@sukaprint.com"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
