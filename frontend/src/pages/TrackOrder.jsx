import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { PackageSearch } from 'lucide-react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        // Mock tracking logic
        if (orderId.trim()) {
            setStatus({
                message: `Searching for order #${orderId}...`,
                type: 'info'
            });
            setTimeout(() => {
                setStatus({
                    message: `Order #${orderId} is currently PREPARING for shipment.`,
                    type: 'success'
                });
            }, 1000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="max-w-xl mx-auto text-center">
                <div className="w-20 h-20 bg-primary-magenta/10 rounded-full flex items-center justify-center text-primary-magenta mx-auto mb-6">
                    <PackageSearch size={40} />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Track Your Order</h1>
                <p className="text-gray-600 mb-8">Enter your Order ID to see the current status of your shipment.</p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <Input
                                placeholder="Order ID (e.g., SP-123456)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="h-12 text-lg text-center"
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold bg-primary-blue hover:bg-blue-600">
                            Track Order
                        </Button>
                    </form>

                    {status && (
                        <div className={`mt-6 p-4 rounded-lg bg-blue-50 text-blue-800 border border-blue-100`}>
                            {status.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
