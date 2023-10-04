import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  userMeta: null,
  myAds:[],
  myFav:[],
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
    setUserAds:(state, action) => {
      state.myAds = action.payload;
    },
    setAdsFav:(state, action) => {
      state.myFav = action.payload;
    },
  },
});

export default userSlice;