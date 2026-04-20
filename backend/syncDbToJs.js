const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const jsProducts = [
    { title: 'TRAVEL ADAPTER TD 04', image: 'https://sukaprint.com/wp-content/uploads/2025/06/TA-04-.png' },
    { title: 'ECO NOTEPAD EC 03', image: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png' },
    { title: 'ECO NOTEPAD EC 04', image: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png' },
    { title: 'NOTEPAD NB 19', image: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png' },
    { title: 'NOTEPAD NB 20', image: 'https://sukaprint.com/wp-content/uploads/2025/07/notepad.png' },
    { title: 'KITCHENWARE AM 43', image: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png' },
    { title: 'KITCHENWARE CE 56', image: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png' },
    { title: 'VACUUM FLASK VF 49', image: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png' },
    { title: 'VACUUM FLASK VF 32', image: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png' },
    { title: 'VACUUM FLASK VF 50', image: 'https://sukaprint.com/wp-content/uploads/2025/07/vacuum-flashk.png' },
    { title: 'PLASTIC PEN PP AM', image: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png' },
    { title: 'METAL PEN MP 09', image: 'https://sukaprint.com/wp-content/uploads/2025/07/metal-pen.png' },
];

// Mappings for the main 3 products the user checked
const mainProducts = [
    { title: 'Standard Business Cards', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-01.png' },
    { title: 'Premium Foil Business Cards', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bc-04.png' },
    { title: 'Vinyl Outdoor Banner (6x4 ft)', image: 'https://sukaprint.com/wp-content/uploads/2025/06/Bn-03.png' }
];

const syncDbToJs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Syncing Database images to match Frontend Hardcoded Data...');

        const allToSync = [...jsProducts, ...mainProducts];

        for (const p of allToSync) {
            await Product.updateMany({ title: p.title }, { image: p.image });
            console.log(`Updated consistency: ${p.title}`);
        }

        console.log('🎉 Successfully ensured all images are SAME between Homepage and Product Pages!');
        process.exit();
    } catch (err) {
        console.error('Final sync failed:', err);
        process.exit(1);
    }
};

syncDbToJs();
