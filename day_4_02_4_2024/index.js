import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
// middleware to parse JSON bodies
app.use(express.json());

// connect to mongoose using async/await
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/express-mongoose');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
connectToDB();

// get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// update a user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
