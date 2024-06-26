import express from "express";
const commentRouter = express.Router();
import { addComment } from "../controller/commentController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";






commentRouter
    .post('/add-comment/:blogId/:userId', verifyUserMiddleware, addComment)








export default commentRouter;