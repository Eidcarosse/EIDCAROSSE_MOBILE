import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appLoader: false,
  topads: [],
  categoryList: [],
  showWhatsapp: false,
  showViber: false,
  newChat:false
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setAppLoader: (state, action) => {
      state.appLoader = action.payload;
    },
    setTopAds: (state, action) => {
      state.topads = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setShowWhatsapp: (state, action) => {
      state.showWhatsapp = action.payload;
    },
    setShowViber: (state, action) => {
      state.showViber = action.payload;
    },
    setNewChat: (state, action) => {
      state.newChat = action.payload;
    },
  },
});

export default configSlice;
