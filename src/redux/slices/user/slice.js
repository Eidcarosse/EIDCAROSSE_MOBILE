import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: true,
  userMeta: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMeta: (state, action) => {
      state.userMeta = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default userSlice;