import express from 'express';
const userRouter = express.Router();
import { signUp, signIn, googleOAth } from '../controller/userController.js';




userRouter.post('/signup', signUp)
    .post('/signin', signIn)
    .post('/googleOAth', googleOAth)




export default userRouter;