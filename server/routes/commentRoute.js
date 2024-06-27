import express from "express";
const commentRouter = express.Router();
import { addComment, getUserComments, likeTheComment } from "../controller/commentController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";






commentRouter
    .post('/add-comment/:blogId/:userId', verifyUserMiddleware, addComment)
    .get('/get-comment/:blogId', getUserComments)
    .put('/like-the-comment/:commentId', verifyUserMiddleware, likeTheComment)







export default commentRouter;