import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ServerRequest from '../services/serverRequest';

const serverRequest = new ServerRequest();

export const fetchRegistrUser = createAsyncThunk('user/fetchRegistrUser', async (body, { rejectWithValue }) => {
  try {
    const response = await serverRequest.postNewUser(body);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetCurrentUser = createAsyncThunk('user/fetchGetCurrentUser', async (token, { rejectWithValue }) => {
  try {
    const response = await serverRequest.getCurrentUser(token);
    return response;
  } catch (error) {
    // console.log(error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchLoginUser = createAsyncThunk('user/fetchLoginUser', async (body, { rejectWithValue }) => {
  try {
    const response = await serverRequest.postLoginUser(body);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (objForRequestPut, { rejectWithValue }) => {
    try {
      const response = await serverRequest.putResource(objForRequestPut);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: false,
    serverErrorMessages: {},
    token: '',
    authorized: false,
    userProfile: [],
    updateUser: false,
    displayError: '',
  },

  reducers: {
    clearError(state) {
      state.serverErrorMessages = {};
    },

    logOut(state) {
      state.authorized = false;
    },
    resetUpdateUser(state) {
      state.updateUser = false;
    },
  },
  extraReducers: {
    [fetchRegistrUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchRegistrUser.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.serverErrorMessages = action.payload.errors;
        state.loading = false;
      } else {
        state.token = action.payload.user.token;
        state.loading = false;
        localStorage.setItem('userToken', action.payload.user.token);
        state.authorized = true;
        state.userProfile = action.payload.user;
      }
    },
    [fetchRegistrUser.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.displayError = action.payload;
    },
    [fetchGetCurrentUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetCurrentUser.fulfilled]: (state, action) => {
      state.userProfile = action.payload.user;
      state.updateUser = false;
      state.loading = false;
      state.authorized = true;
      state.token = action.payload.user.token;
    },
    [fetchGetCurrentUser.rejected]: (state, action) => {
      if (action.payload === '401') {
        localStorage.removeItem('userToken');
        console.log(` вот ${action.payload}`);
        state.loading = false;
      } else {
        state.displayError = action.payload;
        state.loading = false;
        state.error = true;
      }
    },
    [fetchLoginUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.serverErrorMessages = action.payload.errors;
        state.loading = false;
      } else {
        state.token = action.payload.user.token;
        localStorage.setItem('userToken', action.payload.user.token);
        state.userProfile = action.payload.user;
        state.authorized = true;
        state.loading = false;
      }
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.displayError = action.payload;
    },

    [fetchUpdateUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.serverErrorMessages = action.payload.errors;
        state.loading = false;
      } else {
        state.userProfile = action.payload.user;
        state.updateUser = true;
        state.loading = false;
      }
    },
    [fetchUpdateUser.rejected]: (state, action) => {
      state.displayError = action.payload;
      state.loading = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;

export const { clearError, authorizedUser, logOut, oneAuthorized } = userSlice.actions;
