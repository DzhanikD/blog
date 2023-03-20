import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './createSlice/articlesSlice';
import creatAndEditArticleSlice from './createSlice/creatAndEditArticleSlice';
import favoritesCountSlice from './createSlice/favoritesCountSlice';
import userSlice from './createSlice/userSlice';

const store = configureStore({
  reducer: {
    articleReducer: articlesSlice,
    creatAndEditReducer: creatAndEditArticleSlice,
    userReducer: userSlice,
    favoriteReducer: favoritesCountSlice,
  },
});

export default store;
