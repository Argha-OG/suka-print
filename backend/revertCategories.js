const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./models/Homepage');

// THE PROVIDED PRODUCTION URI
const PROD_URI = 'mongodb+srv://arghacypher_db_user:3o80MTFGFb8cZ46e@sukaprint.bnnjl1c.mongodb.net/?appName=sukaprint';

const categories = [
    { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', link: '/products?category=Business Cards' },
    { name: 'Banners', image: 'https://images.unsplash.com/photo-1583023240292-6d38e21975e5?auto=format&fit=crop&q=80&w=800', link: '/products?category=Banners' },
    { name: 'Packaging', image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800', link: '/products?category=Packaging' },
    { name: 'Stickers', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', link: '/products?category=Stickers' },
    { name: 'Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', link: '/products?category=Gifts' },
    { name: 'Booklets', image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800', link: '/products?category=Booklets' }
];

const revertCategories = async () => {
    try {
        await mongoose.connect(PROD_URI);
        console.log('Reverting Homepage Category Images on Production...');

        await Homepage.findOneAndUpdate(
            { active: true },
            { popularCategories: categories }
        );

        console.log('🎉 Successfully reverted categories to high-quality Unsplash images!');
        process.exit();
    } catch (err) {
        console.error('Revert failed:', err);
        process.exit(1);
    }
};

revertCategories();
