import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ArrowLeft, Upload } from 'lucide-react';
import api from '../../lib/api';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setFormData({
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
                image: data.imagePath
            });
            setPreview(data.imagePath);
        } catch (error) {
            console.error("Failed to fetch product");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imagePath = formData.image;

            // Upload image if it's a file object (new upload)
            if (formData.image instanceof File) {
                const uploadData = new FormData();
                uploadData.append('image', formData.image);
                const { data } = await api.post('/upload', uploadData);
                imagePath = `http://localhost:5000${data}`; // Assuming local dev
            }

            const productData = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                stock: Number(formData.stock),
                imagePath: imagePath
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, productData);
            } else {
                await api.post('/products', productData);
            }

            navigate('/admin/products');
        } catch (error) {
            console.error("Failed to save product", error);
            alert("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" onClick={() => navigate('/admin/products')}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-3xl font-bold text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm space-y-6">

                {/* Image Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:bg-gray-50 transition-colors relative">
                    <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    {preview ? (
                        <img src={preview} alt="Preview" className="h-48 object-contain" />
                    ) : (
                        <div className="text-center text-gray-500">
                            <Upload size={32} className="mx-auto mb-2" />
                            <p>Click to upload image</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Business Cards">Business Cards</option>
                            <option value="Banners">Banners</option>
                            <option value="Stickers">Stickers</option>
                            <option value="Flyers">Flyers</option>
                            <option value="Documents">Documents</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-blue focus:outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (RM)</label>
                        <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <Input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-primary-blue hover:bg-blue-600">
                        {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
