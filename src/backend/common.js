import { BaseUrl } from "../utills/Constants";
import { errorMessage } from "../utills/Methods";
import { ApiManager } from "./ApiManager";

export const getCategory = async () => {
  try {
    const response = await ApiManager.get("ad/get-types-list");
    return response.data;
  } catch (error) {
    errorMessage("Network error");
    console.error("Signup API crashed", error);
  }
};
