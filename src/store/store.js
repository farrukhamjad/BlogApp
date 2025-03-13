import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import userProfileSlice from './userProfileSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        userProfile: userProfileSlice,
    }
});

export default store;