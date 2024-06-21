import commentModel from "../model/commentModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import userModel from '../model/userModel.js';



// POST API : add comment - 

export const addComment = asyncHandler(async (req, res, next) => {

    const { comment } = req.body;
    const { userId, blogId } = req.params;

    try {
        const user = await userModel.findById({ _id: userId });
        const databaseUserId = user._id.toString();

        if (userId !== databaseUserId) {
            return next(errorHandler('You are not authorized, Id did not match!', 401));
        }

        const addComment = new commentModel({
            comment: comment,
            blogId: blogId,
            userId: userId
        })

        const saveComment = await addComment.save();

        if (saveComment) {
            return res.status(200).json({
                success: true,
                message: 'Comment has been added',
                comment: comment
            })
        }
    } catch (error) {
        next(errorHandler('An unexpected error occurred!', error, 400));
    }
})



// GET API : Get user comments -

export const getUserComments = asyncHandler(async (req, res, next) => {
    try {
        const getAllComments = await commentModel.find({});

        return res.status(200).json({
            success: true,
            comments: getAllComments
        })

    } catch (error) {
        return next(errorHandler('An unexpected error occured while fetching comment!', 400));
    }
});




