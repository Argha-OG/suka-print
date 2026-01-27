import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../../lib/api';
import { Link, useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch {
                alert('Failed to delete');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Link to="/admin/products/add">
                    <Button className="gap-2"><Plus size={18} /> Add Product</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                                        <img src={product.imagePath || 'placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{product.title}</td>
                                <td className="p-4 text-gray-500">{product.category}</td>
                                <td className="p-4 font-bold">RM{product.price}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/admin/products/${product._id}/edit`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No products found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
