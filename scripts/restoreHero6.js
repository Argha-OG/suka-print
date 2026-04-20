const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('../src/lib/models/Homepage');

dotenv.config({ path: '.env.local' });

const hero6 = [
    {
        title: "Premium Business Cards",
        subtitle: "MAKE A LASTING IMPRESSION",
        description: "High-quality cardstock with custom finishes like foil, emboss, and spot UV.",
        image: "/assets/images/products/cards/standard.png",
        order: 0
    },
    {
        title: "Vibrant Marketing Banners",
        subtitle: "STAND OUT FROM THE CROWD",
        description: "Durable, weather-resistant materials perfect for indoor and outdoor displays.",
        image: "/assets/images/products/banners/vinyl.png",
        order: 1
    },
    {
        title: "Custom Packaging",
        subtitle: "UNBOX THE EXPERIENCE",
        description: "Tailored boxes and labels that elevate your brand value.",
        image: "/assets/images/products/packaging/mailer.png",
        order: 2
    },
    {
        title: "Custom Stickers & Labels",
        subtitle: "STICK WITH EXCELLENCE",
        description: "Waterproof, durable, and custom-cut options for product branding and promotions.",
        image: "/assets/images/products/stickers/vinyl.png",
        order: 3
    },
    {
        title: "Professional Booklets",
        subtitle: "SHARE YOUR STORY",
        description: "Perfect for company profiles, reports, and product catalogs with premium binding.",
        image: "/assets/images/products/booklets/catalog.png",
        order: 4
    },
    {
        title: "Corporate Gifts & Signage",
        subtitle: "BRANDED MERCHANDISE",
        description: "High-quality help to promote your business identity with professional signage.",
        image: "/assets/images/products/signage/aframe.png",
        order: 5
    }
];

const restoreHero6 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Restoring the 6 Hero Sliders to the database...');
        
        await Homepage.default.findOneAndUpdate({ active: true }, { heroCarousel: hero6 });
        
        console.log('🎉 Successfully restored all 6 Hero Slider categories!');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

restoreHero6();
