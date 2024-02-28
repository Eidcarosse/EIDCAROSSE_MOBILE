import configSlice from "./slice";
export const configSliceReducer = configSlice.reducer;
export const {
  setAppLoader,
  setTopAds,
  setCategoryList,
  setShowViber,
  setShowWhatsapp,
  setNewChat,
  setNetworkLoader
} = configSlice.actions;
export const selectLoader = (state) => state.config.appLoader;
export const selectNetworkLoader = (state) => state.config.networkLoder;
export const selectTopAds = (state) => state.config.topads;
export const selectCategoryList = (state) => state.config?.categoryList;
export const selectShowWhatsapp = (state) => state.config.showWhatsapp;
export const selectShowViber = (state) => state.config?.showViber;
export const selectNewChat = (state) => state.config?.newChat;
