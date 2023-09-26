import { BaseUrl, BaseUrl1 } from "../utills/Constants";
import { errorMessage } from "../utills/Methods";
import { ApiManager } from "./ApiManager";

const signupApi = async (data) => {
    try {
      const response = await ApiManager.post("auth/register",data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response
    } catch (error) {
        errorMessage("Network error")
      console.error("Signup API crashed",error);
    }
  };
  const loginApi = async (data) => {
    try {
      const response = await ApiManager.post("auth", data ,{
        headers: {
          "Content-Type": "application/json",
        },
      });
    return response
    } catch (error) {
      errorMessage("Network error")
      console.log(error);
      return false
    }
  };
   const getOwneAd = async (id) => {
    try {
      const response = await ApiManager.get(`auth/getUserAds/${id}`);
      // if (!response.success) {
      //   throw new Error("Network error home APi");
      // }
     return response?.data?.adIds;
    } catch (error) {
      alert("my own data ");
      return []; // or some default value as needed
    }
  };
 async function updateProfile(id,formData) {
    try {
      const requestOptions = {
        method: "PUT",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const resp = await fetch(
        BaseUrl+`auth/userProfile/${id}`,
        requestOptions
      );
      let response=await resp.json()
      console.log(response);
       return response?.data?.userDetails;
    } catch (error) {
      console.error("crashed", error);
      throw error; // Re-throw the error to handle it at a higher level if necessary
    }
  }
  const getFavAds = async (id) => {
    try {
      const response = await ApiManager.get(`auth/getFavAds/${id}`);
      if (!response.success) {
        throw new Error("Network error home APi");
      }
     return response?.data;
    } catch (error) {
      alert("my own data ");
      return []; // or some default value as needed
    }
  };
 export { signupApi ,loginApi,getOwneAd,getFavAds,updateProfile};
