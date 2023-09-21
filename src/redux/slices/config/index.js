import configSlice from './slice';
export const configSliceReducer = configSlice.reducer;
export const {setAppLoader,setTopAds} = configSlice.actions;
export const selectLoader = (state) => state.config.appLoader;
export const selectTopAds = (state) => state.config.topads;
