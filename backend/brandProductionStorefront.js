const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const mapping = {
    // Cards
    'Standard Business Cards': '/assets/images/products/cards/standard.png',
    'Premium Foil Business Cards': '/assets/images/products/cards/foil.png',
    'Matte Finish Business Cards': '/assets/images/products/cards/matte.png',
    'Glossy Business Cards': '/assets/images/products/cards/matte.png',
    'Rounded Corner Business Cards': '/assets/images/products/cards/matte.png',

    // Banners
    'Vinyl Outdoor Banner (6x4 ft)': '/assets/images/products/banners/vinyl.png',
    'Retractable Pull-Up Banner': '/assets/images/products/banners/pullup.png',
    'Mesh Banner': '/assets/images/products/banners/vinyl.png',

    // Signage
    'A-Frame Sidewalk Sign': '/assets/images/products/signage/aframe.png',
    'Corrugated Plastic Yard Sign': '/assets/images/products/signage/aframe.png',

    // Packaging
    'Custom Mailer Boxes': '/assets/images/products/packaging/mailer.png',
    'Product Cartons': '/assets/images/products/packaging/mailer.png',
    'Kraft Paper Bags': '/assets/images/products/packaging/kraft.png',
    'Poly Mailer Bags': '/assets/images/products/packaging/mailer.png',
    'Custom Tissue Paper': '/assets/images/products/packaging/kraft.png',

    // Stickers & Labels
    'Die-Cut Vinyl Stickers': '/assets/images/products/stickers/vinyl.png',
    'Roll Labels': '/assets/images/products/stickers/vinyl.png',
    'Holographic Stickers': '/assets/images/products/stickers/vinyl.png',
    'Clear Product Labels': '/assets/images/products/stickers/vinyl.png',
    'Bumper Stickers': '/assets/images/products/stickers/vinyl.png',

    // Gifts
    'Engraved Metal Pen': '/assets/images/products/gifts/pen.png',
    'Custom Ceramic Mug': '/assets/images/products/gifts/flask.png',
    'Branded Vacuum Flask': '/assets/images/products/gifts/flask.png',
    'Custom Notebook': '/assets/images/products/gifts/notebook.png',
    'Canvas Tote Bag': '/assets/images/products/packaging/kraft.png',

    // Booklets & Documents
    'Saddle-Stitched Booklet': '/assets/images/products/booklets/catalog.png',
    'Perfect Bound Book': '/assets/images/products/booklets/catalog.png',
    'Spiral Bound Presentation': '/assets/images/products/booklets/catalog.png',
    'Tri-Fold Brochures': '/assets/images/products/booklets/catalog.png',
    'Flyers & Leaflets': '/assets/images/products/booklets/catalog.png',

    // Core Electronics/Stationery
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

const brandProduction = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Production Database...');

        let updatedCount = 0;
        for (const [title, path] of Object.entries(mapping)) {
            const res = await Product.updateMany(
                { title: title }, 
                { image: path }
            );
            if (res.modifiedCount > 0) {
                console.log(`✓ Synchronized: ${title}`);
                updatedCount += res.modifiedCount;
            }
        }

        console.log(`\n🎉 Synchronized ${updatedCount} product branded paths in production!`);
        process.exit();
    } catch (err) {
        console.error('Production sync failed:', err);
        process.exit(1);
    }
};

brandProduction();
