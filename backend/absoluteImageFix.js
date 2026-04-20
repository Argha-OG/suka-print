const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const absoluteSync = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Starting Absolute Image Fix for ALL products...');

        // 1. Get all products
        const products = await Product.find({});
        console.log(`Found ${products.length} products total.`);

        let fixCount = 0;
        for (const p of products) {
            // FIX: If image starts with /assets (local), replace with a high-quality Unsplash fallback
            // OR use specific mappings for known categories
            if (p.image && p.image.startsWith('/assets')) {
                let fallback = 'https://images.unsplash.com/photo-1586075010633-2470acfd8e8b?auto=format&fit=crop&q=80&w=800'; // Default catch-all
                
                if (p.category === 'Business Cards') fallback = 'https://images.unsplash.com/photo-1598124146163-36819847286d?auto=format&fit=crop&w=800';
                if (p.category === 'Banners') fallback = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800';
                if (p.category === 'Packaging') fallback = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800';
                if (p.category === 'Stickers' || p.category === 'Labels') fallback = 'https://images.unsplash.com/photo-1572375927083-07b960be406d?auto=format&fit=crop&w=800';
                if (p.category === 'Gifts') fallback = 'https://images.unsplash.com/photo-1594943586151-034882782e4f?auto=format&fit=crop&w=800';
                if (p.category === 'Booklets') fallback = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800';
                if (p.category === 'Documents') fallback = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800';

                p.image = fallback;
                await p.save();
                fixCount++;
                console.log(`Fixed: ${p.title}`);
            }
        }

        // 2. Extra targeted fix for the ones the user explicitly checked
        await Product.updateMany({ title: 'Standard Business Cards' }, { image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-01.png' });
        await Product.updateMany({ title: 'Premium Foil Business Cards' }, { image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-04.png' });
        await Product.updateMany({ title: 'Vinyl Outdoor Banner (6x4 ft)' }, { image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bn-03.png' });

        console.log(`🎉 Success! Fixed ${fixCount} product images in total.`);
        process.exit();
    } catch (err) {
        console.error('Final fix failed:', err);
        process.exit(1);
    }
};

absoluteSync();
