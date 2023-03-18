import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ServerRequest from '../services/serverRequest';

const serverRequest = new ServerRequest();

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page, { rejectWithValue }) => {
  try {
    const response = await serverRequest.getArticles(page);
    // console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (slug, { rejectWithValue }) => {
  try {
    const response = await serverRequest.getSingleArticle(slug);
    // console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    page: 1,
    singleArticle: [],
    articlesCount: 0,
    error: false,
    displayError: '',
  },

  reducers: {
    page(state, action) {
      state.page = action.payload;
    },
  },

  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.loading = false;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.displayError = action.payload;
    },

    [fetchSingleArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchSingleArticle.fulfilled]: (state, action) => {
      state.singleArticle = action.payload.article;
      state.loading = false;
    },
    [fetchSingleArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.displayError = action.payload;
    },
  },
});

export default articlesSlice.reducer;

export const { page } = articlesSlice.actions;
