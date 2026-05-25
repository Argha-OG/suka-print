const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, {strict:false}));
    const products = await Product.find({ $or: [{title: /engrave/i}, {description: /engrave|0\.5/i}] });
    console.log("DB Matches:", products.map(p => ({ title: p.title, desc: p.description, price: p.price })));
    process.exit(0);
});
