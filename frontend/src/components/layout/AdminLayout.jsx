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
  Menu,
  X,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    
    if (!token && !isLoginPage) {
      router.push("/admin/login");
    } else if (token && isLoginPage) {
       router.push("/admin/dashboard");
    }
    
    // Slight delay to ensure hydration is settled
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [router, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const navLinks = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/marketing", icon: Tag, label: "Campaigns" },
    { href: "/admin/invoices", icon: ShoppingCart, label: "Invoices" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/homepage", icon: Settings, label: "Homepage Config" },
    { href: "/admin/settings", icon: Globe, label: "Site Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Loading Overlay - Prevents hook count changes by staying in fixed overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Suka Print Admin</p>
        </div>
      )}

      {isLoginPage ? (
        <main className="flex-1 min-h-screen bg-gray-50">
          {children}
        </main>
      ) : (
        <>
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter">
                  <span className="text-primary-blue">SUKA</span>
                  <span className="text-primary-magenta">PRINT</span>
                </h2>
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">
                  Admin Panel
                </span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm
                      ${isActive 
                        ? "bg-primary-blue text-white shadow-lg shadow-blue-900/20" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"}
                    `}
                  >
                    <Icon size={18} /> {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-all font-bold text-sm"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </aside>

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            {/* Header / AdminNavbar */}
            <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-30">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                >
                  <Menu size={20} />
                </button>
                <div className="flex items-center gap-4 ml-auto">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:block">
                        Logged in as Administrator
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white font-black text-xs">
                        A
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;
