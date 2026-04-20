const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const wipeProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');
        const result = await Product.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} products.`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

wipeProducts();
