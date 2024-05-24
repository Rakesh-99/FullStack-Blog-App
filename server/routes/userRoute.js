import express from 'express';
import { getUser, registerUser, loginUser, updateUser, googleOAuth, deleteUser, signOutUser } from '../controller/userController.js';
const userRouter = express.Router();
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';


userRouter.get('/', getUser)
    .post('/register', registerUser)
    .post('/login', loginUser)
    .put('/updateuser/:id', verifyUserMiddleware, updateUser)
    .post('/googleuser', googleOAuth)
    .delete('/deleteuser/:id', verifyUserMiddleware, deleteUser)
    .post('/signoutuser', signOutUser)


export default userRouter;