import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({

    initialState: {
        user: null,
        error: null,
        loading: false
    },
    name: 'userAuth',

    reducers: {

        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;