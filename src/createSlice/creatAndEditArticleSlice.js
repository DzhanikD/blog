import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ServerRequest from '../services/serverRequest';

const serverRequest = new ServerRequest();

export const fetchCreatArticle = createAsyncThunk('article/fetchCreatArticle', async (obj, { rejectWithValue }) => {
  try {
    const response = await serverRequest.postCreateArticle(obj);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchEditArticle = createAsyncThunk('article/fetchEditArticle', async (obj, { rejectWithValue }) => {
  try {
    const response = await serverRequest.putEditArticle(obj);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchDeleteArticle = createAsyncThunk('article/fetchDeleteArticle', async (obj, { rejectWithValue }) => {
  try {
    const response = await serverRequest.deleteArticle(obj);
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const creatAndEditArticleSlice = createSlice({
  name: 'article',
  initialState: {
    loading: false,
    displayError: '',
    error: false,
    article: [],
    flagArticle: false,
    deleteArticle: false,
    editArticle: false,
  },

  reducers: {
    resetFlagArticle(state) {
      state.flagArticle = false;
    },
  },

  extraReducers: {
    [fetchCreatArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchCreatArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.flagArticle = true;
      state.article = action.payload.article;
    },
    [fetchEditArticle.rejected]: (state, action) => {
      state.loading = false;
      state.displayError = action.payload;
    },
    [fetchEditArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchEditArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.flagArticle = true;
      state.article = action.payload.article;
    },
    [fetchEditArticle.rejected]: (state, action) => {
      state.loading = false;
      state.displayError = action.payload;
    },
    [fetchDeleteArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchDeleteArticle.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchDeleteArticle.rejected]: (state, action) => {
      state.loading = false;
      state.displayError = action.payload;
    },
  },
});

export default creatAndEditArticleSlice.reducer;

export const { resetFlagArticle } = creatAndEditArticleSlice.actions;
