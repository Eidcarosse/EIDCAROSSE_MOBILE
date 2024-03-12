import { ApiManager } from "./ApiManager";

export const getCategory = async () => {
  try {
    const response = await ApiManager.get("ad/get-types-list");
    return response.data || response;
  } catch (error) {
    console.error("Signup API crashed", error);
  }
};
