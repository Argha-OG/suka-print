const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../src/lib/models/Product');

dotenv.config({ path: '.env.local' });

const premiumImages = {
    'Business Cards': '/assets/images/products/cards/standard.png',
    'Banners': '/assets/images/products/banners/vinyl.png',
    'Packaging': '/assets/images/products/packaging/mailer.png',
    'Stickers': '/assets/images/products/stickers/vinyl.png',
    'Gifts': '/assets/images/products/gifts/flask.png',
    'Booklets': '/assets/images/products/booklets/catalog.png',
    'Signage': '/assets/images/products/signage/aframe.png'
};

const products = [
    // Business Cards
    { title: 'Premium Foil Business Cards', description: 'Luxurious foil stamping on premium cardstock.', price: 45.00, category: 'Business Cards', image: premiumImages['Business Cards'], isBestSeller: true, stock: 100 },
    { title: 'Spot UV Business Cards', description: 'Elegant gloss highlights on matte finish.', price: 38.00, category: 'Business Cards', isBestSeller: true, stock: 100, image: premiumImages['Business Cards'] },
    { title: 'Silk Matte Business Cards', description: 'Smooth, professional touch for your brand.', price: 30.00, category: 'Business Cards', stock: 100, image: premiumImages['Business Cards'] },
    
    // Banners
    { title: 'Outdoor Vinyl Banner', description: 'Durable, weather-resistant large format printing.', price: 85.00, category: 'Banners', image: premiumImages['Banners'], isBestSeller: true, stock: 50 },
    { title: 'Pull-up Banner Stand', description: 'Lightweight and portable for exhibitions.', price: 120.00, category: 'Banners', image: premiumImages['Banners'], isBestSeller: true, stock: 30 },
    
    // Packaging
    { title: 'Custom Branded Mailer Box', description: 'High-quality corrugated boxes for shipping.', price: 5.50, category: 'Packaging', image: premiumImages['Packaging'], isBestSeller: true, stock: 500 },
    { title: 'Luxury Paper Carry Bag', description: 'Premium paper bags for retail branding.', price: 3.20, category: 'Packaging', image: premiumImages['Packaging'], stock: 1000 },
    
    // Stickers
    { title: 'Die-cut Vinyl Stickers', description: 'Custom shapes with waterproof protection.', price: 0.80, category: 'Stickers', image: premiumImages['Stickers'], isBestSeller: true, stock: 5000 },
    { title: 'Product Label Rolls', description: 'Continuous roll labels for easy application.', price: 150.00, category: 'Stickers', image: premiumImages['Stickers'], stock: 50 },
    
    // Gifts
    { title: 'Engraved Vacuum Flask', description: 'Keep drinks hot or cold with custom branding.', price: 45.00, category: 'Gifts', image: premiumImages['Gifts'], isBestSeller: true, stock: 200 },
    { title: 'Custom Branded Notebook', description: 'Premium hard-cover notebooks for corporate gifts.', price: 25.00, category: 'Gifts', image: '/assets/images/products/gifts/notebook.png', stock: 300 },
    
    // Booklets
    { title: 'Annual Report Booklet', description: 'Professional binding with high-gloss pages.', price: 15.00, category: 'Booklets', image: premiumImages['Booklets'], isBestSeller: true, stock: 100 }
];

// Fill up to 30 products with variants
for (let i = products.length; i < 30; i++) {
    const base = products[i % products.length];
    products.push({
        ...base,
        title: `${base.title} (V${i})`,
        _id: new mongoose.Types.ObjectId()
    });
}

async function seedProducts() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Cleaning existing products...');
        await Product.default.deleteMany({});
        
        console.log(`Successfully restored ${products.length} products with PREMIUM AI IMAGES!`);
        await Product.default.insertMany(products);
        
        process.exit(0);
    } catch (err) {
        console.error('Seed Error:', err.message);
        process.exit(1);
    }
}

seedProducts();
