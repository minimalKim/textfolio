/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Block } from '../../components/EditableBlock';
import { createUserDoc, getUserDocs, updateUserDoc } from './actions';

export type DocsType = { [key in string]: Block[] };

type DocsState = {
  documents: DocsType;
  getDocs: {
    error: string | null;
    isLoading: boolean;
  };
  createDoc: {
    newDocId: string;
    error: string | null;
    isLoading: boolean;
  };
  updateDoc: {
    error: string | null;
    isLoading: boolean;
  };
};

const initialState: DocsState = {
  documents: {
    docsWithId: [
      {
        html: '',
        id: '',
        tag: '',
        isFocus: false,
      },
    ],
  },
  getDocs: {
    error: null,
    isLoading: false,
  },
  createDoc: {
    newDocId: '',
    error: null,
    isLoading: false,
  },
  updateDoc: {
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
    builder.addCase(getUserDocs.fulfilled, (state, { payload }) => {
      state.getDocs.isLoading = false;
      state.documents = payload as DocsType;
    });
    builder.addCase(getUserDocs.rejected, (state, { error }) => {
      if (error.code) state.getDocs.error = error.code;
      state.getDocs.isLoading = false;
    });
    builder.addCase(createUserDoc.pending, (state) => {
      state.createDoc.isLoading = true;
    });
    builder.addCase(createUserDoc.fulfilled, (state, { payload: documentId }) => {
      state.createDoc.newDocId = documentId;
      state.createDoc.isLoading = false;
    });
    builder.addCase(createUserDoc.rejected, (state, { error }) => {
      if (error.code) state.getDocs.error = error.code;
      state.createDoc.isLoading = false;
    });
    builder.addCase(updateUserDoc.pending, (state) => {
      state.updateDoc.isLoading = true;
    });
    builder.addCase(updateUserDoc.fulfilled, (state, { payload }) => {
      state.documents = { ...state.documents, ...payload };
      state.updateDoc.isLoading = false;
    });
    builder.addCase(updateUserDoc.rejected, (state, { error }) => {
      if (error.code) state.getDocs.error = error.code;
      state.updateDoc.isLoading = false;
    });
  },
});

export default docsSlice.reducer;
