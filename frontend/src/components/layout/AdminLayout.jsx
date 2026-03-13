"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  Tag,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  Globe,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    
    if (!token && !isLoginPage) {
      router.push("/admin/login");
    } else if (token && isLoginPage) {
       router.push("/admin/dashboard");
    }
    
    setIsLoading(false);
  }, [router, isLoginPage]);

  if (isLoading) {
    return null;
  }


  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">
            <span className="text-primary-blue">Suka</span>
            <span className="text-primary-magenta">Print</span>
          </h2>
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Package size={20} /> Products
          </Link>
          <Link
            href="/admin/marketing"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Tag size={20} /> Campaigns
          </Link>
          <Link
            href="/admin/invoices"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <ShoppingCart size={20} /> Invoices
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Users size={20} /> Customers
          </Link>
          <Link
            href="/admin/homepage"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Settings size={20} /> Homepage Config
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Globe size={20} /> Site Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 w-full rounded-lg transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto h-screen p-8">{children}</main>
    </div>
  );

};

export default AdminLayout;
