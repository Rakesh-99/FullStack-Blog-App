import express from "express";
const commentRouter = express.Router();
import { addComment, getUserComments } from "../controller/commentController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";






commentRouter
    .post('/add-comment/:blogId/:userId', verifyUserMiddleware, addComment)
    .get('/get-comment/:blogId', getUserComments)







export default commentRouter;