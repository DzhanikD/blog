import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './createSlice/articlesSlice';
import creatAndEditArticleSlice from './createSlice/creatAndEditArticleSlice';
import userSlice from './createSlice/userSlice';

const store = configureStore({
  reducer: {
    articleReducer: articlesSlice,
    creatAndEditReducer: creatAndEditArticleSlice,
    userReducer: userSlice,
  },
});

export default store;
