import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, MessageCircle, Star, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ListingCard from '../components/products/ListingCard';
import ServiceIcons from '../components/home/ServiceIcons';
import SEO from '../components/utils/SEO';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p._id === id);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/products">
                    <Button>Back to Products</Button>
                </Link>
            </div>
        );
    }

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    const handleWhatsAppBuy = () => {
        const message = `Hello, I want to buy *${product.title}* x${quantity}.\nPrice: RM${(product.price * quantity).toFixed(2)}\nLink: ${window.location.href}`;
        window.open(`https://wa.me/601114141509?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <SEO
                title={product.title}
                description={product.description || `Buy ${product.title} at the best price.`}
                image={product.image}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white flex items-center justify-center p-4"
                >
                    <img src={product.image} alt={product.title} className="w-full max-h-[500px] object-contain" />
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <h4 className="text-primary-blue font-semibold mb-2 uppercase tracking-wide">Printing Service</h4>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
                        <div className="flex items-center gap-2 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            <span className="text-gray-400 text-sm ml-2">(128 reviews)</span>
                        </div>
                    </div>

                    {/* Price & Bulk Discount */}
                    <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary-magenta flex items-center gap-3">
                            RM{(product.price * (1 - (quantity >= 100 ? 0.15 : quantity >= 50 ? 0.10 : quantity >= 20 ? 0.05 : 0))).toFixed(2)}
                            {quantity >= 20 && (
                                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                    {quantity >= 100 ? '15%' : quantity >= 50 ? '10%' : '5%'} OFF
                                </span>
                            )}
                            <span className="text-sm text-gray-400 font-normal">/ unit</span>
                        </div>
                        {quantity >= 20 && (
                            <p className="text-sm text-gray-500 font-medium">
                                Total: <span className="text-gray-900 font-bold">RM{(product.price * quantity * (1 - (quantity >= 100 ? 0.15 : quantity >= 50 ? 0.10 : quantity >= 20 ? 0.05 : 0))).toFixed(2)}</span>
                            </p>
                        )}
                    </div>

                    {/* Bulk Tiers Info */}
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h5 className="text-sm font-bold text-blue-900 mb-2">Bulk Discounts Available:</h5>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className={`p-2 rounded-lg ${quantity >= 20 && quantity < 50 ? 'bg-blue-200 ring-1 ring-blue-400 font-bold' : 'bg-white'}`}>
                                <div className="font-bold text-blue-800">20+ Units</div>
                                <div className="text-green-600">5% OFF</div>
                            </div>
                            <div className={`p-2 rounded-lg ${quantity >= 50 && quantity < 100 ? 'bg-blue-200 ring-1 ring-blue-400 font-bold' : 'bg-white'}`}>
                                <div className="font-bold text-blue-800">50+ Units</div>
                                <div className="text-green-600">10% OFF</div>
                            </div>
                            <div className={`p-2 rounded-lg ${quantity >= 100 ? 'bg-blue-200 ring-1 ring-blue-400 font-bold' : 'bg-white'}`}>
                                <div className="font-bold text-blue-800">100+ Units</div>
                                <div className="text-green-600">15% OFF</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description || `Premium quality ${product.title.toLowerCase()} tailored to your specific needs. Order now for fast delivery and professional finish.`}
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                            <button onClick={() => handleQuantity('dec')} className="p-3 hover:bg-gray-100 border-r border-gray-200 transition-colors"><Minus size={16} /></button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val > 0) setQuantity(val);
                                    else if (e.target.value === '') setQuantity('');
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '' || parseInt(e.target.value) < 1) setQuantity(1);
                                }}
                                className="w-20 text-center font-bold border-none focus:ring-0 p-2 text-lg outline-none"
                                min="1"
                            />
                            <button onClick={() => handleQuantity('inc')} className="p-3 hover:bg-gray-100 border-l border-gray-200 transition-colors"><Plus size={16} /></button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button onClick={() => addToCart(product, quantity)} size="lg" className="flex-1 gap-2">
                            <ShoppingCart size={20} /> Add to Cart
                        </Button>
                        <Button onClick={handleWhatsAppBuy} size="lg" variant="outline" className="flex-1 gap-2 border-green-500 text-green-600 hover:bg-green-50">
                            <MessageCircle size={20} /> Buy via WhatsApp
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-blue">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-sm">24/7 Support</h5>
                                <p className="text-xs text-gray-500">Always here to help</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <Star size={20} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-sm">Quality Guarantee</h5>
                                <p className="text-xs text-gray-500">Premium materials only</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Related Products Section */}
            <div className="mt-24">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Related Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products
                        .filter(p => p.category === product.category && p._id !== product._id)
                        .slice(0, 4)
                        .map(related => (
                            <ListingCard key={related._id} product={related} />
                        ))}
                </div>
            </div>

            {/* Service Highlights */}
            <div className="mt-24 border-t border-gray-100 pt-12">
                <ServiceIcons />
            </div>
        </div>
    );
};

export default ProductDetail;
