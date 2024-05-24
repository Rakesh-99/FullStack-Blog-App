import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import blogModel from "../model/blogModel.js";






// Get all blogs : 

export const getAllBlogs = asyncHandler(async (req, res, next) => {
    try {
        const getAllBlogsInfo = await blogModel.find({});

        if (getAllBlogsInfo) {
            return res.status(200).json({
                success: true,
                message: 'Blogs have been fetched',
                blogs: getAllBlogsInfo
            })
        }

    } catch (error) {
        next(errorHandler(`An error occurred while fetching blogs, ${error}`, 400))
    }
})



// Post Blog : POST API - 

export const postBlog = asyncHandler(async (req, res, next) => {

    const { blogTitle, blogCategory, blogImgFile, blogBody, user } = req.body


    if (!user.isAdmin) {
        return next(errorHandler('You can not create blog,Unauthorized user!', 401));
    }

    const slug = req.body.blogTitle.trim().toLowerCase().replace(/\s+/g, '-')

    const addBlogPost = new blogModel({
        blogTitle: blogTitle,
        blogCategory: blogCategory,
        blogImgFile: blogImgFile,
        blogBody: blogBody,
        userId: user._id,
        slug: slug
    })
    try {
        await addBlogPost.save();
        return res.status(200).json({
            success: true,
            message: 'Blog has been created',
            slug: slug,
            blog: addBlogPost
        })
    } catch (error) {
        next(errorHandler(error));
    }
})