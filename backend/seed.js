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
            {
                title: 'Premium Business Cards',
                description: 'High-quality 310gsm art card with matte lamination. Perfect for making a lasting impression.',
                price: 45.00,
                category: 'Business Cards',
                imagePath: 'https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?q=80&w=600&auto=format&fit=crop',
                isBestSeller: true,
                stock: 100
            },
            {
                title: 'Vinyl Banner (8x4)',
                description: 'Durable outdoor vinyl banner with eyelets. Weather-resistant and vibrant colors.',
                price: 120.00,
                category: 'Banners',
                imagePath: 'https://images.unsplash.com/photo-1563986768494-4dee46a38531?q=80&w=600&auto=format&fit=crop',
                isTopRated: true,
                stock: 50
            },
            {
                title: 'Custom Stickers (Die-cut)',
                description: 'Waterproof die-cut stickers. Any shape, any size. Great for branding.',
                price: 35.00,
                category: 'Stickers',
                imagePath: 'https://images.unsplash.com/photo-1616613386341-8692634e9dfc?q=80&w=600&auto=format&fit=crop',
                stock: 200
            },
            {
                title: 'A5 Flyers (Glossy)',
                description: '1000pcs A5 Flyers on 128gsm art paper. Full color printing.',
                price: 150.00,
                category: 'Flyers',
                imagePath: 'https://plus.unsplash.com/premium_photo-1675802568688-662580556d19?q=80&w=600&auto=format&fit=crop',
                stock: 500
            },
            {
                title: 'Roll-up Bunting',
                description: 'Portable roll-up bunting with aluminum stand. Includes carrying case.',
                price: 85.00,
                category: 'Banners',
                imagePath: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=600&auto=format&fit=crop',
                stock: 30
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
