import React from 'react';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

const ReturnsRefunds = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Returns & Refunds Policy</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary-blue/10 rounded-full text-primary-blue mt-1">
                            <RotateCcw size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">30-Day Return Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We want you to be completely satisfied with your purchase. If you are not happy with your order, you may request a return or reprint within 30 days of receiving your items.
                            </p>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-100" />

                    <h3 className="text-lg font-bold mb-4">Eligibility for Returns</h3>
                    <ul className="space-y-3 text-gray-600 mb-8">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            <span>Print errors or defects caused by Suka Print.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            <span>Damaged items upon arrival.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            <span>Incorrect quantity or product specifications delivered.</span>
                        </li>
                    </ul>

                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
                        <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                        <p>
                            Please note that we cannot accept returns for errors in your original file submission (e.g., spelling mistakes, low-resolution images, incorrect layout) or color variations due to screen differences.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 mb-4">Need to start a return?</p>
                    <a href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-primary-blue px-8 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ReturnsRefunds;
