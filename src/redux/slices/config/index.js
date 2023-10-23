import configSlice from "./slice";
export const configSliceReducer = configSlice.reducer;
export const {
  setAppLoader,
  setTopAds,
  setBrandFilter,
  setCategoryFilter,
  setFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
  setModelFilter,
  setTitleFilter,
  setWhiteColor
} = configSlice.actions;
export const selectLoader = (state) => state.config.appLoader;
export const selectTopAds = (state) => state.config.topads;
export const selectFilter = (state) => state.config.filter;
export const selectBrandFilter = (state) => state.config.filter?.brand;
export const selectCategoryFilter = (state) => state.config.filter?.category;
export const selectMaxPriceFilter = (state) => state.config.filter?.maxPrice;
export const selectMinPriceFilter = (state) => state.config.filter?.minPrice;
export const selectModelFilter = (state) => state.config.filter?.model;
export const selectTitleFilter = (state) => state.config.filter?.title;
export const selectColors = (state) => state.config?.appColor;
