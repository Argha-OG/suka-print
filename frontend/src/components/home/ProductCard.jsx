import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Image & Actions */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Sale Tag */}
                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-primary-magenta text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                        -{product.discount}%
                    </span>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="icon" className="bg-white text-gray-800 hover:bg-primary-blue hover:text-white rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <ShoppingCart size={18} />
                    </Button>
                    <Button size="icon" className="bg-white text-gray-800 hover:bg-primary-magenta hover:text-white rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        <Heart size={18} />
                    </Button>
                    <Link to={`/products/${product._id}`}>
                        <Button size="icon" className="bg-white text-gray-800 hover:bg-accent hover:text-white rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                            <Eye size={18} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-gray-800 mb-2 truncate group-hover:text-primary-blue transition-colors">{product.title}</h3>
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-primary-blue">RM{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">RM{product.oldPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
