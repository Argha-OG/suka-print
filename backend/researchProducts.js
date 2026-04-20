const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const titles = [
    'TRAVEL ADAPTER TD 04',
    'ECO NOTEPAD EC 03',
    'ECO NOTEPAD EC 04',
    'NOTEPAD NB 19',
    'NOTEPAD NB 20',
    'KITCHENWARE AM 43',
    'KITCHENWARE CE 56',
    'VACUUM FLASK VF 49',
    'VACUUM FLASK VF 32'
];

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ title: { $in: titles } });
        console.log(JSON.stringify(products, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkProducts();
