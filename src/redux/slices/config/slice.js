import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appLoader: false,
  topads: [],
  filter: {
    category: null,
    brand: null,
    model: null,
    maxPrice: null,
    minPrice: null,
    title: "",
  },
  appColor: {
    primary: "#FF0100",
    white: "#ffffff",
    black: "black",
    red: "red",
    transparent: "transparent",
    grey: "#E5E8E8",
    greybackground: "#EFEFEF",
  },
  categoryList: [],
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
  },
});

export default configSlice;
