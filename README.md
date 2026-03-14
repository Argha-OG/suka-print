# Suka Print - Printing Management & CMS

A comprehensive printing business management system featuring automated invoicing, professional PDF generation, dashboard analytics, and a dynamic Homepage CMS.

## 🔗 Live Admin Panel
**Link:** [https://www.sukaprint.com/admin](https://www.sukaprint.com/admin)

---

## 🚀 Key Functions & Features

### 1. **Professional Invoicing System**
*   **Automatic Generation**: Generates unique invoice numbers (SUKA-YYYYMMDD-XXXX).
*   **PDF Export**: Professional PDF generation with company branding, tax calculations, and bank details.
*   **Product Selection**: Search and select products from a live catalog with real-time total updates.
*   **Status Management**: Track invoices through Pending, Advanced, Completed, and Cancelled stages.

### 2. **Homepage CMS (Content Management System)**
*   **Hero Slider**: Dynamic carousel management with support for image uploads and external URLs.
*   **Video Showcase**: Manage the "How It Works" section with support for YouTube embeds and direct video files.
*   **Popular Categories**: Curate category highlights with custom images and links.
*   **Custom Print Services**: Dedicated section for custom service promotions.
*   **Testimonials**: Manage client feedback with rating and avatar support.

### 3. **Universal Media Support (New)**
*   **Dual-Input System**: Every media field (Images & Videos) supports both local file uploads and external web links.
*   **Smart Video Rendering**: Automatically detects and switches between iframe (YouTube/Vimeo) and HTML5 video players based on the link provided.

### 4. **Dashboard & Analytics**
*   **KPI Tracking**: Real-time stats for Total Revenue, Total Orders, and Product Count.
*   **Visual Reports**: Interactive charts showing 7-day revenue trends and category-wise sales distribution.
*   **Recent Activity**: Real-time ticker of latest invoices and customer interactions.

### 5. **Product & Marketing Management**
*   **Catalog Management**: Add, edit, and delete products with stock tracking and category assignments.
*   **Campaign Banners**: Manage marketing banners with scheduled promotion support.

### 6. **Customer Management**
*   **CRM Lite**: View unique customers, their total spend, and order frequency.
*   **Contact Management**: Maintain up-to-date contact details for recurring clients.

---

## 🛠 Technical Architecture

### Tech Stack
*   **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide React, Recharts.
*   **Backend**: Node.js, Express.js (High-performance API).
*   **Database**: MongoDB Atlas (Cloud-native NoSQL).
*   **State Management**: React Hooks & Context.
*   **Auth**: JSON Web Tokens (JWT) with secure middleware.

### Service Modules
*   **`backend/server.js`**: Core API server with database resilience logic.
*   **`backend/controllers/`**: Business logic for Invoices, Products, and CMS.
*   **`frontend/src/lib/api.js`**: Centralized API communication with Bearer token support.

---

## 📁 Project Structure
```text
├── backend/            # API Server & Database Models
│   ├── controllers/    # Route Handlers
│   ├── models/         # Mongoose Schemas
│   └── routes/         # API Endpoints
├── frontend/           # Next.js Web Application
│   ├── src/app/        # Pages & Routing
│   ├── src/components/ # Modular UI Components
│   └── src/lib/        # API & Utility functions
└── README.md           # This documentation
```

---

## 📄 Development Guides
*   [Implementation Summary](file:///d:/Website/suka-print/IMPLEMENTATION_SUMMARY.md)
*   [Quick Start Guide](file:///d:/Website/suka-print/QUICK_START.md)
*   [Testing Guide](file:///d:/Website/suka-print/TESTING_GUIDE.md)
