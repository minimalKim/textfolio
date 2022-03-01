/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { signInUser, signOutUser, signUpUser } from './actions';

type User = {
  uid: string;
  username: string;
  email: string;
  avatar: string;
};

type SignState = {
  error: string | null;
  isLoading: boolean;
};

type AuthState = {
  user: User | null;
  signIn: SignState;
  signUp: SignState;
  signOut: SignState;
};

const initialState: AuthState = {
  user: null,
  signIn: {
    error: null,
    isLoading: false,
  },
  signUp: {
    error: null,
    isLoading: false,
  },
  signOut: {
    error: null,
    isLoading: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.signIn.isLoading = true;
    });
    builder.addCase(signInUser.fulfilled, (state) => {
      state.signIn.isLoading = false;
    });
    builder.addCase(signInUser.rejected, (state, { error }) => {
      if (error.code) state.signIn.error = error.code;
      state.signIn.isLoading = false;
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.signUp.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.signUp.isLoading = false;
    });
    builder.addCase(signUpUser.rejected, (state, { error }) => {
      if (error.code) state.signUp.error = error.code;
      state.signUp.isLoading = false;
    });
    builder.addCase(signOutUser.pending, (state) => {
      state.signOut.isLoading = true;
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.signOut.isLoading = false;
    });
    builder.addCase(signOutUser.rejected, (state, { error }) => {
      if (error.code) state.signOut.error = error.code;
      state.signOut.isLoading = false;
    });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
