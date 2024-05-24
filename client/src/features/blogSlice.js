import { createSlice } from '@reduxjs/toolkit';



const blogSlice = createSlice({
    name: 'blogSlice',

    initialState: {
        isLoading: false,
        blogs: null,
        error: null
    },
    reducers: {
        addBlogStart: (state) => {
            state.isLoading = true;
        },
        addBlogSuccess: (state, action) => {
            state.blogs = action.payload;
            state.isLoading = false;
        },
        addBlogFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }

    }
});


export const { addBlogStart, addBlogSuccess, addBlogFailure } = blogSlice.actions;
export default blogSlice.reducer;
