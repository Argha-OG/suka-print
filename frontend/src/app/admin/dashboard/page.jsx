"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Package,
  TrendingUp,
  ShoppingCart,
  Users,
  ArrowUpRight,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "@/lib/api";

const Dashboard = () => {
  const [data, setData] = useState({
    stats: { totalRevenue: 0, totalOrders: 0, totalProducts: 0 },
    salesTrend: [],
    categories: [],
  });
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, invoicesRes] = await Promise.all([
          api.get("/orders/stats"),
          api.get("/orders"),
        ]);
        setData(statsRes.data);
        // Get the 5 most recent invoices
        const recent = invoicesRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentInvoices(recent);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <Calendar size={18} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `RM${data.stats.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "+12.5%",
          },
          {
            title: "Total Orders",
            value: data.stats.totalOrders,
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "+5.2%",
          },
          {
            title: "Total Products",
            value: data.stats.totalProducts,
            icon: Package,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            trend: "0%",
          },
          {
            title: "New Customers",
            value: "12",
            icon: Users,
            color: "text-orange-600",
            bg: "bg-orange-50",
            trend: "+18%",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} className="mr-1" /> {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Revenue Overview
            </h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg p-1 px-2 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesTrend}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="_id"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 border-none shadow-sm bg-white">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Sales by Category
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {data.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.categories.map((cat, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></div>
                  <span className="text-gray-600">{cat._id}</span>
                </div>
                <span className="font-bold text-gray-800">{cat.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sub-sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <Card className="p-6 border-none shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Invoices</h3>
            <ArrowUpRight
              size={18}
              className="text-gray-400 cursor-pointer hover:text-primary-blue"
            />
          </div>
          <div className="space-y-3">
            {recentInvoices.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No invoices found.</p>
            ) : (
              recentInvoices.map((invoice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">
                      {invoice.orderNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      {invoice.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900">
                      RM{invoice.totalAmount.toFixed(2)}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        invoice.status === "Completed"
                          ? "text-emerald-600"
                          : invoice.status === "Cancelled"
                            ? "text-red-600"
                            : "text-orange-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Top Products Placeholder */}
        <Card className="p-6 border-none shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Top Products</h3>
            <TrendingUp size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic">
              Data will appear here once orders are processed.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
