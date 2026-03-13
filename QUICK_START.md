# Quick Start Guide - Suka Print Admin System

## 🚀 Getting Started

### 1. Start Backend Server

```bash
cd backend
npm install  # If not already installed
node server.js
```

Backend runs on: `http://localhost:5000`

### 2. Start Frontend Server

```bash
cd frontend
npm install  # If not already installed
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 3. Login to Admin Panel

- Navigate to: `http://localhost:3000/admin/login`
- **Username:** `admin`
- **Password:** `password123`
- Click "Sign In"

## 📌 Main Admin Pages

| Feature         | URL                   | Purpose                               |
| --------------- | --------------------- | ------------------------------------- |
| Dashboard       | `/admin/dashboard`    | View analytics and recent invoices    |
| Invoices        | `/admin/invoices`     | List and manage invoices              |
| Create Invoice  | `/admin/invoices/new` | Create professional invoices with PDF |
| Customers       | `/admin/customers`    | Manage customer information           |
| Homepage Config | `/admin/homepage`     | Manage public homepage content        |
| Products        | `/admin/products`     | Manage product catalog                |
| Marketing       | `/admin/marketing`    | Marketing management                  |

## 🎯 Quick Actions

### Create Your First Invoice

1. Go to **Invoices** → **Create New Invoice**
2. Enter customer details:
   - Customer Name: `Test Customer`
   - Email: `test@example.com`
   - Phone: `+60123456789`
3. Search for products (e.g., "Business Cards")
4. Click a product to add it
5. Adjust quantity as needed
6. Click **"Save & PDF"** to create and download

### Update Homepage

1. Go to **Homepage Config**
2. Click **"Add Slide"** to add hero carousel images
3. Configure video process section
4. Select products to feature
5. Click **"Save Changes"**

### View Customer Statistics

1. Go to **Customers**
2. See all customers from previous orders
3. View total orders and amount spent per customer
4. Edit customer information

### Monitor Dashboard

1. View top stats cards (Revenue, Orders, Products)
2. Check revenue trend chart (last 7 days)
3. See product sales by category
4. Monitor recent invoices in real-time

## 📊 Sample Test Data Creation

### Create Multiple Test Invoices (for dashboard testing)

1. Create invoice for "Alice Johnson" - 2 products - RM500
2. Create invoice for "Bob Smith" - 1 product - RM250
3. Create invoice for "Carol White" - 3 products - RM1000

This will populate:

- Dashboard statistics
- Recent invoices list
- Customer management section
- Revenue charts

## 🔍 Key Features to Test

### Dashboard ✨

- [ ] Stats cards show correct totals
- [ ] Revenue chart displays data
- [ ] Category pie chart shows breakdown
- [ ] Recent invoices auto-update

### Invoices ✨

- [ ] Can add products from search
- [ ] Can adjust quantity and price
- [ ] PDF downloads with logo
- [ ] Can view invoice in modal
- [ ] Search filters invoices correctly

### PDF Invoice ✨

- [ ] Logo image displays in PDF
- [ ] All details are correct
- [ ] Formatting is professional
- [ ] Can print from PDF viewer
- [ ] Filename is correct (SUKA-YYYYMMDD-XXXX.pdf)

### Customers ✨

- [ ] All customers from invoices appear
- [ ] Can search by name, email, phone
- [ ] Statistics (orders, spending) are correct
- [ ] Can edit customer info
- [ ] Changes are saved

### Homepage CMS ✨

- [ ] Can add/remove slides
- [ ] Can configure video
- [ ] Can select featured products
- [ ] Changes reflect on public homepage

## 🛠️ Troubleshooting

### "Cannot GET /admin/dashboard"

- Make sure frontend is running: `npm run dev` in `/frontend`
- Try clearing cache: `Ctrl+Shift+Delete` in browser

### Login fails

- Check credentials: `admin` / `password123`
- Verify backend is running on port 5000
- Check browser console for error messages

### PDF won't download

- Check if logo file exists at `/public/assets/suka.png`
- Try refreshing the page
- Check browser download settings

### Charts not showing

- Verify MongoDB is running
- Check if you have at least one invoice created
- Look for errors in browser DevTools under Network tab

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 💡 Tips

1. **Create test invoices first** to see dashboard data
2. **Use sample products** from the product catalog
3. **Download PDFs** to verify logo appears correctly
4. **Edit customers** to test the edit functionality
5. **Update homepage** and check public site side-by-side

## 📞 Support

For detailed features and scenarios, see:

- `IMPLEMENTATION_SUMMARY.md` - Full system overview
- `TESTING_GUIDE.md` - Comprehensive testing scenarios

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB database is connected
- [ ] Admin login works
- [ ] Dashboard loads without errors
- [ ] Can create an invoice
- [ ] PDF downloads with logo
- [ ] Can view customers
- [ ] Can edit homepage content

You're all set! 🎉
