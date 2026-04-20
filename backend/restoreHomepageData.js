const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./models/Homepage');

dotenv.config();

const heroData = [
    {
        image: 'https://images.unsplash.com/photo-1562654508-4c3245455243?auto=format&fit=crop&q=80&w=2000',
        title: 'Premium Business Cards',
        subtitle: 'Make a lasting impression with our high-quality stock and finishes.',
        buttonText: 'Order Now',
        buttonLink: '/products',
        order: 0
    },
    {
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=2000',
        title: 'Custom Packaging',
        subtitle: 'Elevate your brand with custom boxes and shipping materials.',
        buttonText: 'Get Quote',
        buttonLink: '/products',
        order: 1
    },
    {
        image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=2000',
        title: 'Corporate Gifts',
        subtitle: 'Professional gifts that speak volumes about your brand quality.',
        buttonText: 'Browse Gifts',
        buttonLink: '/products',
        order: 2
    },
    {
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000',
        title: 'Large Format Banners',
        subtitle: 'Outdoor and indoor banners with vibrant colors and durability.',
        buttonText: 'Customize',
        buttonLink: '/products',
        order: 3
    },
    {
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=2000',
        title: 'Stickers & Labels',
        subtitle: 'Die-cut vinyl stickers and product labels for any surface.',
        buttonText: 'Create Yours',
        buttonLink: '/products',
        order: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=2000',
        title: 'Custom Booklets',
        subtitle: 'Magazines, catalogs, and manuals with professional binding.',
        buttonText: 'View Options',
        buttonLink: '/products',
        order: 5
    }
];

const categories = [
    { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', link: '/products?category=Business Cards' },
    { name: 'Banners', image: 'https://images.unsplash.com/photo-1583023240292-6d38e21975e5?auto=format&fit=crop&q=80&w=800', link: '/products?category=Banners' },
    { name: 'Packaging', image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800', link: '/products?category=Packaging' },
    { name: 'Stickers', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', link: '/products?category=Stickers' },
    { name: 'Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', link: '/products?category=Gifts' },
    { name: 'Booklets', image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800', link: '/products?category=Booklets' }
];

const syncProduction = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Production Database...');

        await Homepage.findOneAndUpdate(
            { active: true },
            {
                heroCarousel: heroData,
                popularCategories: categories,
                videoProcess: {
                    videoUrl: 'https://www.youtube.com/embed/a9y9K9KqCV8',
                    title: 'Our Professional Printing Process',
                    description: 'Witness the quality and precision we bring to every single print project.'
                }
            },
            { upsert: true, new: true }
        );

        console.log('🎉 Production Homepage Data Synchronized!');
        process.exit();
    } catch (err) {
        console.error('Sync failed:', err);
        process.exit(1);
    }
};

syncProduction();
