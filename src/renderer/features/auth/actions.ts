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
