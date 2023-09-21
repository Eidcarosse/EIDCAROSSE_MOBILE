import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoader:false,
  topads:[]
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAppLoader: (state, action) => {
      state.appLoader = action.payload
  },
  setTopAds: (state, action) => {
    state.topads = action.payload
},
  },
});

export default configSlice;