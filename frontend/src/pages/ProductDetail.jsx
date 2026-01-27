import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, MessageCircle, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

// Mock Data (Ideally fetched by ID)
const PRODUCT_DB = {
    '1': { _id: '1', title: 'Matte Business Card', description: 'Premium matte finish business cards on 310gsm art card. Ideal for minimalist designs.', price: 45.00, images: ['https://images.unsplash.com/photo-1617726487103-6058d927dcc3?auto=format&fit=crop&q=80&w=800'] },
    '2': { _id: '2', title: 'Vinyl Banner 8x4', description: 'High durability vinyl banner suitable for outdoor usage. Grommets included.', price: 120.00, images: ['https://images.unsplash.com/photo-1630328905030-802525cdad66?auto=format&fit=crop&q=80&w=800'] },
};

const ProductDetail = () => {
    const { id } = useParams();
    const product = PRODUCT_DB[id] || PRODUCT_DB['1']; // Fallback for demo
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    const handleWhatsAppBuy = () => {
        const message = `Hello, I want to buy *${product.title}* x${quantity}.\nPrice: RM${(product.price * quantity).toFixed(2)}\nLink: ${window.location.href}`;
        window.open(`https://wa.me/60123456789?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                >
                    <img src={product.images[0]} alt={product.title} className="w-full h-auto object-cover" />
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

                    <div className="text-3xl font-bold text-primary-magenta">
                        RM{product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg">
                            <button onClick={() => handleQuantity('dec')} className="p-3 hover:bg-gray-100"><Minus size={16} /></button>
                            <span className="w-12 text-center font-bold">{quantity}</span>
                            <button onClick={() => handleQuantity('inc')} className="p-3 hover:bg-gray-100"><Plus size={16} /></button>
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
        </div>
    );
};

export default ProductDetail;
