import { ApiManager } from "./ApiManager";

export const getDataofHomePage = async () => {
  try {
    //https://eidcarossebe-dwxrg.ondigitalocean.app/ad/fetchTopAds
    const response = await ApiManager.get(`ad/fetchTopAds`);
    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data;
  } catch (error) {
    alert("homw api");
    return []; // or some default value as needed
  }
};
export const getAllData = async () => {
  try {
    //https://eidcarossebe-dwxrg.ondigitalocean.app/ad/fetchTopAds
    const response = await ApiManager.get(`ad`);
   // console.log("all data",response.data.ad);
    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data?.ad;
  } catch (error) {
    alert("all data api");
    return []; // or some default value as needed
  }
};
export const addPostAd = async (data) => {
  try {
    const response = await ApiManager.post("ad/adPost", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response of adpost", response);
  } catch (error) {
    alert("ad post api");
    return []; // or some default value as needed
  }
};
