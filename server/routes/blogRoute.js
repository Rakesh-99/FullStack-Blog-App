import express from 'express';
const blogRouter = express.Router();
import { postBlog, getAllBlogs, deleteBlog } from '../controller/blogController.js';
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';

blogRouter.post('/postblog', verifyUserMiddleware, postBlog)
    .get('/getallblogs', getAllBlogs)
    .delete('/deleteblog/:blogid/:userid', verifyUserMiddleware, deleteBlog)






export default blogRouter;