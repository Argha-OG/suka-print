import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SEO from '../components/utils/SEO';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <SEO
                title="Contact Us"
                description="Get in touch with SukaPrint for custom quotes, inquiries, or support. Visit us in Kuala Lumpur or contact via phone/email."
            />
            <h1 className="text-4xl font-bold text-center mb-16">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-gray-600 mb-8">
                        Have a question or need a custom quote? Fill out the form or reach out to us directly via phone or email. We are here to help!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-blue shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Address</h3>
                                <p className="text-gray-600">G-20-1 Jalan Dedap 14, Johor Jaya, 81100 Johor Bahru, Malaysia</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-blue shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Phone</h3>
                                <p className="text-gray-600">+60 11-1414 1509</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-blue shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <p className="text-gray-600">hello@sukaprint.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary-blue shrink-0">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Working Hours</h3>
                                <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Send Message</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="First Name" />
                            <Input placeholder="Last Name" />
                        </div>
                        <Input type="email" placeholder="Email Address" />
                        <Input placeholder="Subject" />
                        <textarea
                            className="w-full min-h-[150px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                            placeholder="Your Message..."
                        ></textarea>
                        <Button className="w-full bg-primary-magenta hover:bg-magenta-600 text-white font-bold h-12 rounded-lg">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>

            {/* Google Map */}
            <div className="mt-20 rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[400px]">
                <iframe
                    title="Suka Print Location"
                    className="w-full h-full border-0"
                    src="https://maps.google.com/maps?q=G-20-1%20Jalan%20Dedap%2014%2C%20johor%20jaya%2C%2081100%20Johor%20Bahru%2C%20Malaysia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
