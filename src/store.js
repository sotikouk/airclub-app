// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/slices/authSlice'; // Ensure this path is correct

const store = configureStore({
    reducer: {
        auth: authReducer, // Ensure 'auth' is the key used in useSelector
    },
});

export default store;