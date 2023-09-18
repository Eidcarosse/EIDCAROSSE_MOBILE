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
      const response = await ApiManager.get("auth/getUserAds/6507d56c81bb6d6586d9cd11");
      if (!response.success) {
        throw new Error("Network error home APi");
      }
     return response.data;
    } catch (error) {
      alert("my own data ");
      return []; // or some default value as needed
    }
  };
 export { signupApi ,loginApi,getOwneAd};
