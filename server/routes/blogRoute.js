import express from 'express';
const blogRouter = express.Router();
import { postBlog, getAllBlogs } from '../controller/blogController.js';
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';

blogRouter.post('/postblog', verifyUserMiddleware, postBlog)
    .get('/getallblogs', getAllBlogs);






export default blogRouter;