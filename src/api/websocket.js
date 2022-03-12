import { socketHost } from "../config";

const helper = async (params) => {
  const { url, method, payload } = params;
  try {
    let body = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    let data = await getRequest(body, url);
    return formatRespond(data);
  } catch (error) {
    console.log(`%c API Error : ${error.message}`, "color:red;");
    return getRespond(false, error.message, []);
  }
};

const getRespond = (success, msg, data) => {
  return {
    success,
    msg,
    data,
  };
};

const getRequest = async (body, url) => {
  let data = await fetch(url, body)
    .then((res) => res.json())
    .catch((err) => {
      console.log(
        `%c API Error: Reason ~> %c ${err.message}`,
        "color:red;",
        "color:green"
      );
      return {
        data: {
          code: 500,
          lobj: [],
          msg: err,
        },
      };
    });
  return data;
};

const formatRespond = (data) => {
  if (data.success) {
    return getRespond(true, data.msg, data.data);
  } else {
    console.log(
      `%c API Error: Reason ~> %c ${data.msg}`,
      "color:red;",
      "color:green"
    );
    return getRespond(false, data.msg, data.data);
  }
};

export const getSocketApi = {
  chat: {
    detail_chat: {
      url: `${socketHost}/v2/chat`,
      examplePayload: {
        idrs: "xxxx",
        senderIdrs: "xxx",
        isUser: true,
      },
      method: "POST",
    },
    detail_chat_visible: {
      url: `${socketHost}/v2/chat/visible`,
      examplePayload: {
        idrs: "xxxx",
        senderIdrs: "xxx",
        isUser: true,
      },
      method: "POST",
    },
    remove_history: {
      url: `${socketHost}/v2/chat/admin/delete`,
      examplePayload: {
        idrs: "xxxx",
        senderIdrs: "xxx",
        isUser: true,
      },
      method: "POST",
    },
    register_chat: {
      url: `${socketHost}/v2/socket/register`,
      examplePayload: {
        id: "xxxx",
        name: "xxx",
        token: "xxx",
      },
      method: "POST",
    },
    list_chat_admin: {
      url: `${socketHost}/v2/chat/admin`,
      examplePayload: {
        have_admin: false,
        page: 1,
      },
      method: "POST",
    },
    list_chat_user: {
      url: `${socketHost}/v2/chat/history`,
      examplePayload: {
        socket_nickname: "xxx",
        is_user: false,
      },
      method: "POST",
    },
  },
};

export default helper;
