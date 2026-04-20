const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local from project root
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGO_URI = process.env.MONGO_URI;

async function wipeDB() {
    if (!MONGO_URI) {
        console.error('❌ MONGO_URI is missing in .env.local. Cannot proceed.');
        process.exit(1);
    }

    try {
        console.log('Connecting to database...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected successfully!');

        const collections = ['products', 'homepages', 'orders', 'portfolios'];
        
        console.log('--- Wiping Collections ---');
        for (const collName of collections) {
            const result = await mongoose.connection.db.collection(collName).deleteMany({});
            console.log(`🗑️  ${collName.padEnd(12)}: Deleted ${result.deletedCount} documents`);
        }
        console.log('---------------------------');
        console.log('✅ All seeded data has been removed.');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during wipe:', err.message);
        process.exit(1);
    }
}

wipeDB();
