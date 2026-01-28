import React from 'react';
import { Truck, Globe, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';

const ShippingInfo = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Shipping Information</h1>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary-blue mb-4">
                            <Truck size={24} />
                        </div>
                        <h3 className="font-bold mb-2">Local Delivery</h3>
                        <p className="text-sm text-gray-600">Free shipping within Kuala Lumpur for orders over RM100.</p>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                            <Globe size={24} />
                        </div>
                        <h3 className="font-bold mb-2">Nationwide Shipping</h3>
                        <p className="text-sm text-gray-600">Reliable delivery to all states in Malaysia, including Sabah & Sarawak.</p>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-bold mb-2">Fast Turnaround</h3>
                        <p className="text-sm text-gray-600">Most standard orders are processed and shipped within 3-5 business days.</p>
                    </Card>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-800">
                        Shipping Rates & Estimates
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-3">Destination</th>
                                        <th className="px-6 py-3">Estimated Time</th>
                                        <th className="px-6 py-3">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">Kuala Lumpur / Selangor</td>
                                        <td className="px-6 py-4">1-3 Business Days</td>
                                        <td className="px-6 py-4">RM 10.00 (Free &gt; RM100)</td>
                                    </tr>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">Peninsular Malaysia</td>
                                        <td className="px-6 py-4">3-5 Business Days</td>
                                        <td className="px-6 py-4">RM 15.00</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">Sabah & Sarawak</td>
                                        <td className="px-6 py-4">5-7 Business Days</td>
                                        <td className="px-6 py-4">RM 25.00 - RM 50.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
