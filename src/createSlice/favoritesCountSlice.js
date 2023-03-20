import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ServerRequest from '../services/serverRequest';

const serverRequest = new ServerRequest();

export const fetchFavorite = createAsyncThunk('favorites/favoritesCountSlice', async (obj, { rejectWithValue }) => {
  try {
    const response = await serverRequest.postFavotiteCount(obj);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchDeleteFavorite = createAsyncThunk(
  'favorites/favoritesCountSlice',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await serverRequest.deleteFavoriteCount(obj);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesCountSlice = createSlice({
  name: 'favorites',
  initialState: {
    error: false,
    displayError: '',
  },

  reducers: {},

  extraReducers: {
    [fetchFavorite.rejected]: (state, action) => {
      state.error = true;
      state.displayError = action.payload;
    },

    [fetchDeleteFavorite.rejected]: (state, action) => {
      state.displayError = action.payload;
    },
  },
});

export default favoritesCountSlice.reducer;
