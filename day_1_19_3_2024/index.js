import mongoose from 'mongoose';
import Fruit from './models/Fruit.js';


// connect to the cluster using async/await
async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/aptech");
        console.log('Connected to the database');
        // get all the fruits
        const fruits = await Fruit.find();
        console.log(fruits);
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}
connectToDB();