import { generateHeaders, socketHost } from "../config";

export default {
  async broadcastTopic(payload) {
    const config = await generateHeaders(["content-json"]);

    return socketHost.post(`/notif/topic`, { ...payload }, config);
  },
};
