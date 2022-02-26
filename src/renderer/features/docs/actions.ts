import { createAsyncThunk } from '@reduxjs/toolkit';

import { Block } from '../../components/EditableBlock';
// eslint-disable-next-line import/no-cycle
import * as api from './api';

type UpdateUserDocData = {
  docId: string;
  blocks: Block[];
};

export const getUserDocs = createAsyncThunk(`docs/init`, async (uid: string) => {
  const userDocs = await api.getUserDocs(uid);
  return userDocs;
});

export const updateUserDoc = createAsyncThunk(`docs/update`, async ({ docId, blocks }: UpdateUserDocData) => {
  const updatedAt = await api.updateUserDoc({ docId, blocks });

  return { docId, updatedAt, blocks };
});

export const createUserDoc = createAsyncThunk(`docs/create`, async (uid: string) => {
  const newDocId = await api.createUserDoc(uid);
  return newDocId;
});
