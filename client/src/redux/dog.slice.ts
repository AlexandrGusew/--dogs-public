import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DogApiResponse } from '../types/api';

interface DogState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DogState = {
  imageUrl: null,
  loading: false,
  error: null,
};

export const fetchDogImage = createAsyncThunk(
  'dog/fetchImage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Failed to fetch dog image');
      }
      const data: DogApiResponse = await response.json();
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDogImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(fetchDogImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dogSlice.reducer;