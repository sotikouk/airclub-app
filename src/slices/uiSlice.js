import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: null,
    messageType: null,
    isLoading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message;
            state.messageType = action.payload.type;
        },
        clearMessage: (state) => {
            state.message = null;
            state.messageType = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setMessage, clearMessage, setLoading } = uiSlice.actions;
export default uiSlice.reducer;