const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Marketing = require('./models/Marketing');

// Load environment variables
dotenv.config({ path: './.env' }); // Adjusted path if running from backend dir

// Connect DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/suka-print');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Connection Error:', err);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Marketing.deleteMany({});
        console.log('Data Cleared');

        // 1. Create Admin User
        await User.create({
            username: 'admin',
            password: 'password123',
            role: 'admin'
        });
        console.log('Admin User Created (admin/password123)');

        // 2. Create Products
        const products = [
            // Travel Adapter
            {
                title: 'TRAVEL ADAPTER TD 04',
                category: 'Travel Adapter',
                price: 35.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/06/TA-04-.png',
                description: 'Specifications: Black, White, Red, Yellow, Pink, Sea Blue. Min Order: 50 PCS',
                stock: 100
            },
            // Notepads
            {
                title: 'ECO NOTEPAD EC 03',
                category: 'Notepad',
                price: 15.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png',
                description: 'Eco Notepad w/ Pen (Black, Red, Royal Blue). Min Order: 50 PCS',
                stock: 100
            },
            {
                title: 'ECO NOTEPAD EC 04',
                category: 'Notepad',
                price: 15.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png',
                description: 'Eco Notepad w/ Pen (Red, Orange, Green). Min Order: 50 PCS',
                stock: 100
            },
            {
                title: 'NOTEPAD NB 19',
                category: 'Notepad',
                price: 12.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png',
                description: 'Eco Notepad w/ Pen (Red, Royal Blue, Green). Min Order: 50 PCS',
                stock: 100
            },
            {
                title: 'NOTEPAD NB 20',
                category: 'Notepad',
                price: 12.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png',
                description: 'Eco Notepad w/ Pen (Red, Royal Blue, Green). Min Order: 50 PCS',
                stock: 100
            },
            // Kitchenware
            {
                title: 'KITCHENWARE AM 43',
                category: 'Kitchenware',
                price: 45.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Rose Gold, Grey). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'KITCHENWARE CE 56',
                category: 'Kitchenware',
                price: 45.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Rose Gold). Min Order: 1 PCS',
                stock: 50
            },
            // Vacuum Flasks
            {
                title: 'VACUUM FLASK VF 49',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Rose Gold, Grey). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 32',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Rose Gold). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 50',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, White, Red). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 34',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Beige). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 36, 37',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Natural). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 48',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, White, Turquoise). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 40',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, White, Grey). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 45',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Beige, Grey). Min Order: 1 PCS',
                stock: 50
            },
            {
                title: 'VACUUM FLASK VF 46',
                category: 'Vacuum Flask',
                price: 38.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png',
                description: 'Stainless Steel 304 (Black, Beige, Grey). Min Order: 1 PCS',
                stock: 50
            },
            // Plastic Pens
            {
                title: 'PLASTIC PEN PP AM',
                category: 'Plastic Pen',
                price: 2.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. White, Black, Red, Royal Blue. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'PLASTIC PEN PP 72',
                category: 'Plastic Pen',
                price: 2.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. Red, Orange, Royal Blue. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'PLASTIC PEN PP 97',
                category: 'Plastic Pen',
                price: 2.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. Black, Red, Royal Blue. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'PLASTIC PEN PP AW',
                category: 'Plastic Pen',
                price: 3.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Wooden Ball Pen. Natural, Brown. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'PLASTIC PEN PP 75',
                category: 'Plastic Pen',
                price: 3.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Gel Ink Pen. White, Black, Yellow. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'PLASTIC PEN PP 61',
                category: 'Plastic Pen',
                price: 2.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. Red, Orange, Black. Min Order: 10 PCS',
                stock: 200
            },
            // Metal Pens
            {
                title: 'METAL PEN MP 09',
                category: 'Metal Pen',
                price: 8.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball/Roller Pen. Black. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'METAL PEN MP 29',
                category: 'Metal Pen',
                price: 8.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. White, Black, Grey. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'METAL PEN MP 30',
                category: 'Metal Pen',
                price: 8.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. White, Black, Silver. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'METAL PEN MP 32',
                category: 'Metal Pen',
                price: 9.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball/Roller Pen. Black. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'METAL PEN MP 37',
                category: 'Metal Pen',
                price: 9.00,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. Black. Min Order: 10 PCS',
                stock: 200
            },
            {
                title: 'METAL PEN MP 24',
                category: 'Metal Pen',
                price: 9.50,
                imagePath: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png',
                description: 'Ball Pen. Black, White, Blue, Pink, Purple. Min Order: 10 PCS',
                stock: 200
            }
        ];
        await Product.insertMany(products);
        console.log('Sample Products Created');

        // 3. Create Marketing
        await Marketing.create({
            type: 'slider',
            title: 'Welcome to Suka Print',
            subtitle: 'Premium Printing Services in Kuala Lumpur',
            link: '/products',
            imagePath: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=1200&auto=format&fit=crop'
        });
        console.log('Marketing Banner Created');

        console.log('Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
