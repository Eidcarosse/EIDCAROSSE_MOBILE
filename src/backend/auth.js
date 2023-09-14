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
   // console.log("in coming data in log in ",response);
    return response
    } catch (error) {
      errorMessage("Network error")
      console.log(error);
    }
  };
 export { signupApi ,loginApi};
