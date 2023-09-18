import { BaseUrl } from "../utills/Constants";
import { ApiManager } from "./ApiManager";

export const getDataofHomePage = async () => {
  return fetch(BaseUrl+"ad/fetchTopAds", {
    method: "GET",
    credentials: "include",
  })
    .then(async (response) => {
      let data = await response.json();
      return data;
    })
    .catch((error) => {
      alert("home data api crashed")
      // Handle errors
      throw error; // Re-throw the error so that it can be caught by the caller
    });
};

export const getAllData = async () => {
  try {
    //https://eidcarossebe-dwxrg.ondigitalocean.app/ad/fetchTopAds
    const response = await ApiManager.get(`ad`);
    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data?.ad;
  } catch (error) {
    alert("all data api crashed");
    return []; // or some default value as needed
  }
};
export const getAllMyData = async () => {
  try {
    const response = await ApiManager.get(
      `auth/getUserAds/6502dfff6eac8c07ee077054`
    );
    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data?.adIds;
  } catch (error) {
    alert("all my data api");
    return []; // or some default value as needed
  }
};
export const getDataofAdByID = async (id) => {
  try {
    const response = await ApiManager.get("ad/getSpecific/"+id);
    if (!response.success) {
      throw new Error("Network error home APi");
    }
   return response.data;
  } catch (error) {
    alert("data by id");
    return []; // or some default value as needed
  }
};
export async function addPostAd(formData) {
  try {
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await fetch(
      BaseUrl+"ad/adPost",
      requestOptions
    );

    if (!response.ok) {
      // Handle non-OK responses here, if needed
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to handle it at a higher level if necessary
  }
}
