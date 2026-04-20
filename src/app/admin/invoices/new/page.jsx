"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Save,
  Download,
  Search,
  ChevronLeft,
} from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const NewInvoice = () => {
  const router = useRouter();
  const invoiceRef = useRef();

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [isSearching, setIsSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [taxRate, setTaxRate] = useState(0); // Percentage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products?limit=50");
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Real-time Status Logic
  useEffect(() => {
    const total = calculateTotal();
    if (total <= 0) {
      setStatus("Completed");
    } else if (advanceAmount > 0) {
      setStatus("Advanced");
    } else if (status !== "Cancelled") { // Don't revert Cancelled status automatically
      setStatus("Pending");
    }
  }, [advanceAmount, items, taxRate]);

  const addItem = (product) => {
    const existingItem = items.find((item) => item.product === product._id);
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          product: product._id,
          title: product.title,
          quantity: 1,
          price: product.price,
        },
      ]);
    }
    setSearchQuery("");
    setIsSearching(false);
  };
  const addManualItem = () => {
    setItems([
      ...items,
      {
        product: null,
        title: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === "title") {
      newItems[index][field] = value;
    } else {
      const numValue = parseFloat(value);
      newItems[index][field] = isNaN(numValue) ? 0 : numValue;
    }
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * (taxRate || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - (advanceAmount || 0);
  };

  const handleSave = async (downloadPDF = false) => {
    if (!customer.name || items.length === 0) {
      alert("Please provide customer name and at least one item.");
      return;
    }

    setSaving(true);
    try {
      // Automatic Status Logic
      let finalStatus = status;
      const total = calculateTotal();
      
      if (total <= 0) {
        finalStatus = "Completed";
      } else if (advanceAmount > 0) {
        finalStatus = "Advanced";
      }

      const orderData = {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        items,
        totalAmount: total,
        advanceAmount: advanceAmount || 0,
        taxAmount: taxRate || 0, // Store percentage in database
        status: finalStatus,
      };

      const { data } = await api.post("/orders", orderData);

      if (downloadPDF) {
        try {
          await generatePDF(data.orderNumber);
        } catch (pdfError) {
          console.error("PDF generation failed", pdfError);
          alert("Invoice saved, but PDF generation failed. You can try downloading it later.");
        }
      }

      alert("Invoice saved successfully!");
      router.push("/admin/invoices");
    } catch (error) {
      console.error("Failed to save invoice", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      alert(`Error saving invoice: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = async (orderNumber) => {
    try {
      const element = invoiceRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `${orderNumber || "invoice"}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
      throw error;
    }
  };

  const filteredProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "title-asc") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "title-desc") return (b.title || "").localeCompare(a.title || "");
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "category-asc") return (a.category || "").localeCompare(b.category || "");
      if (sortBy === "category-desc") return (b.category || "").localeCompare(a.category || "");
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ChevronLeft size={24} />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Create New Invoice
          </h1>
          <p className="text-gray-500">
            Generate a professional billing document for your client.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-100 outline-none focus:ring-2 focus:ring-primary-blue transition-all ${
                status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                status === 'Advanced' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Advanced">Advanced</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Invoice Editor */}
        <Card
          className="lg:col-span-2 p-8 border-none shadow-xl bg-white space-y-8 min-h-[800px] flex flex-col"
          ref={invoiceRef}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center gap-1">
              <img
                src="/assets/suka.png"
                alt="Suka Print Logo"
                className="h-32 w-40 object-contain"
              />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Creative Printing Solutions
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-gray-200 uppercase tracking-tighter">
                INVOICE
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Client Details
              </h3>
              <div className="space-y-3">
                <Input
                  placeholder="Customer Name"
                  className="border-none bg-gray-50 font-bold text-gray-800 placeholder:font-normal"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  autoComplete="off"
                />
                <Input
                  placeholder="Email Address"
                  className="border-none bg-gray-50 text-sm"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  autoComplete="off"
                />
                <Input
                  placeholder="Phone Number"
                  className="border-none bg-gray-50 text-sm"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-4 text-right">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Payment Info
              </h3>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Bank: Maybank Berhad</p>
                <p>Acc Name: Suka Print KL</p>
                <p>Acc No: 1234 5678 9012</p>
              </div>
            </div>
          </div>

          <div className="flex-1 mt-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Description
                  </th>
                  <th className="text-center pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest w-24">
                    Price
                  </th>
                  <th className="text-center pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest w-20">
                    Qty
                  </th>
                  <th className="text-right pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest w-24">
                    Total
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-20 text-center text-gray-300 italic"
                    >
                      No items added to this invoice.
                    </td>
                  </tr>
                ) : (
                  items.map((item, i) => (
                    <tr key={i} className="group border-b border-gray-50 last:border-none">
                      <td className="py-4 pr-4">
                        <textarea
                          rows="1"
                          className="w-full bg-gray-50/50 p-2 rounded-lg font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-blue resize-none"
                          value={item.title}
                          onChange={(e) =>
                            updateItem(i, "title", e.target.value)
                          }
                          placeholder="Item description..."
                        />
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-1 bg-gray-50/50 p-2 rounded-lg">
                          <span className="text-gray-400 text-xs font-bold">
                            RM
                          </span>
                          <input
                            type="number"
                            className="w-20 bg-transparent text-center font-bold text-gray-700 focus:outline-none"
                            value={item.price}
                            onChange={(e) =>
                              updateItem(i, "price", e.target.value)
                            }
                            onFocus={(e) => e.target.select()}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <input
                          type="number"
                          className="w-full bg-gray-50/50 p-2 rounded-lg text-center font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(i, "quantity", e.target.value)
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </td>
                      <td className="py-4 text-right font-black text-gray-900">
                        RM{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 text-right pl-4">
                        <button
                          onClick={() => removeItem(i)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-red-100"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button
              onClick={addManualItem}
              variant="ghost"
              className="mt-4 flex items-center gap-2 text-primary-blue hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold"
            >
              <Plus size={18} /> Add Description / Manual Item
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-100 flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold">
                  RM{calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <span>TAX</span>
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold">{taxRate}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                    <input
                      type="number"
                      className="w-12 bg-transparent text-right font-bold text-gray-700 focus:outline-none"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      onFocus={(e) => e.target.select()}
                    />
                    <span className="text-[10px] text-gray-400 font-bold">%</span>
                  </div>
                  <span className="font-bold text-gray-600 min-w-[60px] text-right">
                    RM{calculateTax().toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>ADVANCE</span>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">RM</span>
                  <input
                    type="number"
                    className="w-16 bg-transparent text-right font-bold text-gray-700 focus:outline-none"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-primary-blue text-xl font-black text-gray-900">
                <span>TOTAL</span>
                <span>RM{Math.max(0, calculateTotal()).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-12 text-center space-y-2 border-t border-dashed border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Thank you for your business!
            </p>
            <p className="text-[10px] text-gray-400">Copyright © 2026 Suka Print KL. All rights reserved.</p>
          </div>
        </Card>

        {/* Right Side: Product Picker & Summary */}
        <div className="space-y-6">
          <Card className="p-6 border-none shadow-lg bg-white space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Add Products</h3>
              <select
                className="text-xs font-bold border-none bg-gray-50 rounded-lg p-1 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title-asc">Name (A-Z)</option>
                <option value="title-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low-High)</option>
                <option value="price-desc">Price (High-Low)</option>
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
              </select>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
              />
              {isSearching && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-2xl mt-2 max-h-80 overflow-y-auto z-[100] border border-gray-100 p-2 space-y-1">
                  {filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm italic">
                      No products found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredProducts.map((p) => (
                      <div
                        key={p._id}
                        className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-all rounded-xl border border-transparent hover:border-blue-100"
                        onClick={() => addItem(p)}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-sm font-bold text-gray-800 truncate">
                            {p.title}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                            {p.category}
                          </p>
                        </div>
                        <span className="text-xs font-black text-primary-blue whitespace-nowrap">
                          RM{p.price.toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 border-none shadow-lg bg-white space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Actions</h3>
            <div className="space-y-3">
              <Button
                onClick={addManualItem}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gray-200 h-12 rounded-xl"
              >
                <Plus size={20} /> Add Manual Item
              </Button>
              <Button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black h-12 rounded-xl"
              >
                <Save size={20} /> Save Invoice
              </Button>

              <Button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-600 h-12 rounded-xl"
              >
                <Download size={20} /> Save & PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
