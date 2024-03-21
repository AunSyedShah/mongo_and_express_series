// app.js

import express from 'express';
import mongoose from 'mongoose';
import Shop from './models/Shop.js';
import Product from './models/Product.js';

const app = express();
const PORT = 3000;

// Connect to the MongoDB database
async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/aptech");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}

// Middleware to ensure database connection before processing routes
app.use(async (req, res, next) => {
    if (!mongoose.connection.readyState) {
        await connectToDB();
    }
    next();
});

// Route to retrieve shop data
app.get('/shop', async (req, res) => {
    try {
        const shop = await Shop.find().populate('products');
        res.json(shop);
    } catch (error) {
        console.log('Error retrieving shop data', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
