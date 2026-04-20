const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        title: 'Premium Business Cards',
        category: 'Business Cards',
        price: 49.00,
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=80',
        description: 'High-quality 310gsm matte/glossy finish. Professional look for your networking needs. Min Order: 100 PCS'
    },
    {
        title: 'Large Format Banners',
        category: 'Banners',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
        description: 'Weatherproof vinyl banners for outdoor and indoor events. Vibrant colors and durable material.'
    },
    {
        title: 'Die-Cut Stickers',
        category: 'Stickers',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800&q=80',
        description: 'Custom shape stickers for branding and packaging. Waterproof and UV resistant.'
    },
    {
        title: 'Corporate Flyers',
        category: 'Flyers',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
        description: 'A4/A5 full-color flyers for marketing campaigns. High-speed offset printing.'
    },
    {
        title: 'Wedding Invitation Cards',
        category: 'Documents',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
        description: 'Elegant custom-designed invitations with premium textured paper.'
    },
    {
        title: 'Custom Packaging Boxes',
        category: 'Packaging',
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?auto=format&fit=crop&w=800&q=80',
        description: 'Branded cardboard boxes for e-commerce and retail. Custom sizes available.'
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for printing products seeding...');

        // Clear existing
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // Insert
        await Product.insertMany(products);
        console.log(`${products.length} template products seeded successfully!`);

        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedProducts();
