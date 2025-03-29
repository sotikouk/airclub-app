import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Async thunk for registration
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            // Mock successful registration
            // Replace with actual API call
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ data: { user: userData, token: 'mock-token' } }), 1000)
            );
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;