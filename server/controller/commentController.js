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




