import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';

type SignInFormData = {
  email: string;
  password: string;
};

type SignUpFormData = SignInFormData & {
  username: string;
  avatar: string;
};

export const signInUser = createAsyncThunk(`auth/signIn`, async (formData: SignInFormData) => {
  const uid = await api.signIn(formData);

  return uid;
});

export const signUpUser = createAsyncThunk(`auth/signUp`, (formData: SignUpFormData) => {
  api.signUp(formData);
});

export const listenToAuthChanges = createAsyncThunk(`auth/on`, () => {
  api.onAuthStateChanges(async (user) => {
    if (user) {
      // signed in
      const userProfile = await api.getUserProfile(user.uid);
      return userProfile;
    }
    // signed out
    return null;
  });
});
