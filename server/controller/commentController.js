import commentModel from "../model/commentModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from 'express-async-handler';
import userModel from '../model/userModel.js';



// POST API : add comment - 

export const addComment = asyncHandler(async (req, res, next) => {

    const { userId, blogId, comment } = req.body;

    try {

        if (req.user.id !== userId) {
            return next('Unauthorized user!', 401);
        }

        const createComment = new commentModel({
            userId,
            blogId,
            comment
        });

        await createComment.save();

        return res.status(200).json({
            success: true,
            message: 'Comment has been added ',
            comment: createComment
        })

    } catch (error) {
        return next(error.message, 400);
    }
})


// GET API  : find user who comment -

export const getComment = asyncHandler(async (req, res, next) => {

    const { blogId } = req.params;

    try {

        const comments = await commentModel.find({ blogId });

        if (comments.length === 0 || !comments) {
            return next('No comments found !', 404);

        }
        return res.status(200).json(comments);
    } catch (error) {
        return next(error.message, 400);
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
