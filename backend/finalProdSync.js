const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homepage = require('./models/Homepage');
const Product = require('./models/Product');

// THE PROVIDED URI (No db name, likely using 'test' or default)
const PROD_URI = 'mongodb+srv://arghacypher_db_user:3o80MTFGFb8cZ46e@sukaprint.bnnjl1c.mongodb.net/?appName=sukaprint';

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

const mapping = {
    'Standard Business Cards': '/assets/images/products/cards/standard.png',
    'Premium Foil Business Cards': '/assets/images/products/cards/foil.png',
    'Matte Finish Business Cards': '/assets/images/products/cards/matte.png',
    'Glossy Business Cards': '/assets/images/products/cards/matte.png',
    'Rounded Corner Business Cards': '/assets/images/products/cards/matte.png',
    'Vinyl Outdoor Banner (6x4 ft)': '/assets/images/products/banners/vinyl.png',
    'Retractable Pull-Up Banner': '/assets/images/products/banners/pullup.png',
    'Mesh Banner': '/assets/images/products/banners/vinyl.png',
    'A-Frame Sidewalk Sign': '/assets/images/products/signage/aframe.png',
    'Corrugated Plastic Yard Sign': '/assets/images/products/signage/aframe.png',
    'Custom Mailer Boxes': '/assets/images/products/packaging/mailer.png',
    'Product Cartons': '/assets/images/products/packaging/mailer.png',
    'Kraft Paper Bags': '/assets/images/products/packaging/kraft.png',
    'Poly Mailer Bags': '/assets/images/products/packaging/mailer.png',
    'Custom Tissue Paper': '/assets/images/products/packaging/kraft.png',
    'Die-Cut Vinyl Stickers': '/assets/images/products/stickers/vinyl.png',
    'Roll Labels': '/assets/images/products/stickers/vinyl.png',
    'Holographic Stickers': '/assets/images/products/stickers/vinyl.png',
    'Clear Product Labels': '/assets/images/products/stickers/vinyl.png',
    'Bumper Stickers': '/assets/images/products/stickers/vinyl.png',
    'Engraved Metal Pen': '/assets/images/products/gifts/pen.png',
    'Custom Ceramic Mug': '/assets/images/products/gifts/flask.png',
    'Branded Vacuum Flask': '/assets/images/products/gifts/flask.png',
    'Custom Notebook': '/assets/images/products/gifts/notebook.png',
    'Canvas Tote Bag': '/assets/images/products/packaging/kraft.png',
    'Saddle-Stitched Booklet': '/assets/images/products/booklets/catalog.png',
    'Perfect Bound Book': '/assets/images/products/booklets/catalog.png',
    'Spiral Bound Presentation': '/assets/images/products/booklets/catalog.png',
    'Tri-Fold Brochures': '/assets/images/products/booklets/catalog.png',
    'Flyers & Leaflets': '/assets/images/products/booklets/catalog.png',
    'TRAVEL ADAPTER TD 04': '/assets/images/products/electronics/travel_adapter.png',
    'ECO NOTEPAD EC 03': '/assets/images/products/gifts/notebook.png',
    'ECO NOTEPAD EC 04': '/assets/images/products/gifts/notebook.png',
    'NOTEPAD NB 19': '/assets/images/products/gifts/notebook.png',
    'NOTEPAD NB 20': '/assets/images/products/gifts/notebook.png',
    'KITCHENWARE AM 43': '/assets/images/products/gifts/flask.png',
    'KITCHENWARE CE 56': '/assets/images/products/gifts/flask.png',
    'VACUUM FLASK VF 49': '/assets/images/products/gifts/flask.png',
    'VACUUM FLASK VF 32': '/assets/images/products/gifts/flask.png'
};

const finalProductionSync = async () => {
    try {
        await mongoose.connect(PROD_URI);
        console.log('Connected to actual Production Database...');

        console.log('1. Syncing Homepage Data...');
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

        console.log('2. Syncing Product Images...');
        let updatedCount = 0;
        for (const [title, path] of Object.entries(mapping)) {
            const res = await Product.updateMany({ title }, { image: path });
            if (res.modifiedCount > 0) updatedCount += res.modifiedCount;
        }

        console.log(`🎉 Success! Updated homepage and ${updatedCount} product image paths.`);
        process.exit();
    } catch (err) {
        console.error('Final Sync failed:', err);
        process.exit(1);
    }
};

finalProductionSync();
