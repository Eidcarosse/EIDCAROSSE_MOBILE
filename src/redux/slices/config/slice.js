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
    title:''
  },
  appColor:{
    primary:'#FF0100',
    white: '#ffffff',
    black: 'black',
    red: 'red',
    transparent:'transparent',
    grey:'#E5E8E8',
    greybackground:'#EFEFEF'
  }
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filter.category = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.filter.brand = action.payload;
    },
    setModelFilter: (state, action) => {
      state.filter.model = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.filter.maxPrice = action.payload;
    },
    setMinPriceFilter: (state, action) => {
      state.filter.minPrice = action.payload;
    },
    setTitleFilter: (state, action) => {
      state.filter.title = action.payload;
    },
    setWhiteColor: (state, action) => {
      state.appColor.white = action.payload;
    },
  },
});

export default configSlice;
