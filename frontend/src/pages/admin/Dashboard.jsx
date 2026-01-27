import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Package, Tag, Users } from 'lucide-react';
import api from '../../lib/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, offers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app we would have a specific stats endpoint
                const { data: products } = await api.get('/products');
                const { data: offers } = await api.get('/offers');
                setStats({ products: products.length, offers: offers.length });
            } catch (error) {
                console.error("Failed to fetch stats");
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-center gap-4 bg-white border-none shadow-md">
                    <div className="p-4 bg-blue-100 text-primary-blue rounded-full">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <h3 className="text-2xl font-bold">{stats.products}</h3>
                    </div>
                </Card>

                <Card className="flex items-center gap-4 bg-white border-none shadow-md">
                    <div className="p-4 bg-purple-100 text-primary-magenta rounded-full">
                        <Tag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Active Offers</p>
                        <h3 className="text-2xl font-bold">{stats.offers}</h3>
                    </div>
                </Card>

                <Card className="flex items-center gap-4 bg-white border-none shadow-md">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Admin Users</p>
                        <h3 className="text-2xl font-bold">1</h3>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
