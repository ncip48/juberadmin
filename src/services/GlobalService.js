import { baseRequest, generateHeaders, uploadRequest, uuid } from "../config";

export default {
  async uploadFoto(payload) {
    const config = await generateHeaders(["content-formdata"]);

    var formData = new FormData();
    formData.append("file", payload, payload?.name);

    return uploadRequest.post(`/storage/api/upload`, formData, config);
  },

  async deleteFoto(payload) {
    const config = await generateHeaders(["content-formdata"]);

    var formData = new FormData();
    formData.append("image", payload);

    return uploadRequest.post(`/storage/api/delete_image`, formData, config);
  },

  async getSubmenu(payload) {
    const config = await generateHeaders([
      "authorization",
      "irsauth",
      "content-json",
    ]);
    return baseRequest.post(
      `/apps/jbdelivery/post`,
      { ...payload, uuid, key: "admingetsubmenu" },
      config
    );
  },
};
