import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Upload } from 'lucide-react';
import api from '../../lib/api';

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
        // fetchMarketing(); // Endpoint needs to be public or admin-specific
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

            await api.post('/marketing', {
                ...formData,
                imagePath: `http://localhost:5000${imagePath}`
            });
            alert('Marketing item added!');
            // fetchMarketing();
        } catch (error) {
            alert('Failed to add');
        }
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Marketing Management</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-4">Add New Banner/Slider</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded-md p-2">
                                <option value="slider">Hero Slider</option>
                                <option value="banner">Promotional Banner</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image</label>
                            <Input type="file" onChange={handleImageChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                        <Input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} />
                    </div>
                    <Input name="link" placeholder="Link URL" value={formData.link} onChange={handleChange} />
                    <Button type="submit">Add Content</Button>
                </form>
            </div>

            {/* List would go here */}
        </div>
    );
};

export default MarketingManager;
