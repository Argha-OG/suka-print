import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
// Admin Layout is small enough to keep, or lazy load too if desired.
import AdminLayout from './components/layout/AdminLayout';
import { CartProvider } from './context/CartContext';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const MarketingManager = lazy(() => import('./pages/admin/MarketingManager'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const ReturnsRefunds = lazy(() => import('./pages/ReturnsRefunds'));
const ShippingInfo = lazy(() => import('./pages/ShippingInfo'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import ScrollToTop from './components/utils/ScrollToTop';

import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/category/:category" element={<ProductListing />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/add" element={<ProductForm />} />
                <Route path="products/:id/edit" element={<ProductForm />} />
                <Route path="marketing" element={<MarketingManager />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
