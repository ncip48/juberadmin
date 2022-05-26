/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { getToken, onMessageListener } from "./config/firebase";
import Routes from "./routes";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BridgeService } from "./services";
import { _fetch_nomsg } from "./redux/actions/global";
import chat_api, { getSocketApi } from "./api/websocket";
import { onMessage } from "firebase/messaging";
// import { toast as t } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.user);
  getToken(setTokenFound, setToken);

  console.log("tokenfound?", isTokenFound);

  const getList = async () => {
    // console.log("hit");
    let data = await chat_api({
      method: getSocketApi.chat.list_chat_user.method,
      url: getSocketApi.chat.list_chat_user.url,
      payload: {
        socket_nickname:
          user?.idrs == "JB3003" ? "JB3003_adminjuber" : "JB3097_adminjuber",
        is_user: false,
      },
    });
    console.log(data);
    const root = JSON.stringify(data.data);
    await localStorage.setItem("chat_data", root);
  };

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log("isi", payload);
      getList();
      // let notif = payload.notification;
      // t.info(`${notif.title}\n${notif.body}`, {
      //   position: t.POSITION.BOTTOM_CENTER,
      // });
    })
    .catch((err) => console.log("failed: ", err));

  const updateToken = async () => {
    await dispatch(
      _fetch_nomsg(
        BridgeService.JbMarket({
          key: "profile/update_token/new",
          method: "put",
          payload: JSON.stringify({
            id: user?.idrs,
            token,
          }),
        })
      )
    );
  };

  const registerChat = async () => {
    let idrs = user?.idrs;
    let namars = user?.namars;
    try {
      //untuk admin only
      if (!idrs) {
        throw new Error(`RegisterChat Undefined`);
      }
      await chat_api({
        method: getSocketApi.chat.register_chat.method,
        url: getSocketApi.chat.register_chat.url,
        payload: {
          id: idrs + "_adminjuber",
          name: idrs == "JB3003" ? "%iAdmin Herly%i" : "%i" + namars + "%i",
          token,
        },
      });
    } catch (error) {
      console.log("RegisterChat", error?.message);
    }
  };

  React.useEffect(() => {
    if (!token) return;
    updateToken();
    registerChat();
    localStorage.setItem("token", token);
    const state = localStorage.getItem("state");
    if (!state) {
      localStorage.setItem("state", "production");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={8000}
        autohide
        animation
        bg="warning"
        position="top-end"
        style={{
          position: "fixed",
          top: 80,
          right: 20,
          minWidth: 300,
          zIndex: 1,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-dark">{notification.body}</Toast.Body>
      </Toast>
      <Routes />
    </>
  );
};
export default App;
