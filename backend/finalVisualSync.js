const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./models/Homepage');
const Product = require('./models/Product');

dotenv.config();

// FINAL VERIFIED ASSET MAP
const ASSET_PATHS = {
    'Business Cards': {
        'Standard Business Cards': '/assets/images/products/cards/standard.png',
        'Premium Foil Business Cards': '/assets/images/products/cards/foil.png',
        'Matte Finish Business Cards': '/assets/images/products/cards/matte.png',
        'Glossy Business Cards': '/assets/images/products/cards/glossy.png',
        'Rounded Corner Business Cards': '/assets/images/products/cards/rounded.png',
        default: '/assets/images/products/cards/standard.png'
    },
    'Banners': {
        'Vinyl Outdoor Banner (6x4 ft)': '/assets/images/products/banners/vinyl.png',
        'Retractable Pull-Up Banner': '/assets/images/products/banners/pullup.png',
        'Mesh Banner': '/assets/images/products/banners/mesh.png',
        default: '/assets/images/products/banners/vinyl.png'
    },
    'Packaging': {
        'Custom Mailer Boxes': '/assets/images/products/packaging/mailer.png',
        'Kraft Paper Bags': '/assets/images/products/packaging/kraft.png',
        default: '/assets/images/products/packaging/mailer.png'
    },
    'Signage': {
        'A-Frame Sidewalk Sign': '/assets/images/products/signage/aframe.png',
        'Corrugated Plastic Yard Sign': '/assets/images/products/signage/yard.png',
        default: '/assets/images/products/signage/aframe.png'
    },
    'Stickers': {
        default: '/assets/images/products/stickers/vinyl.png'
    },
    'Labels': {
        default: '/assets/images/products/stickers/vinyl.png'
    },
    'Gifts': {
        'Engraved Metal Pen': '/assets/images/products/gifts/pen.png',
        'Custom Notebook': '/assets/images/products/gifts/notebook.png',
        'Branded Vacuum Flask': '/assets/images/products/gifts/flask.png',
        default: '/assets/images/products/gifts/flask.png'
    },
    'Booklets': {
        default: '/assets/images/products/booklets/catalog.png'
    },
    'Documents': {
        default: '/assets/images/products/banners/pullup.png'
    },
    'Travel Adapter': {
        default: '/assets/images/products/electronics/travel_adapter.png'
    },
    'Notepad': {
        default: '/assets/images/products/eco_notepad.png'
    },
    'Kitchenware': {
        default: '/assets/images/products/gifts/flask.png'
    },
    'Vacuum Flask': {
        default: '/assets/images/products/vacuum_flask.png'
    }
};

const localHero = [
    {
        title: "Premium Business Cards",
        subtitle: "MAKE A LASTING IMPRESSION",
        description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
        image: "/assets/images/products/cards/standard.png",
        buttonText: "Shop Cards",
        buttonLink: "/products?category=Business Cards",
        order: 0
    },
    {
        title: "Vibrant Marketing Banners",
        subtitle: "STAND OUT FROM THE CROWD",
        description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
        image: "/assets/images/products/banners/vinyl.png",
        buttonText: "Explore Banners",
        buttonLink: "/products?category=Banners",
        order: 1
    },
    {
        title: "Custom Packaging Solutions",
        subtitle: "UNBOX THE EXPERIENCE",
        description: "Tailored mailer boxes and premium kraft bags that elevate your brand value.",
        image: "/assets/images/products/packaging/mailer.png",
        buttonText: "Browse Packaging",
        buttonLink: "/products?category=Packaging",
        order: 2
    },
    {
        title: "Suka Print Signature Gifts",
        subtitle: "CORPORATE GIFTING REDEFINED",
        description: "Personalized pens, flasks, and notebooks for your business partners and clients.",
        image: "/assets/images/products/gifts/flask.png",
        buttonText: "View Gifts",
        buttonLink: "/products?category=Gifts",
        order: 3
    }
];

const finalVisualAlignment = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🚀 UNIFIED VISUAL SYNC: RESTORING CLOUD VESTIBULE...');

        // 1. Sync Hero Slider
        console.log('Syncing Hero Slider...');
        await Homepage.findOneAndUpdate({ active: true }, { heroCarousel: localHero }, { upsert: true });

        // 2. Sync All Products
        console.log('Purging WP Links & Syncing Product Assets...');
        const products = await Product.find({});
        
        let updatedCount = 0;
        for (const p of products) {
            const categoryPaths = ASSET_PATHS[p.category];
            let newImagePath = 'https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800'; // Stable fallback
            
            if (categoryPaths) {
                newImagePath = categoryPaths[p.title] || categoryPaths.default;
            }
            
            p.image = newImagePath;
            await p.save();
            updatedCount++;
        }

        // 3. Sync Featured Categories on Homepage
        console.log('Syncing Popular Categories...');
        const homepage = await Homepage.findOne({ active: true });
        if (homepage) {
            homepage.popularCategories = [
                { name: "Business Cards", image: "/assets/images/products/cards/standard.png", link: "/products?category=Business Cards" },
                { name: "Banners", image: "/assets/images/products/banners/vinyl.png", link: "/products?category=Banners" },
                { name: "Packaging", image: "/assets/images/products/packaging/mailer.png", link: "/products?category=Packaging" },
                { name: "Stickers", image: "/assets/images/products/stickers/vinyl.png", link: "/products?category=Stickers" },
                { name: "Gifts", image: "/assets/images/products/gifts/flask.png", link: "/products?category=Gifts" },
                { name: "Booklets", image: "/assets/images/products/booklets/catalog.png", link: "/products?category=Booklets" }
            ];
            await homepage.save();
        }

        console.log(`\n🎉 ABSOLUTE SUCCESS!`);
        console.log(`- Cleansed and Updated ${updatedCount} product images.`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Sync failed:', err);
        process.exit(1);
    }
};

finalVisualAlignment();
