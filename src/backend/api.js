import { BaseUrl } from "../utills/Constants";
import { ApiManager } from "./ApiManager";

export const getDataofHomePage = async () => {
  return fetch(BaseUrl+"ad/fetchTopAds", {
    method: "GET",
    credentials: "include",
  })
    .then(async (response) => {
      let data = await response.json();
      return data?.data;
    })
    .catch((error) => {
      alert("home data api crashed")
      // Handle errors
      throw error; // Re-throw the error so that it can be caught by the caller
    });
};

export const getAllData = async () => {
  try {
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
export const getDataofAdByID = async (id) => {
  try {
    const response = await ApiManager.get("ad/getSpecific/"+id);
    if (!response.success) {
      throw new Error("Network error home APi");
    }
   return response.data;
  } catch (error) {
    alert("data by id");
    console.log(error);
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
    const resp = await fetch(
      BaseUrl+"ad/adPost",
      requestOptions
    );
    let response=await resp.json()
    return response;
  } catch (error) {
    console.error("crashed", error);
    throw error; // Re-throw the error to handle it at a higher level if necessary
  }
}
export const getCarData = async () => {
  try {
    const response = await ApiManager.get(
      `ad/allCars`
    );
    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data;
  } catch (error) {
    alert("car api");
    return []; // or some default value as needed
  }
};
export const getCarModel= async (value) => {
  try {
    const response = await ApiManager.get(
      `ad/findModels/${value}`
    );
    if (!response.success) {
      throw new Error("Network error home APi");
    }
return response?.data[0].model
  } catch (error) {
    alert("model api");
    return []; // or some default value as needed
  }
};
export const deleteAdById= async (id) => {
  try {
    const response = await ApiManager.delete(
      `ad/deleteAd/${id}`
    );
    // if (!response.success) {
    //   throw new Error("Network error home APi");
    // }
    console.log('====================================');
    console.log("delete",response);
    console.log('====================================');

  } catch (error) {
    alert("model api");
    return []; // or some default value as needed
  }
};