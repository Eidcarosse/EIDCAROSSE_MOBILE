import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl } from "../utills/Constants";

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getDataofHomePage: builder.query({
      query: () => 'ad/fetchTopAds',
    }),
    getAllData: builder.query({
      query: (queryParams) => `ad/`,
    }),
    getAllDataByLocation: builder.query({
      query: (queryParams) => `ad/location`,
    }),
    getDataofAdByID: builder.query({
      query: (id) => `ad/getSpecific/${id}`,
    }),
    addPostAd: builder.mutation({
      query: (formData) => ({
        url: BaseUrl + 'ad/adPost',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    geVehicleMakes: builder.query({
      query: (type) => `ad/findVehicleMake/${type}`,
    }),
    geVehicleCategory: builder.query({
      query: (type) => `ad/findVehicleSubCategory/${type}`,
    }),
    getModel: builder.query({
      query: (type, value) => `ad/findModels/${type}/${value}`,
    }),
    deleteAdById: builder.mutation({
      query: (id) => `ad/deleteAd/${id}`,
      // Define other mutation options if needed
    }),
    toggleFavorite: builder.mutation({
      query: (id, userId) => `ad/setFavorite/${id}/${userId}`,
      // Define other mutation options if needed
    }),
    togglePublish: builder.mutation({
      query: (id) => `ad/muteAd/${id}`,
      // Define other mutation options if needed
    }),
    adView: builder.mutation({
      query: (adId) => `ad/addView?id=${adId}`,
      // Define other mutation options if needed
    }),
    refreshApi: builder.mutation({
      query: (id) => `ad/refreshAd/${id}`,
      // Define other mutation options if needed
    }),
    editAdApi: builder.mutation({
      query: (id, formData) => ({
        url: BaseUrl + `ad/edit-ad-mobile/${id}`,
        method: 'PATCH',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      // Define other mutation options if needed
    }),
    backEndDataAPi: builder.query({
      query: (data) => `ad/get-postAd-data/${data.cat}/${data.subcat}`,
    }),
  }),
});

export const {
  useGetDataofHomePageQuery,
  useGetAllDataQuery,
  useGetAllDataByLocationQuery,
  useGetDataofAdByIDQuery,
  useAddPostAdMutation,
  useGeVehicleMakesQuery,
  useGeVehicleCategoryQuery,
  useGetModelQuery,
  useDeleteAdByIdMutation,
  useToggleFavoriteMutation,
  useTogglePublishMutation,
  useAdViewMutation,
  useRefreshApiMutation,
  useEditAdApiMutation,
  useBackEndDataAPiQuery,
} = api;
