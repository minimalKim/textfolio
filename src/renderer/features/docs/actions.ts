import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';

export const getUserDocs = createAsyncThunk(`docs/init`, async (uid: string) => {
  const docs = await api.getUserDocs(uid);
  return docs;
});
