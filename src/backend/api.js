import { ApiManager } from "./ApiManager";

export const getDataofHomePage = async () => {
  try {
    const response = await ApiManager.get(`ad`);

    if (!response.success) {
      throw new Error("Network error home APi");
    }
    return response?.data?.ad;
  } catch (error) {
    alert("homw api");
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
