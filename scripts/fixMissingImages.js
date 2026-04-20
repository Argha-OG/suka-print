const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const wpProductLinks = [
    { title: 'Standard Business Cards', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-01.png' },
    { title: 'Premium Foil Business Cards', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-04.png' },
    { title: 'Vinyl Outdoor Banner (6x4 ft)', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bn-03.png' }
];

const fixMissingProductImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Fixing 3 missing product images...');

        for (const p of wpProductLinks) {
            await Product.updateMany({ title: p.title }, { image: p.image });
            console.log(`Updated: ${p.title}`);
        }

        console.log('🎉 Successfully restored the 3 missing product images!');
        process.exit();
    } catch (err) {
        console.error('Fix failed:', err);
        process.exit(1);
    }
};

fixMissingProductImages();
