import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import multer from 'multer';

// connect to mongoose using async/await
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/express-mongoose');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDB();


const app = express();
// middleware to parse JSON bodies
app.use(express.json());
// initialize multer
// store files with original name
const storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }
)
const mul = multer({ storage: storage });

// upload image with name 'profile_pic'
app.post('/upload', mul.single('profile_pic'), (req, res) => {
    res.json(
        {
            'message': 'Image uploaded successfully',
        }
    )
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);


app.listen(3000, function handler() {
    console.log('Server is listening on port 3000');
});