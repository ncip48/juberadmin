import { generateHeaders, baseRequest, uuid } from "../config";

export default {
  async loginOtp(payload) {
    const config = await generateHeaders([
      "irsauth",
      "irsauth_header",
      "content-json",
    ]);
    return baseRequest.post(
      "/apps/users/loginotp",
      { ...payload, uuid },
      config
    );
  },
  async verifyRegisterOtp(payload) {
    const config = await generateHeaders(["irsauth", "content-json"]);
    return baseRequest.post(
      "/apps/users/verifyregotp",
      { ...payload, uuid },
      config
    );
  },
  async logout() {
    const config = await generateHeaders([
      "authorization",
      "irsauth",
      "content-json",
    ]);
    return baseRequest.post("/apps/users/logoutjb", { uuid }, config);
  },
};
