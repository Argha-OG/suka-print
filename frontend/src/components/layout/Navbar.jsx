import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/suka.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            {/* Top Bar */}
            <div className="bg-primary-blue/90 text-white text-xs py-1 px-4 md:px-8 flex justify-between items-center backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><MapPin size={12} /> Kuala Lumpur, Malaysia</span>
                    <span className="hidden md:inline">Free Shipping on Orders Over RM100</span>
                </div>
                <div className="flex items-center gap-3">
                    <a href="#" className="hover:text-accent"><Facebook size={12} /></a>
                    <a href="#" className="hover:text-accent"><Instagram size={12} /></a>
                    <a href="#" className="hover:text-accent"><Twitter size={12} /></a>
                </div>
            </div>

            {/* Main Header */}
            <div className="glass-white/10 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Suka Print" className="h-12 w-auto object-contain" />
                    </Link>

                    {/* Search Bar - Hidden on mobile initially, visible on desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
                        <Input
                            type="text"
                            placeholder="Search for business cards, banners..."
                            className="w-full rounded-full pl-4 pr-10 border-primary-blue/20 bg-white/50 focus:bg-white transition-all"
                        />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent text-primary-blue">
                            <Search size={18} />
                        </Button>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:flex flex-col items-end text-xs text-gray-600 mr-2">
                            <span className="font-semibold text-primary-blue flex items-center gap-1"><Phone size={12} /> Support</span>
                            <span>+60 12-345 6789</span>
                        </div>

                        <Button variant="ghost" size="icon" className="relative">
                            <Heart size={20} className="text-gray-700" />
                        </Button>

                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart size={20} className="text-gray-700" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary-magenta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        <Button variant="ghost" size="icon">
                            <User size={20} className="text-gray-700" />
                        </Button>

                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mega Menu / Navigation - Desktop */}
            <nav className="hidden md:block bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-8">
                        {/* Categories Button */}
                        <div className="relative group z-20">
                            <button className="bg-primary-magenta text-white px-6 py-4 flex items-center gap-3 font-bold uppercase tracking-wide min-w-[260px]">
                                <Menu size={20} />
                                Shop By Categories
                            </button>
                            {/* Dropdown would go here, but avoiding complex mega menu code for now unless requested */}
                        </div>

                        {/* Nav Links */}
                        <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-700 flex-1">
                            <li className="hover:text-primary-blue cursor-pointer font-semibold">Home</li>
                            <li className="hover:text-primary-blue cursor-pointer">Products</li>
                            <li className="hover:text-primary-blue cursor-pointer">Services</li>
                            <li className="hover:text-primary-blue cursor-pointer">About Us</li>
                            <li className="hover:text-primary-blue cursor-pointer">Contact</li>
                        </ul>

                        <div className="text-sm font-bold text-primary-magenta">
                            Daily Deals
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-4 shadow-lg animate-in slide-in-from-top-5">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Search..." className="w-full" />
                        <Link to="/" className="py-2 border-b">Home</Link>
                        <Link to="/products" className="py-2 border-b">Shop All</Link>
                        <Link to="/contact" className="py-2">Contact</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
