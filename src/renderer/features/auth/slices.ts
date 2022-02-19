/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { signInUser } from './actions';

// type User = {
//   uid: string;
//   username: string;
//   email: string;
//   avatar: string;
// };

type SignIn = {
  error: string | null;
  isLoading: boolean;
};

type AuthState = {
  user: string | null;
  signIn: SignIn;
};

const initialState: AuthState = {
  user: null,
  signIn: {
    error: null,
    isLoading: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.signIn.isLoading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.signIn.isLoading = false;
    });
    builder.addCase(signInUser.rejected, (state, { error }) => {
      if (error.code) state.signIn.error = error.code;
      state.signIn.isLoading = false;
    });
  },
});

export default authSlice.reducer;
