/* eslint-disable eqeqeq */
import axios from "axios";

// export const baseUrl = "http://45.77.173.173:9299";
const type = localStorage.getItem("type");

const state = localStorage.getItem("state");

export const baseUrl =
  state == "dev"
    ? "http://45.77.173.173:9500"
    : state == "oto"
    ? "http://45.77.173.173:9299"
    : "https://api.juber.co.id:9300";
export const uuid = type == 0 ? "e4351a1d0579f6a0" : "6d871f1da174eddc";
export const baseRequest = axios.create({ baseURL: baseUrl });
export const uploadRequest = axios.create({ baseURL: "https://juber.co.id" });
export const socketHost = "http://116.193.191.172:8002";
export const socketHosts = axios.create({
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
      headers["irsauth"] =
        type == 0
          ? "0bed9ef79bed8f89ac13927fd170d66d"
          : "c759da1f4d18d01efb3ab9cb84794cbb";
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
