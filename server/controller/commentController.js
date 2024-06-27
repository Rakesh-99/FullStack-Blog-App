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


// GET API  : find user who comment -

export const getUserComments = asyncHandler(async (req, res, next) => {
    const { blogId } = req.params;

    try {
        const findComment = await commentModel.find({ blogId: req.params.blogId });


        if (!findComment) {
            return next('No comment found!', 400);
        }

        return res.status(200).json({
            findComment
        })

    } catch (error) {
        return next('An unexpected error occurred!', 400);
    }
})


// PUT API  : Add and remove like - 

export const likeTheComment = asyncHandler(async (req, res, next) => {

    const { commentId } = req.params;
    const { user } = req.body;


    const comment = await commentModel.findById(commentId);

    if (!comment) {
        return next('Comment not found !', 404);
    }

    const userIndex = comment.likes.indexOf(user);

    if (userIndex === -1) {
        comment.likes.push(user);
        comment.numberOfLikes += 1;
    } else {
        comment.likes.splice(userIndex, 1);
        comment.numberOfLikes -= 1;
    }

    await comment.save();

    return res.status(200).json(comment);
});



// DELETE API : Delete comment : 

export const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId, userId } = req.params;

    try {

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return next('Comment not found!', 404);
        }

        await commentModel.findByIdAndDelete({ _id: commentId }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Comment has been deleted',

        })
    } catch (error) {
        return next('An unexpected error occurred!', error, 500);
    }
})
