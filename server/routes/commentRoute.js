import express from "express";
const commentRouter = express.Router();
import { addComment, getComment, likeTheComment, deleteComment } from "../controller/commentController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";






commentRouter
    .post('/add-comment', verifyUserMiddleware, addComment)
    .get('/get-comment/:blogId', getComment)
    .put('/like-the-comment/:commentId', verifyUserMiddleware, likeTheComment)
    .delete('/delete-comment/:commentId/:userId', deleteComment)






export default commentRouter;