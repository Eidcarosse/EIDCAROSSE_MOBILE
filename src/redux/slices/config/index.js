import configSlice from "./slice";
export const configSliceReducer = configSlice.reducer;
export const { setAppLoader, setTopAds, setCategoryList,setShowViber,setShowWhatsapp } = configSlice.actions;
export const selectLoader = (state) => state.config.appLoader;
export const selectTopAds = (state) => state.config.topads;
export const selectCategoryList = (state) => state.config?.categoryList;
export const selectShowWhatsapp = (state) => state.config.showWhatsapp;
export const selectShowViber = (state) => state.config?.showViber;
