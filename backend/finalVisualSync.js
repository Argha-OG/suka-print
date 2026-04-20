const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./models/Homepage');
const Product = require('./models/Product');

dotenv.config();

const localHero = [
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
    }
];

const productMapping = [
    { title: 'Standard Business Cards', image: '/assets/images/products/cards/standard.png' },
    { title: 'Premium Foil Business Cards', image: '/assets/images/products/cards/foil.png' },
    { title: 'Vinyl Outdoor Banner (6x4 ft)', image: '/assets/images/products/banners/vinyl.png' },
    { title: 'Custom Mailer Boxes', image: '/assets/images/products/packaging/mailer.png' },
    { title: 'Die-Cut Vinyl Stickers', image: '/assets/images/products/stickers/vinyl.png' },
];

const finalVisualSync = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Final Visual Alignment: Using Local GitHub-tracked Assets...');

        console.log('1. Syncing Hero Slider...');
        await Homepage.findOneAndUpdate({ active: true }, { heroCarousel: localHero });

        console.log('2. Syncing Products...');
        for (const map of productMapping) {
            await Product.updateMany({ title: map.title }, { image: map.image });
        }

        console.log('🎉 Visual Alignment Complete!');
        process.exit();
    } catch (err) {
        console.error('Final sync failed:', err);
        process.exit(1);
    }
};

finalVisualSync();
