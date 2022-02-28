/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Block } from '../../components/EditableBlock';
// eslint-disable-next-line import/no-cycle
import { createUserDoc, deleteUserDoc, getUserDocs, updateUserDoc } from './actions';

export type DocsType = {
  docId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
};

type DocsState = {
  documents: DocsType[];
  getDocs: {
    error: string | null;
    isLoading: boolean;
  };
  createDoc: {
    newDocId: string | null;
    error: string | null;
    isLoading: boolean;
  };
  updateDoc: {
    error: string | null;
    isLoading: boolean;
  };
  deleteDoc: {
    error: string | null;
    isLoading: boolean;
  };
};

const initialState: DocsState = {
  documents: [
    {
      docId: '',
      userId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [
        {
          html: '',
          id: '',
          tag: '',
          isFocus: false,
        },
      ],
    },
  ],
  getDocs: {
    error: null,
    isLoading: false,
  },
  createDoc: {
    newDocId: null,
    error: null,
    isLoading: false,
  },
  updateDoc: {
    error: null,
    isLoading: false,
  },
  deleteDoc: {
    error: null,
    isLoading: false,
  },
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDocs.pending, (state) => {
      state.getDocs.isLoading = true;
    });
    builder.addCase(getUserDocs.fulfilled, (state, { payload: userDocs }) => {
      state.getDocs.isLoading = false;
      state.documents = userDocs;
    });
    builder.addCase(getUserDocs.rejected, (state, { error }) => {
      if (error.code) state.getDocs.error = error.code;
      state.getDocs.isLoading = false;
    });
    builder.addCase(createUserDoc.pending, (state) => {
      state.createDoc.isLoading = true;
    });
    builder.addCase(createUserDoc.fulfilled, (state, { payload }) => {
      state.documents = payload.newUserDocs;
      state.createDoc.newDocId = payload.newDocId;
      state.createDoc.isLoading = false;
    });
    builder.addCase(createUserDoc.rejected, (state, { error }) => {
      if (error.code) state.createDoc.error = error.code;
      state.createDoc.isLoading = false;
    });
    builder.addCase(updateUserDoc.pending, (state) => {
      state.updateDoc.isLoading = true;
    });
    builder.addCase(updateUserDoc.fulfilled, (state, { payload: updatedDoc }) => {
      const index = state.documents.map(({ docId }) => docId).indexOf(updatedDoc.docId);
      if (index !== -1) {
        state.documents[index].blocks = updatedDoc.blocks;
        state.documents[index].updatedAt = updatedDoc.updatedAt;
      }
      state.updateDoc.isLoading = false;
    });
    builder.addCase(updateUserDoc.rejected, (state, { error }) => {
      if (error.code) state.updateDoc.error = error.code;
      state.updateDoc.isLoading = false;
    });
    builder.addCase(deleteUserDoc.pending, (state) => {
      state.deleteDoc.isLoading = true;
    });
    builder.addCase(deleteUserDoc.fulfilled, (state, { payload: deletedDocId }) => {
      state.documents = state.documents.filter((document) => document.docId !== deletedDocId);
      state.deleteDoc.isLoading = false;
    });
    builder.addCase(deleteUserDoc.rejected, (state, { error }) => {
      if (error.code) state.deleteDoc.error = error.code;
      state.deleteDoc.isLoading = false;
    });
  },
});

export default docsSlice.reducer;
