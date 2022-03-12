import axios from "axios";
import { generateHeaders, baseRequest, uuid } from "../config";

export default {
  async JbDelivery(payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return baseRequest.post(
      "/apps/jbdelivery/post",
      { ...payload, uuid },
      config
    );
  },
  async JbMarket(payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return baseRequest.post(
      "/apps/jbmarket/post",
      { ...payload, uuid },
      config
    );
  },
  async SocketAPI(url, payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return axios.post(
      `http://116.193.191.172:8002/${url}`,
      { ...payload, uuid },
      config
    );
  },
};
