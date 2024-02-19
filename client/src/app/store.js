import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';



const rootReducers = combineReducers({
    user: userSlice
})


const persistConfig = {

    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

