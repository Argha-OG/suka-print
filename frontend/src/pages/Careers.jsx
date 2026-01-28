import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const Careers = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-primary-blue font-semibold tracking-wide uppercase text-sm mb-2 block">Join Our Team</span>
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Careers at Suka Print</h1>
                <p className="text-gray-600">We are always looking for talented individuals to join our growing family. Help us bring creativity to life.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-blue/30 transition-colors">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Graphic Designer</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mb-2">
                            <span>Full-Time</span>
                            <span>•</span>
                            <span>Kuala Lumpur (On-site)</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-md">Responsible for creating print-ready designs and assisting clients with their visual needs.</p>
                    </div>
                    <Button variant="outline" className="shrink-0 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                        Apply Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-blue/30 transition-colors">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Print Production Specialist</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mb-2">
                            <span>Full-Time</span>
                            <span>•</span>
                            <span>Kuala Lumpur (Factory)</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-md">Operate large format printers and ensure quality control for all outgoing orders.</p>
                    </div>
                    <Button variant="outline" className="shrink-0 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                        Apply Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-blue/30 transition-colors opacity-75">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Service Representative</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mb-2">
                            <span>Full-Time</span>
                            <span>•</span>
                            <span>Remote / Hybrid</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-md">Handle customer inquiries, order tracking support, and quote requests.</p>
                    </div>
                    <Button disabled variant="secondary" className="shrink-0">
                        Position Filled
                    </Button>
                </div>
            </div>

            <div className="mt-20 bg-primary-blue/5 rounded-3xl p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-blue mx-auto mb-6 shadow-sm">
                    <Briefcase size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h2>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">We are always open to meeting talented people. Send your resume to careers@sukaprint.com and tell us how you can make a difference.</p>
                <Button className="bg-primary-blue hover:bg-blue-600">Email Us Your Resume</Button>
            </div>
        </div>
    );
};

export default Careers;
