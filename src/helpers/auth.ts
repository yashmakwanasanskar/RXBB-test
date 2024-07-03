import { appError } from "@/constants";
import { BASE_URL } from "@/constants/api.constant";
import axios from "axios";

export async function auth(endPoint: string, reqBody: any) {
  try {
    const url = `${BASE_URL}${endPoint}`.toString();
    const httpOptions = {
      "Content-Type": "multipart/form-data",
    };

    const response = await axios.post(url, reqBody, { headers: httpOptions });
    return response;
  } catch (error) {
    console.log(appError);
  }
}
