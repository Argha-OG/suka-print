const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('../src/lib/models/Homepage');
const Product = require('../src/lib/models/Product');

dotenv.config({ path: '.env.local' });

async function masterRestore() {
    try {
        console.log('🚀 Starting Master Database Restoration (Refined)...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Ensure a Homepage exists
        let homepage = await Homepage.default.findOne({ active: true });
        if (!homepage) {
            console.log('📝 Creating initial Homepage configuration...');
            homepage = await Homepage.default.create({
                active: true,
                title: "Suka Print Official Storefront"
            });
        }

        // 2. Get some products to feature
        const products = await Product.default.find({}).limit(10);
        if (products.length > 0) {
            homepage.featuredProducts = products.map(p => p._id);
            // Deal of THE Day removed per user request
            homepage.dealOfTheDay = null; 
        }

        // 3. Restore the 6 Hero Sliders (Using AI images mapped to standard paths)
        homepage.heroCarousel = [
            {
                id: 1,
                title: "Premium Business Cards",
                subtitle: "MAKE A LASTING IMPRESSION",
                description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
                image: "/assets/images/products/cards/standard.png"
            },
            {
                id: 2,
                title: "Vibrant Marketing Banners",
                subtitle: "STAND OUT FROM THE CROWD",
                description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
                image: "/assets/images/products/banners/vinyl.png"
            },
            {
                id: 3,
                title: "Custom Packaging",
                subtitle: "UNBOX THE EXPERIENCE",
                description: "Tailored boxes and labels that elevate your brand value.",
                image: "/assets/images/products/packaging/mailer.png"
            },
            {
                id: 4,
                title: "Custom Stickers & Labels",
                subtitle: "STICK WITH EXCELLENCE",
                description: "Waterproof, durable, and custom-cut options for product branding and promotions.",
                image: "/assets/images/products/stickers/vinyl.png"
            },
            {
                id: 5,
                title: "Professional Booklets",
                subtitle: "SHARE YOUR STORY",
                description: "Perfect for company profiles, reports, and product catalogs with premium binding.",
                image: "/assets/images/products/booklets/catalog.png"
            },
            {
                id: 6,
                title: "Corporate Gifts & Signage",
                subtitle: "BRANDED MERCHANDISE",
                description: "High-quality help to promote your business identity with professional signage.",
                image: "/assets/images/products/signage/aframe.png"
            }
        ];

        // 4. Restore Categories
        homepage.popularCategories = [
            { name: 'Business Cards', image: '/assets/images/products/cards/standard.png' },
            { name: 'Banners', image: '/assets/images/products/banners/vinyl.png' },
            { name: 'Packaging', image: '/assets/images/products/packaging/mailer.png' },
            { name: 'Stickers', image: '/assets/images/products/stickers/vinyl.png' },
            { name: 'Gifts', image: '/assets/images/products/gifts/flask.png' },
            { name: 'Booklets', image: '/assets/images/products/booklets/catalog.png' },
        ];

        await homepage.save();
        console.log('✨ Master Restoration Successful! Homepage refined and AI images ready.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Master Restoration Failed:', err.message);
        process.exit(1);
    }
}

masterRestore();
