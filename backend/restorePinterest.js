const mongoose = require('mongoose');
const Homepage = require('./models/Homepage');

const PROD_URI = 'mongodb+srv://arghacypher_db_user:3o80MTFGFb8cZ46e@sukaprint.bnnjl1c.mongodb.net/?appName=sukaprint';

const pinterestHero = [
    {
        title: "Premium Business Cards",
        subtitle: "MAKE A LASTING IMPRESSION",
        description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
        image: "https://i.pinimg.com/736x/d2/17/37/d21737ad3b3efafb0447396cd90e72b5.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 0
    },
    {
        title: "Vibrant Marketing Banners",
        subtitle: "STAND OUT FROM THE CROWD",
        description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
        image: "https://i.pinimg.com/1200x/a9/18/72/a9187200aba807217c92d379d7d5bd14.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 1
    },
    {
        title: "Custom Packaging",
        subtitle: "UNBOX THE EXPERIENCE",
        description: "Tailored boxes and labels that elevate your brand value.",
        image: "https://i.pinimg.com/1200x/9a/b0/c5/9ab0c5eb69dcde68d501687f2775df40.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 2
    },
    {
        title: "Custom Stickers & Labels",
        subtitle: "STICK WITH EXCELLENCE",
        description: "Waterproof, durable, and custom-cut options for product branding and promotions.",
        image: "https://i.pinimg.com/1200x/ec/ad/dc/ecaddc22a5b10b944662fbb9cf9372d1.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 3
    },
    {
        title: "Professional Booklets",
        subtitle: "SHARE YOUR STORY",
        description: "Perfect for company profiles, reports, and product catalogs with premium binding.",
        image: "https://i.pinimg.com/1200x/9c/49/80/9c4980dd6228bdfca44fc82791c78901.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 4
    },
    {
        title: "Corporate Gifts & Apparel",
        subtitle: "BRANDED MERCHANDISE",
        description: "High-quality pens, mugs, and shirts to promote your business identity.",
        image: "https://i.pinimg.com/736x/ce/af/d3/ceafd31acddcdce3322cd0c348c1c602.jpg?auto=format&fit=crop&q=80&w=1000",
        order: 5
    }
];

const pinterestCategories = [
    { name: 'Business Cards', image: 'https://i.pinimg.com/736x/d2/17/37/d21737ad3b3efafb0447396cd90e72b5.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Business Cards' },
    { name: 'Banners', image: 'https://i.pinimg.com/1200x/ec/ad/dc/ecaddc22a5b10b944662fbb9cf9372d1.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Banners' },
    { name: 'Packaging', image: 'https://i.pinimg.com/1200x/9a/b0/c5/9ab0c5eb69dcde68d501687f2775df40.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Packaging' },
    { name: 'Stickers', image: 'https://i.pinimg.com/1200x/ec/ad/dc/ecaddc22a5b10b944662fbb9cf9372d1.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Stickers' },
    { name: 'Gifts', image: 'https://i.pinimg.com/736x/ce/af/d3/ceafd31acddcdce3322cd0c348c1c602.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Gifts' },
    { name: 'Booklets', image: 'https://i.pinimg.com/1200x/9c/49/80/9c4980dd6228bdfca44fc82791c78901.jpg?auto=format&fit=crop&q=80&w=400', link: '/products?category=Booklets' }
];

const restorePinterestVisuals = async () => {
    try {
        await mongoose.connect(PROD_URI);
        console.log('Restoring Pinterest-style visuals to Production...');

        await Homepage.findOneAndUpdate(
            { active: true },
            {
                heroCarousel: pinterestHero,
                popularCategories: pinterestCategories
            }
        );

        console.log('🎉 Successfully restored the 6 previous images for both Hero and Categories!');
        process.exit();
    } catch (err) {
        console.error('Restoration failed:', err);
        process.exit(1);
    }
};

restorePinterestVisuals();
