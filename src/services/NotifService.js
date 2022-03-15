import { generateHeaders, socketHosts } from "../config";

export default {
  async broadcastTopic(payload) {
    const config = await generateHeaders(["content-json"]);

    return socketHosts.post(`/notif/topic`, { ...payload }, config);
  },
  async broadcast(payload) {
    const config = await generateHeaders(["content-json"]);

    return socketHosts.post(`/notif`, { ...payload }, config);
  },
};
