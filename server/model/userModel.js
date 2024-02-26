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
    profilePicture: {
        type: String,
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&tbnid=GonJG9aLPTc5LM&vet=12ahUKEwj71Y7whb2EAxXiSmwGHf56CaAQMygAegQIARA_..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&w=720&h=720&q=default%20profile%20picture%20pixabay&client=firefox-b-d&ved=2ahUKEwj71Y7whb2EAxXiSmwGHf56CaAQMygAegQIARA_'
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
