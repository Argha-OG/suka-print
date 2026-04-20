const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local from project root
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGO_URI = process.env.MONGO_URI;

async function checkDB() {
    if (!MONGO_URI) {
        console.error('❌ MONGO_URI is missing in .env.local');
        process.exit(1);
    }

    try {
        console.log('Connecting to:', MONGO_URI.split('@').pop()); // Log only host for safety
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected successfully!');

        const productCount = await mongoose.connection.db.collection('products').countDocuments();
        const homepageCount = await mongoose.connection.db.collection('homepages').countDocuments();

        console.log('--- DB STATS ---');
        console.log(`Products: ${productCount}`);
        console.log(`Homepage Configs: ${homepageCount}`);
        console.log('----------------');

        if (productCount === 0) {
            console.log('⚠️ Your database is EMPTY. You need to run the seeding script.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Database Connection Error:', err.message);
        process.exit(1);
    }
}

checkDB();
