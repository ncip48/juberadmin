import { generateHeaders, baseRequest, uuid } from "../config";

export default {
  async createInformasi(payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return baseRequest.post(
      "/apps/jbdelivery/post",
      { ...payload, uuid, key: "createinfo" },
      config
    );
  },
};
