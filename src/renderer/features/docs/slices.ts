/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Block } from '../../components/EditableBlock';
import { getUserDocs } from './actions';

type DocsType = { [key in string]: Block[] };

type DocsState = {
  documents: DocsType;
  getDocs: {
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
  },
});

export default docsSlice.reducer;
