import { generateHeaders, baseRequest } from "../config";

export default {
  async getSmsSwitch() {
    const config = await generateHeaders(["content-json"]);
    return baseRequest.post(
      "/apps/smsgwbypass",
      { key: "getSmsGwSwitchOpr" },
      config
    );
  },
  async setSmsSwitch(payload) {
    const config = await generateHeaders(["content-json"]);
    return baseRequest.post(
      "/apps/smsgwbypass",
      { ...payload, key: "setSmsGwSwitchOpr" },
      config
    );
  },
  async getSmsPrefix() {
    const config = await generateHeaders(["content-json"]);
    return baseRequest.post(
      "/apps/smsgwbypass",
      { key: "getSmsGwPrefix" },
      config
    );
  },
};
