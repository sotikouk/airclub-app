import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../slices/uiSlice';

// Mock news data
const mockNews = [
    {
        id: 1,
        title: 'New Aircraft Added to Our Fleet',
        content: 'We are excited to announce the addition of a brand new Cessna 172 to our fleet. This aircraft features modern avionics and enhanced comfort for an improved flying experience.',
        imageUrl: 'https://source.unsplash.com/800x400/?airplane',
        publicationDate: '2023-06-15T10:00:00Z',
        author: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
        }
    },
    {
        id: 2,
        title: 'Summer Flying Courses Now Available',
        content: 'Registration is now open for our summer flying courses. Whether you\'re a beginner looking to get your pilot\'s license or an experienced pilot wanting to add new ratings, we have courses for all levels.',
        imageUrl: 'https://source.unsplash.com/800x400/?pilot',
        publicationDate: '2023-06-10T14:30:00Z',
        author: {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith'
        }
    },
    {
        id: 3,
        title: 'Aeroclub Annual Airshow Announced',
        content: 'Mark your calendars for our annual airshow on July 15th. This year\'s event will feature aerobatic displays, vintage aircraft, and activities for the whole family. Food and refreshments will be available.',
        imageUrl: 'https://source.unsplash.com/800x400/?airshow',
        publicationDate: '2023-06-05T09:15:00Z',
        author: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
        }
    }
];

const initialState = {
    news: mockNews,
    currentNews: null,
    isLoading: false,
    error: null,
};

// Mock async thunks
export const fetchAllNews = createAsyncThunk(
    'news/fetchAll',
    async (_, thunkAPI) => {
        try {
            // Mock API call
            return mockNews;
        } catch (error) {
            const message = error.message || 'Failed to fetch news';
            thunkAPI.dispatch(setMessage({ message, type: 'error' }));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchNewsById = createAsyncThunk(
    'news/fetchById',
    async (id, thunkAPI) => {
        try {
            // Mock API call
            const newsItem = mockNews.find(item => item.id === parseInt(id));
            if (!newsItem) {
                throw new Error('News not found');
            }
            return newsItem;
        } catch (error) {
            const message = error.message || 'Failed to fetch news';
            thunkAPI.dispatch(setMessage({ message, type: 'error' }));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        resetCurrentNews: (state) => {
            state.currentNews = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all news
            .addCase(fetchAllNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(fetchAllNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch news by ID
            .addCase(fetchNewsById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCurrentNews } = newsSlice.actions;
export default newsSlice.reducer;