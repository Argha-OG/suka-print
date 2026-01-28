import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const HelpCenter = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Help Center</h1>
                <p className="text-center text-gray-600 mb-12">Frequently asked questions and support resources.</p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                            <AccordionContent>
                                Standard shipping typically takes 3-5 business days within Peninsular Malaysia and 5-7 business days to East Malaysia. International shipping times vary by location.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What file formats do you accept?</AccordionTrigger>
                            <AccordionContent>
                                We accept PDF, AI, PSD, JPEG, and PNG files. For best results, please ensure your files are in CMYK color mode and have a resolution of at least 300dpi.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I cancel or change my order?</AccordionTrigger>
                            <AccordionContent>
                                Since we start processing orders immediately, we can only accept cancellations or changes within 1 hour of order placement. Please contact our support team immediately.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Do you offer design services?</AccordionTrigger>
                            <AccordionContent>
                                Yes! We have a team of professional designers who can help create custom designs for your business cards, banners, and marketing materials. Contact us for a quote.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>How can I track my order?</AccordionTrigger>
                            <AccordionContent>
                                Once your order is shipped, you will receive a tracking number via email. You can also track your order status on our "Track Order" page using your Order ID.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
