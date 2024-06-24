import commentModel from "../model/commentModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import userModel from '../model/userModel.js';



// POST API : add comment - 

export const addComment = asyncHandler(async (req, res, next) => {

    const { userId, blogId } = req.params;
    const { comment } = req.body;

    if (userId) {
        try {
            const addComment = new commentModel({
                comment,
                userId,
                blogId
            });
            await addComment.save();

            return res.status(200).json({
                success: true,
                message: 'Comment has been added',
                comment
            });
        } catch (error) {
            return next(errorHandler('An error occurred while adding comment!', 400));
        }
    }
})



// GET API : Get user comments -

export const getUserComments = asyncHandler(async (req, res, next) => {

    const { blogId } = req.params;
    try {
        const findComments = await commentModel.find({ blogId: blogId });

        if (!findComments) {
            return next(errorHandler('No comments found!', 400));
        } else {
            return res.status(200).json({
                success: true,
                message: 'Comment has been fetched',
                comment: findComments
            })
        }
    } catch (error) {
        return next(errorHandler('An error occurred while fetching comments', error, 500));
    }
})