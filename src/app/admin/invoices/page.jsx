"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Download, Eye, Search, FileText, X, Trash2, Edit } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingInvoice, setViewingInvoice] = useState(null);
    const invoiceRef = useRef();

    useEffect(() => {
        setMounted(true);
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const { data } = await api.get('/orders');
            setInvoices(data);
        } catch (error) {
            console.error("Failed to fetch invoices");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, orderNumber) => {
        const confirmMsg = `Are you sure you want to delete invoice ${orderNumber || id}?`;
        if (!window.confirm(confirmMsg)) return;
        
        try {
            console.log(`[DELETE] Starting deletion for ID: ${id}, Order: ${orderNumber}`);
            const response = await api.delete(`/orders/${id}`);
            console.log('[DELETE] Server Response:', response.data);
            
            // Use functional update to ensure we use the freshest state
            setInvoices(prevInvoices => prevInvoices.filter(inv => inv._id !== id));
            setViewingInvoice(null);
            
            alert('Invoice deleted successfully');
        } catch (error) {
            console.error('[DELETE] Error occurred:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
            alert(`Failed to delete invoice: ${errorMsg}`);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/orders/${id}`, { status: newStatus });
            setInvoices(invoices.map(inv => 
                inv._id === id ? { ...inv, status: newStatus } : inv
            ));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generatePDF = async (invoice) => {
        try {
            console.log("Generating PDF for:", invoice.orderNumber);
            const html2pdf = (await import('html2pdf.js')).default;
            const element = invoiceRef.current;
            if (!element) {
                console.error("Invoice element not found");
                return;
            }

            const fileName = `${invoice.orderNumber || 'invoice'}.pdf`;

            const opt = {
                margin: [10, 10],
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    letterRendering: true,
                    logging: false
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Use manual anchor method to force filename
            const blob = await html2pdf().from(element).set(opt).output('blob');
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            console.log("PDF download triggered manually with filename:", fileName);
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF: " + error.message);
        }
    };

    const handleDownloadPDF = async (invoice) => {
        setViewingInvoice(invoice);
        setTimeout(() => {
            generatePDF(invoice);
        }, 100);
    };

    if (!mounted || loading) return <div className="p-8 text-center text-gray-500 min-h-screen">Loading Invoices...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Invoicing System</h1>
                    <p className="text-gray-500 mt-1">Manage client invoices and professional billing.</p>
                </div>
                <Link href="/admin/invoices/new">
                    <Button className="bg-primary-blue hover:bg-blue-600 rounded-xl h-12 px-6 flex items-center gap-2 shadow-lg shadow-blue-100">
                        <Plus size={20} /> Create New Invoice
                    </Button>
                </Link>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Search size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search by invoice number or customer name..." 
                    className="w-full bg-white border border-gray-100 rounded-2xl h-14 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Inv No.</th>
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="p-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredInvoices.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-400 italic">No invoices found matching your search.</td>
                            </tr>
                        ) : (
                            filteredInvoices.map((inv) => (
                                <tr key={inv._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                <FileText size={18} />
                                            </div>
                                            <span className="font-bold text-gray-800">{inv.orderNumber}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800">{inv.customerName}</span>
                                            <span className="text-xs text-gray-400">{inv.customerEmail || 'No email'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 px-6 text-sm text-gray-600">
                                        {new Date(inv.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                    </td>
                                    <td className="p-4 px-6 text-sm font-black text-gray-900">
                                        RM{inv.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="p-4 px-6">
                                        <select
                                            value={inv.status}
                                            onChange={(e) => handleStatusUpdate(inv._id, e.target.value)}
                                            className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer border-none outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                                                inv.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                                                inv.status === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                                                inv.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                            }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 transition-all">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 rounded-lg text-gray-400 hover:text-primary-blue hover:bg-blue-50"
                                                onClick={() => setViewingInvoice(inv)}
                                            >
                                                <Eye size={18} />
                                            </Button>
                                            <Link href={`/admin/invoices/${inv._id}/edit`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 w-9 p-0 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                                >
                                                    <Edit size={18} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                                                onClick={() => handleDownloadPDF(inv)}
                                            >
                                                <Download size={18} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(inv._id, inv.orderNumber)}
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            {viewingInvoice && (
                <InvoiceModal
                    invoice={viewingInvoice}
                    invoiceRef={invoiceRef}
                    onClose={() => setViewingInvoice(null)}
                    onDownload={handleDownloadPDF}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

const InvoiceModal = ({ invoice, invoiceRef, onClose, onDownload, onDelete }) => {
    if (!invoice) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800">Invoice #{invoice.orderNumber}</h2>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => onDownload(invoice)}
                            className="flex items-center gap-2 bg-primary-blue hover:bg-blue-600"
                        >
                            <Download size={18} /> Download PDF
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onDelete(invoice._id, invoice.orderNumber)}
                            className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={18} /> Delete
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X size={24} />
                        </Button>
                    </div>
                </div>
                <div className="p-8">
                    <InvoiceTemplate invoice={invoice} invoiceRef={invoiceRef} />
                </div>
            </div>
        </div>
    );
};

const InvoiceTemplate = ({ invoice, invoiceRef }) => {
        const calculateSubtotal = (items) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculateTax = (subtotal, rate) => (subtotal * (rate || 0)) / 100;

    return (
        <div className="p-10 bg-white" ref={invoiceRef}>
            <div className="flex justify-between items-start mb-12">
                    <div className="flex flex-col items-center gap-1">
                        <img src="https://res.cloudinary.com/dteaoozsi/image/upload/v1781988539/sukaprint/suka_zaqezu.png" alt="Suka Print Logo" className="h-32 w-40 object-contain" />
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Creative Printing Solutions</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-black text-gray-200 uppercase tracking-tighter">INVOICE</h2>
                        <div className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">
                            <p>No: {invoice.orderNumber}</p>
                            <p>Date: {new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100 italic">
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest not-italic">Client Details</h3>
                        <div className="text-sm font-bold text-gray-800 tracking-tight">
                            <p className="text-base">{invoice.customerName}</p>
                            <p className="font-normal text-gray-500">{invoice.customerEmail}</p>
                            <p className="font-normal text-gray-500">{invoice.customerPhone}</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-right">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest not-italic">Payment Info</h3>
                        <div className="text-xs text-gray-500 font-bold tracking-tight">
                            <p>Bank: Maybank Berhad</p>
                            <p>Acc Name: Suka Print KL</p>
                            <p>Acc No: 1234 5678 9012</p>
                        </div>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-900">
                            <th className="text-left pb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Description</th>
                            <th className="text-right pb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                            <th className="text-center pb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Qty</th>
                            <th className="text-right pb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invoice.items.map((item, i) => (
                            <tr key={i}>
                                <td className="py-4 text-sm font-black text-gray-800 uppercase italic">{item.title}</td>
                                <td className="py-4 text-right text-sm font-bold text-gray-600">RM{item.price.toFixed(2)}</td>
                                <td className="py-4 text-center text-sm font-bold text-gray-600">{item.quantity}</td>
                                <td className="py-4 text-right text-sm font-black text-gray-900 tracking-tighter">RM{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pt-8 border-t-4 border-gray-900 flex justify-end">
                    <div className="text-right space-y-3 w-48 font-bold">
                        <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span className="text-gray-900">RM{calculateSubtotal(invoice.items).toFixed(2)}</span>
                        </div>
                                                <div className="flex justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span>TAX</span>
                                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold">{(invoice.taxAmount || 0)}%</span>
                                    </div>
                                    <span className="font-bold">RM{calculateTax(calculateSubtotal(invoice.items), invoice.taxAmount).toFixed(2)}</span>
                                </div>
                        <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                            <span>ADVANCE</span>
                            <span className="text-red-500">-RM{(invoice.advanceAmount || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-100 text-lg font-black text-gray-900 tracking-tighter">
                            <span>TOTAL</span>
                            <span>RM{invoice.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-12 text-center space-y-2 border-t border-dashed border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Thank you for your business!</p>
                    <p className="text-[10px] text-gray-400">Copyright © 2026 Suka Print KL. All rights reserved.</p>
                </div>
            </div>
        );
    };

export default InvoiceList;
