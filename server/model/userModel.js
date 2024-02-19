import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    token: {
        type: String,
    },
    verifyToken: {
        type: String
    }

}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
