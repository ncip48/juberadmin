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
  async getInformasi(payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return baseRequest.post(
      "/apps/jbdelivery/post",
      { ...payload, uuid, key: "getallinfo" },
      config
    );
  },
  async deleteInformasi(payload) {
    const config = await generateHeaders([
      "irsauth",
      "content-json",
      "authorization",
    ]);
    return baseRequest.post(
      "/apps/jbdelivery/post",
      { ...payload, uuid, key: "deleteinfo" },
      config
    );
  },
  async editInformasi(payload) {
    const config = await generateHeaders([
      "authorization",
      "irsauth",
      "content-json",
    ]);
    return baseRequest.post(
      `/apps/jbdelivery/post`,
      { ...payload, uuid, key: "createinfo" },
      config
    );
  },
};
