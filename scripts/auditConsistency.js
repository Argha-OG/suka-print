const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Homepage = require('./models/Homepage');

dotenv.config();

const auditIdConsistency = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Auditing Homepage and Product ID consistency...');

        // 1. Get the active homepage
        const homepage = await Homepage.findOne({ active: true }).populate('featuredProducts');
        if (!homepage) {
            console.log('No homepage found.');
            process.exit();
        }

        console.log('--- Featured Products on Homepage ---');
        homepage.featuredProducts.forEach(p => {
            console.log(`[${p._id}] ${p.title} -> ${p.image}`);
        });

        // 2. Get all products with those titles
        console.log('\n--- All Database Products matching these titles ---');
        const titles = homepage.featuredProducts.map(p => p.title);
        const allProducts = await Product.find({ title: { $in: titles } });
        
        allProducts.forEach(p => {
            console.log(`[${p._id}] ${p.title} -> ${p.image}`);
        });

        console.log('\n--- Decision ---');
        // If IDs match and images match, then it's a frontend cache issue.
        // If IDs differ, we need to clean up duplicates.

        process.exit();
    } catch (err) {
        console.error('Audit failed:', err);
        process.exit(1);
    }
};

auditIdConsistency();
