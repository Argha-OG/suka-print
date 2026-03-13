# Suka Print Admin System - Testing Guide

## Admin Credentials

- **Username:** admin
- **Password:** password123

## Features Implemented

### 1. Admin Dashboard with Charts and Graphs

**Location:** `/admin/dashboard`

**Features:**

- Top Statistics Cards:
  - Total Revenue (in RM)
  - Total Orders
  - Total Products
  - New Customers
- Revenue Overview Chart (Area Chart showing last 7 days)
- Sales by Category (Pie Chart)
- Recent Invoices Section (showing 5 most recent invoices)

**How to Test:**

1. Login with admin credentials
2. Navigate to Dashboard
3. Verify stats cards are displaying correct data
4. Verify Revenue Overview chart shows sales trend
5. Verify Category Breakdown pie chart displays product categories
6. Verify Recent Invoices section shows latest invoices

### 2. Homepage Content Management System (CMS)

**Location:** `/admin/homepage`

**Features:**

- **Hero Carousel:**
  - Add/Edit/Remove carousel slides
  - Configure slide image, title, subtitle, button text, and link
- **Video Process Section:**
  - Configure YouTube video embed link
  - Edit section title and description
- **Featured Products:**
  - Select and manage featured products to display on homepage
  - Checkbox selection interface

**How to Test:**

1. Navigate to `/admin/homepage`
2. Add a new hero slide:
   - Click "Add Slide"
   - Fill in image URL, title, subtitle, button text, and link
   - Click Save Changes
3. Configure video process:
   - Add YouTube embed URL
   - Edit section title and description
   - Save changes
4. Select featured products:
   - Check/uncheck products to feature them
   - Save changes
5. Verify changes are saved and reflected on public homepage

### 3. Customer Management System

**Location:** `/admin/customers`

**Features:**

- View all customers with their information
- Search customers by name, email, or phone
- View customer statistics:
  - Total orders count
  - Total amount spent
- Edit customer information (name, email, phone)
- Customer order history reference

**How to Test:**

1. Navigate to `/admin/customers`
2. View the customer list
3. Search for a customer by name, email, or phone
4. Click Edit button on any customer
5. Modify customer information (name, email, phone)
6. Click Save to update customer info
7. Verify customer details and statistics display correctly

### 4. Invoice Management System (Professional Invoicing)

**Location:** `/admin/invoices`

**Features:**

- **Invoice List:**
  - View all invoices with customer information
  - Search invoices by invoice number or customer name
  - View invoice status (Pending, Completed, Cancelled)
  - Download invoice as PDF
  - View detailed invoice preview
- **Create New Invoice:**
  - Search and add products from catalog
  - Edit product quantity and price per item
  - Add customer details (name, email, phone)
  - Professional invoice template with:
    - Company logo (Suka Print)
    - Invoice number and date
    - Client details section
    - Payment information
    - Itemized list of products
    - Total amount calculation
  - Save invoice to database
  - Download as PDF directly

**How to Test - Create Invoice:**

1. Navigate to `/admin/invoices`
2. Click "Create New Invoice"
3. Enter customer details (name, email, phone)
4. Search for products using the search box
5. Click on products to add them to invoice
6. Adjust quantity and price for each item
7. Verify total calculation
8. Click "Save & PDF" to save and download invoice
9. Verify invoice appears in the list

**How to Test - View & Download Invoice:**

1. Navigate to `/admin/invoices`
2. Search for an invoice
3. Hover over invoice row
4. Click Eye icon to view invoice details
5. Click Download button to download PDF
6. Verify PDF contains:
   - Suka Print logo
   - Invoice number
   - Customer information
   - Product details
   - Total amount
   - Professional formatting

### 5. PDF Invoice Generation

**Location:** Invoice creation and viewing

**Features:**

- Professional PDF invoice format
- Includes company logo from public assets
- Automatic PDF filename based on invoice number
- Print-friendly layout
- High-resolution output

**How to Test:**

1. Create a new invoice (see tests above)
2. Save & download as PDF
3. Verify PDF opens correctly
4. Verify PDF contains:
   - Suka Print logo image
   - All invoice details
   - Professional formatting
   - Correct calculations
5. Try printing the PDF to verify layout

## Test Scenarios

### Scenario 1: Complete Invoice Workflow

1. Login to admin panel
2. Go to Customers section - verify existing customers display
3. Go to Create Invoice
4. Create invoice with multiple products
5. Save invoice
6. Download PDF
7. Go back to Invoices list
8. Search for the newly created invoice
9. Download again to verify it works
10. View invoice details

### Scenario 2: Dashboard Monitoring

1. Login to dashboard
2. Create a few invoices (if none exist)
3. Verify Dashboard statistics update
4. Check Recent Invoices section shows latest invoices
5. Check Revenue Overview chart displays data
6. Check Category Breakdown shows product categories

### Scenario 3: Homepage CMS Management

1. Navigate to Homepage Config
2. Add at least one hero slide with content
3. Configure video process section
4. Select multiple featured products
5. Save all changes
6. Visit public homepage to verify changes
7. Edit homepage content again
8. Remove a slide
9. Update featured products
10. Verify changes reflect immediately

### Scenario 4: Customer Information Management

1. Go to Customers section
2. Verify all customers from previous invoices display
3. Search for a customer
4. Edit customer information
5. Save changes
6. Verify changes persist
7. Try searching with different fields (email, phone)
8. Verify statistics (total orders, total spent)

## Expected Results

### All Features Should:

- ✅ Load without errors
- ✅ Display correct data
- ✅ Allow CRUD operations (Create, Read, Update, Delete where applicable)
- ✅ Persist data to database
- ✅ Provide user feedback on actions (success/error messages)
- ✅ Display professional UI with proper styling

### Specific Requirements:

- ✅ Dashboard charts render correctly
- ✅ PDF includes logo image
- ✅ Invoice calculations are accurate
- ✅ Search functionality filters results correctly
- ✅ Recent invoices update when new invoices created
- ✅ CMS changes reflect on public homepage immediately

## Troubleshooting

### Issue: Login fails

- Verify username is "admin" and password is "password123"
- Clear browser cache and local storage
- Check backend server is running on port 5000

### Issue: API calls fail

- Verify backend server is running
- Check MongoDB connection is active
- Verify network requests in browser DevTools

### Issue: PDF not downloading

- Check if html2canvas and jsPDF are properly installed
- Verify invoice data is complete before saving
- Check browser pop-up blocker settings

### Issue: Logo not showing in PDF

- Verify `/public/assets/suka.png` file exists
- Check image file is accessible via `/assets/suka.png` path
- Try refreshing the invoice preview

## Notes

- All timestamps are in the user's local timezone
- Currency is in Malaysian Ringgit (RM)
- Admin panel requires authentication token
- All data is stored in MongoDB
