import userModel from "../model/userModel.js"
import asyncHandler from 'express-async-handler';
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';








// Nodemailer config:

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});


//POST req (Signup):

export const signUp = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body;
    const existUser = await userModel.findOne({ email });

    if (existUser) {
        return next(errorHandler('User is already registered!', 400));
    } else {

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const addUser = new userModel({
            username,
            email,
            password: hashedPassword
        });
        await addUser.save();
        return res.status(200).json({ success: true, message: 'user has been registered', user: addUser });
    }
});




// POST req (SignIn):

export const signIn = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const isUserExist = await userModel.findOne({ email: email });

    if (!isUserExist) {
        return next(errorHandler('User not found!', 400));
    }

    const passwordMatch = await bcrypt.compare(password, isUserExist.password);

    if (passwordMatch) {
        const accessToken = jwt.sign({ _id: isUserExist._id }, process.env.ACCESS_TOKEN, { expiresIn: '30d' });
        const addToken = await userModel.findByIdAndUpdate({ _id: isUserExist._id }, { token: accessToken }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: addToken,
            user: isUserExist
        })
    } else {
        return next(errorHandler('Invalid authentication!', 400));
    }
});


// Google OAth :

export const googleOAth = asyncHandler(async (req, res, next) => {

    const { name, email, googlePhotoURL } = req.body;

    console.log(name, email, googlePhotoURL);
})