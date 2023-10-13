// languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentLanguage: "en",
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export default languageSlice;
