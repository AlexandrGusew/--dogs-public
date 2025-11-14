import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CatApiResponse } from '../types/api';

interface CatState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CatState = {
  imageUrl: null,
  loading: false,
  error: null,
};

export const fetchCatImage = createAsyncThunk(
  'cat/fetchImage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?size=full'
      );
      if (!response.ok) {
        throw new Error('Походу кошак съипался');
      }
      const data: CatApiResponse[] = await response.json();
      return data[0].url;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Хер знат что случилось'
      );
    }
  }
);
const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCatImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.imageUrl = action.payload;
        }
      )
      .addCase(fetchCatImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default catSlice.reducer;
