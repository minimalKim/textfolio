import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

type SignInFormData = {
  email: string;
  password: string;
};

export const signInUser = createAsyncThunk(`auth/signIn`, async (formData: SignInFormData) => {
  const uid = await api.signIn(formData);

  return uid;
});
