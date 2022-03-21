/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type NetworkState = { isOnline: boolean };

const initialState: NetworkState = { isOnline: true };

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    updateNetworkConnection: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { updateNetworkConnection } = networkSlice.actions;
export default networkSlice.reducer;
