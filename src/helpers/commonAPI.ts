import { appError } from "@/constants";
import API, { BASE_URL } from "@/constants/api.constant";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const axiosPOSTAPI = async (
  url: string,
  body: any,
  headers: any = {
    headers: {
      Authorization: Cookies.get("Authorization"),
      "Content-Type": "multipart/form-data",
    },
  }
) => {
  try {
    const response = await axios.post(url, body, headers);
    return response;
  } catch (error: any) {
    if (error.response.status === 401) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
      window.location.href = "/auth/login";
    } else {
      if(error.response.status !== 200){
        if(error.response?.data?.exception){
          toast.error(error.response?.data?.exc_type +"\n"+error.response?.data?.exception.split(":")[1])
        }
      }
      return error.response;
    }
  }
};

export const axiosPUTAPI = async (
  url: string,
  body: any,
  headers: any = {
    headers: {
      Authorization: Cookies.get("Authorization"),
      "Content-Type": "multipart/form-data",
    },
  }
) => {
  try {
    const response = await axios.put(url, body, headers);
    return response;
  } catch (error: any) {
    if (error.response.status === 401) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
      window.location.href = "/auth/login";
    } else {
      return error.response;
    }
  }
};
export const axiosGETAPI = async (
  url: string,
  headers: any = {
    headers: {
      Authorization: Cookies.get("Authorization")
    },
  }
) => {
  try {
    const response = await axios.get(url, headers);
    if (response.status === 401) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
      window.location.href = "/auth/login";
    }
    return response;
  } catch (error: any) {

    if (error.response.status === 401) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
      window.location.href = "/auth/login";
    } else {
      if(error.response.status !== 200){
        if(error.response?.data?.exception){
          toast.error(error.response?.data?.exc_type +"\n"+error.response?.data?.exception.split(":")[1])
        }
      }
      return error.response;
    }
  }
};

export async function dropdownList(txt: string, doctype: string,referenceDoctype:any=undefined,filter:any=undefined) {
  try {
    const url = `${BASE_URL}${API.SEARCH_DROPDOWN_LIST}`.toString();
    const httpOptions = {
      "Content-Type": "multipart/form-data",
      Authorization: Cookies.get("Authorization"),
    };
    const reqBody = {
      txt: txt,
      doctype: doctype,
      ignore_user_permissions: 0,
      reference_doctype:referenceDoctype,
      page_length: 20,
      filters:filter
    };

    const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
    if(response.status == 200){
      return response.data.message;
    }
    else{
      return []
    }
  } catch (error) {
    console.log(appError);
  }
}
