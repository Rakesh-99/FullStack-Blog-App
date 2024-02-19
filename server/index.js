import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';
connectDB(process.env.DB_URL);
const PORT = process.env.PORT || 8000;
import cors from 'cors';
import { error } from './middleware/error.js';




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRouter);
app.use(error);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})






