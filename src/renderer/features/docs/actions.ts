import { createAsyncThunk } from '@reduxjs/toolkit';

import { Block } from '../../components/EditableBlock';
import * as api from './api';

type UpdateUserDocData = { uid: string; userBlocks: { [key in string]: Block[] } };

export const getUserDocs = createAsyncThunk(`docs/init`, async (uid: string) => {
  const docs = await api.getUserDocs(uid);
  return docs;
});

export const updateUserDoc = createAsyncThunk(`docs/update`, ({ uid, userBlocks }: UpdateUserDocData) => {
  api.updateUserDoc({ uid, userBlocks });
  return userBlocks;
});

export const createUserDoc = createAsyncThunk(`docs/create`, async (uid: string) => {
  const newDocId = await api.createUserDoc(uid);
  return newDocId;
});
