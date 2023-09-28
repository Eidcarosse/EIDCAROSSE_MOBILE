import { BaseUrl } from "../utills/Constants";
import { ApiManager } from "./ApiManager";

export const getDataofHomePage = async () => {
  return fetch(BaseUrl + "ad/fetchTopAds", {
    method: "GET",
    credentials: "include",
  })
    .then(async (response) => {
      let data = await response.json();
      return data?.data;
    })
    .catch((error) => {
      alert("home data api crashed");
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
    const response = await ApiManager.get("ad/getSpecific/" + id);
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
        "Content-Type": "multipart/form-data",
      },
    };
    const resp = await fetch(BaseUrl + "ad/adPost", requestOptions);
    let response = await resp.json();
    return response;
  } catch (error) {
    console.error("crashed", error);
    throw error; // Re-throw the error to handle it at a higher level if necessary
  }
}
export const geVehicleMakes = async (type) => {
  console.log("type", type);
  try {
    const response = await ApiManager.get(`ad/findVehicleMake/${type}`);
    // if (!response?.success) {
    //   throw new Error("Network error home APi");
    // }
    if (response?.data?.make) return response?.data?.make;
    return [];
  } catch (error) {
    alert("make company name");
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return []; // or some default value as needed
  }
};
////////////////////////////////////////////////
export const geVehicleCategory = async (type) => {
  console.log("type", type);
  try {
    const response = await ApiManager.get(`ad/findVehicleSubCategory/${type}`);
    if (!response?.success) {
      throw new Error("Network error home APi");
    }
    console.log('====================================');
    console.log("this",response?.data[0]?.category);
    console.log('====================================');
    if (response?.data[0]?.category) {
      return response?.data[0]?.category;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false; // or some default value as needed
  }
};
////////////////////////////////////////

// export const geVehicle = async (type) => {
//   console.log("type",type);
//   try {
//     const response = await ApiManager.get(
//       `ad/findVehicleMake/${type}`
//     );
//     if (!response?.success) {
//       throw new Error("Network error home APi");
//     }
//     console.log("ris",response?.data[0]?.make);
//     return response?.data[0]?.make;
//   } catch (error) {
//     alert("car api faild");
//     console.log('====================================');
//     console.log(error);
//     console.log('====================================');
//     return []; // or some default value as needed
//   }
// };

export const getModel = async (type, value) => {
  try {
    const response = await ApiManager.get(`ad//findModels/${type}/${value}`);
    if (response?.data[0]?.model) {
      return response?.data[0]?.model;
    }
    return false;
  } catch (error) {
    return false; // or some default value as needed
  }
};
export const deleteAdById = async (id) => {
  try {
    const response = await ApiManager.delete(`ad/deleteAd/${id}`);
    // if (!response.success) {
    //   throw new Error("Network error home APi");
    // }
    console.log("====================================");
    console.log("delete", response);
    console.log("====================================");
  } catch (error) {
    alert("delete api");
    return []; // or some default value as needed
  }
};
