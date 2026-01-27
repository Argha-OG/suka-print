import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product._id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        // Optional: Add toast notification here
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div
            onClick={handleCardClick}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Sale Tag */}
                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        -{product.discount}%
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-bold text-gray-800 leading-tight line-clamp-1 mb-1 group-hover:text-primary-blue transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5em]">
                        {product.description || "High quality printing solution."}
                    </p>
                </div>

                <div className="mt-auto pt-4 space-y-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary-blue">RM{product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">RM{product.oldPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            className="w-full h-9 text-xs border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-colors"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            className="w-full h-9 text-xs bg-primary-blue hover:bg-primary-blue/90 text-white shadow-md hover:shadow-lg transition-all"
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
