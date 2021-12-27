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
};
