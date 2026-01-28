import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ListingCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product._id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addToCart(product);
        navigate('/cart');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCardClick}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-4 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 bg-black/5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 border border-white/20">
                    {product.category}
                </span>
            </div>

            {/* Discount Badge */}
            {product.discount > 0 && (
                <div className="absolute top-6 right-6 z-10">
                    <span className="px-3 py-1 bg-primary-magenta text-white rounded-full text-[10px] font-bold shadow-lg shadow-primary-magenta/30 animate-pulse">
                        -{product.discount}%
                    </span>
                </div>
            )}

            {/* Image Container with organic shape effect */}
            <div className="relative aspect-square mb-6 rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-gray-100 to-white shadow-inner">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Min Order Badge */}
                {product.description?.includes('Min Order') && (
                    <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-primary-magenta border border-magenta-100 shadow-sm flex items-center gap-1">
                            {product.description.match(/Min Order:\s*\d+\s*[a-zA-Z]+/i)?.[0] || 'MOQ Applies'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-2">
                <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">(4.9)</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-primary-blue transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-light leading-relaxed">
                    {product.description || "Premium quality tailored to your needs."}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100/50 flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-medium">Price</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-extrabold text-primary-blue">
                                    RM{product.price.toFixed(2)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through decoration-red-400">
                                        RM{product.oldPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto] gap-3">
                        <Button
                            onClick={handleBuyNow}
                            className="bg-gray-900 text-white hover:bg-black rounded-xl h-12 font-semibold shadow-lg shadow-gray-200"
                        >
                            Buy Now
                        </Button>
                        <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            className="aspect-square h-12 rounded-xl border-gray-200 hover:border-primary-blue hover:text-primary-blue hover:bg-primary-blue/5"
                        >
                            <ShoppingBag size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ListingCard;
