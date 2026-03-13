"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import api from '@/lib/api';

const MarketingManager = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        type: 'slider',
        title: '',
        subtitle: '',
        link: '',
        image: null
    });

    useEffect(() => {
        // fetchMarketing();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadData = new FormData();
            uploadData.append('image', formData.image);
            const { data: imagePath } = await api.post('/upload', uploadData);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            await api.post('/marketing', {
                ...formData,
                imagePath: `${apiUrl}${imagePath}`
            });
            alert('Marketing item added!');
            // fetchMarketing();
        } catch (error) {
            alert('Failed to add');
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Campaign Banners</h1>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Upload className="text-primary-blue" size={20} /> Add New Banner/Slider
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Content Placement</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 font-bold text-gray-800 outline-none focus:ring-2 focus:ring-primary-blue">
                                <option value="slider">Main Hero Slider</option>
                                <option value="banner">Promotional Banner</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Upload Asset</label>
                            <Input type="file" onChange={handleImageChange} required className="h-12 bg-gray-50 border-none rounded-xl" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Display Title</label>
                            <Input 
                                name="title" 
                                placeholder="e.g. Anniversary Sale" 
                                value={formData.title} 
                                onChange={handleChange} 
                                onFocus={(e) => e.target.select()}
                                autoComplete="off"
                                className="h-12 bg-gray-50 border-none rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Subtitle / Callout</label>
                            <Input 
                                name="subtitle" 
                                placeholder="e.g. Up to 50% OFF" 
                                value={formData.subtitle} 
                                onChange={handleChange} 
                                onFocus={(e) => e.target.select()}
                                autoComplete="off"
                                className="h-12 bg-gray-50 border-none rounded-xl"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Target URL / Route</label>
                        <Input 
                            name="link" 
                            placeholder="e.g. /products/stickers" 
                            value={formData.link} 
                            onChange={handleChange} 
                            onFocus={(e) => e.target.select()}
                            autoComplete="off"
                            className="h-12 bg-gray-50 border-none rounded-xl"
                        />
                    </div>
                    <Button type="submit" className="h-12 px-8 bg-primary-blue hover:bg-blue-600 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all">
                        Publish Campaign Item
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MarketingManager;
