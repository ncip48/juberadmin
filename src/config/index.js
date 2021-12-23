import axios from "axios";

export const baseUrl = "http://45.77.173.173:9299";
export const uuid = "e4351a1d0579f6a0";
export const baseRequest = axios.create({ baseURL: baseUrl });
export const uploadRequest = axios.create({ baseURL: "https://juber.co.id" });
export const socketHost = axios.create({
  baseURL: "http://116.193.191.172:8002",
});

export const generateHeaders = async (types) => {
  try {
    let headers = {};

    if (types.includes("content-json")) {
      headers["Content-Type"] = "application/json";
    }
    if (types.includes("content-urlencoded")) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (types.includes("content-formdata")) {
      headers["Content-Type"] = "multipart/form-data";
    }
    if (types.includes("authorization")) {
      const persist = await localStorage.getItem("user");
      const auth = JSON.parse(persist);
      headers["Authorization"] = "Bearer " + auth.auth.token;
    }
    if (types.includes("irsauth")) {
      headers["irsauth"] = "0bed9ef79bed8f89ac13927fd170d66d";
    }

    if (types.includes("irsauth_header")) {
      headers["Access-Control-Allow-Headers"] = "irsauth";
    }

    return { headers };
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e));
  }
};
