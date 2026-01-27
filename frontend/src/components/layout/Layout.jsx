import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-x-hidden">
            {/* Global Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-blue/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-magenta/5 rounded-full blur-[150px]"></div>
            </div>

            <Navbar />

            <main className="flex-1 w-full pt-[140px] md:pt-[160px] relative z-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
