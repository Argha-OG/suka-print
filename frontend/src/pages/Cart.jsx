import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = `*New Order Request*\n\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.title} (x${item.quantity}) - RM${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n*Total: RM${cartTotal.toFixed(2)}*\n\nPlease confirm my order.`;

        window.open(`https://wa.me/60123456789?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <ShoppingCart size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't made your choice yet.</p>
                <Link to="/products">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <motion.div
                            key={item._id}
                            layout
                            className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 items-center"
                        >
                            <img src={item.images ? item.images[0] : item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />

                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-500 text-sm block md:hidden">RM{item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:block font-medium">RM{item.price.toFixed(2)}</div>
                                <div className="flex items-center border rounded-md">
                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                                </div>
                                <div className="font-bold w-20 text-right">RM{(item.price * item.quantity).toFixed(2)}</div>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary */}
                <div className="w-full lg:w-96">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-xl mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>RM{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Calculated via WhatsApp</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total Estimate</span>
                                <span>RM{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button onClick={handleCheckout} className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 gap-2">
                            <MessageCircle /> Checkout via WhatsApp
                        </Button>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            You will be redirected to WhatsApp to send your order details directly to our admin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
