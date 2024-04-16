import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

const userRoutes = Router();

// get all users
userRoutes.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
}
);

// create a new user
userRoutes.post('/', async function handler(req, res) {
    try {
        const { body } = req;
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const user = new User(
            {
                username: body.username,
                password: hashedPassword
            }
        );
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);

// delete a user
userRoutes.delete('/:id', async function handler(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);

// update a user
userRoutes.put('/:id', async function handler(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);

export default userRoutes;