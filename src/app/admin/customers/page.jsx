"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Save, X, Mail, Phone, Package } from "lucide-react";
import api from "@/lib/api";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/orders");
      // Group orders by customer to get unique customers with their order history
      const customerMap = {};
      data.forEach((order) => {
        if (!customerMap[order.customerName]) {
          customerMap[order.customerName] = {
            name: order.customerName,
            email: order.customerEmail,
            phone: order.customerPhone,
            totalOrders: 0,
            totalSpent: 0,
            orders: [],
          };
        }
        customerMap[order.customerName].totalOrders++;
        customerMap[order.customerName].totalSpent += order.totalAmount;
        customerMap[order.customerName].orders.push(order);
      });
      setCustomers(Object.values(customerMap));
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cust.email &&
        cust.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cust.phone &&
        cust.phone.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleEditClick = (customer) => {
    setEditingCustomer(customer.name);
    setEditForm({
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/orders/customer/${editingCustomer}`, {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
      });
      setCustomers(
        customers.map((c) =>
          c.name === editingCustomer
            ? {
                ...c,
                name: editForm.name,
                email: editForm.email,
                phone: editForm.phone,
              }
            : c,
        ),
      );
      setEditingCustomer(null);
      alert("Customer information updated across all orders!");
    } catch (error) {
      console.error("Failed to update customer:", error);
      alert("Failed to update customer.");
    }
  };

  const handleDelete = async (customerName) => {
    if (
      !confirm(
        `Are you sure you want to delete ${customerName}? This will delete all their associated invoices/orders!`,
      )
    )
      return;
    try {
      await api.delete(`/orders/customer/${customerName}`);
      setCustomers(customers.filter((c) => c.name !== customerName));
      alert("Customer and all associated orders deleted.");
    } catch (error) {
      console.error("Failed to delete customer:", error);
      alert("Failed to delete customer.");
    }
  };


  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading Customers...</div>
    );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage all your customers.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="w-full bg-white border border-gray-100 rounded-2xl h-14 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Customer Name
                </th>
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Email
                </th>
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Phone
                </th>
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Orders
                </th>
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Total Spent
                </th>
                <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-12 text-center text-gray-400 italic"
                  >
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, idx) =>
                  editingCustomer === customer.name ? (
                    <tr key={idx} className="bg-blue-50 group">
                      <td className="p-4 px-6">
                        <Input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="border-gray-300"
                        />
                      </td>
                      <td className="p-4 px-6">
                        <Input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="border-gray-300"
                        />
                      </td>
                      <td className="p-4 px-6">
                        <Input
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({ ...editForm, phone: e.target.value })
                          }
                          className="border-gray-300"
                        />
                      </td>
                      <td colSpan="2" className="p-4 px-6"></td>
                      <td className="p-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                          >
                            <Save size={16} /> Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-lg text-red-500 hover:bg-red-50"
                            onClick={() => setEditingCustomer(null)}
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                          </div>
                          <span className="font-bold text-gray-800">
                            {customer.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                          {customer.email || "—"}
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          {customer.phone || "—"}
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-blue-500" />
                          <span className="font-bold text-gray-800">
                            {customer.totalOrders}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6 text-sm font-black text-gray-900">
                        RM{customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="p-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-lg text-gray-400 hover:text-primary-blue hover:bg-blue-50"
                            onClick={() => handleEditClick(customer)}
                          >
                            <Edit size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => handleDelete(customer.name)}
                          >
                            <Trash2 size={18} />
                          </Button>

                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CustomerManagement;
