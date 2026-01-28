import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Phone, MapPin, Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/suka.png';
import { products } from '../../data/products';
import shirtCatalog from '../../assets/Shirt-catalogue.pdf';
import secondCatalog from '../../assets/second-catalog.pdf';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const filtered = products.filter(product => {
            const lowerQuery = query.toLowerCase();
            const matchTitle = product.title.toLowerCase().includes(lowerQuery);
            const matchCategory = product.category.toLowerCase().includes(lowerQuery);
            const matchKeywords = product.keywords && product.keywords.some(k => k.toLowerCase().includes(lowerQuery));
            return matchTitle || matchCategory || matchKeywords;
        });

        setSearchResults(filtered);
        setShowResults(true);
    };

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
        setSearchQuery('');
        setShowResults(false);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowResults(false);
        }
    };

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
            <div className="bg-white backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 md:px-8 py-0.5 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Suka Print" className="h-[68px] w-auto object-contain" />
                    </Link>

                    {/* Search Bar - Hidden on mobile initially, visible on desktop */}
                    {/* Search Bar - Hidden on mobile initially, visible on desktop */}
                    {/* Search Bar - Hidden on mobile initially, visible on desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchRef}>
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search for business cards, banners..."
                                className="w-full rounded-full pl-4 pr-10 border-primary-blue/20 bg-white/50 focus:bg-white transition-all"
                                value={searchQuery}
                                onChange={handleSearch}
                                onFocus={() => searchQuery && setShowResults(true)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent text-primary-blue"
                                onClick={handleSearchSubmit}
                            >
                                <Search size={18} />
                            </Button>
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 max-h-96 overflow-y-auto z-[100]">
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map(product => (
                                            <li
                                                key={product._id}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none"
                                                onClick={() => handleProductClick(product._id)}
                                            >
                                                <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-md bg-gray-100" />
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-800">{product.title}</div>
                                                    <div className="text-xs text-gray-500">{product.category}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">
                                        No products found for "{searchQuery}". <br />
                                        <span className="text-xs">Try keywords like "card", "banner", "flyer"</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:flex flex-col items-end text-xs text-gray-600 mr-2">
                            <span className="font-semibold text-primary-blue flex items-center gap-1"><Phone size={12} /> Support</span>
                            <span>+60 11-1414 1509</span>
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
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}\
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mega Menu / Navigation - Desktop */}
            <nav className="hidden md:block bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-8">
                        {/* Nav Links */}
                        <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-700 flex-1">
                            <li><Link to="/" className="hover:text-primary-blue cursor-pointer font-semibold">Home</Link></li>
                            <li><Link to="/products" className="hover:text-primary-blue cursor-pointer">Products</Link></li>
                            <li className="relative group">
                                <button className="flex items-center gap-1 hover:text-primary-blue cursor-pointer bg-transparent border-none p-0 font-medium text-gray-700">
                                    Catalogs <ChevronDown size={14} />
                                </button>
                                <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 transform translate-y-2 group-hover:translate-y-0">
                                    <a href={shirtCatalog} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary-blue text-sm">Shirt Catalogue</a>
                                    <a href={secondCatalog} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary-blue text-sm">Gift Catalogue</a>
                                </div>
                            </li>
                            <li><Link to="/services" className="hover:text-primary-blue cursor-pointer">Services</Link></li>
                            <li><Link to="/about" className="hover:text-primary-blue cursor-pointer">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-blue cursor-pointer">Contact</Link></li>
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
