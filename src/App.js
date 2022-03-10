import React, { useState } from "react";
import { getToken, onMessageListener } from "./config/firebase";
import Routes from "./routes";
import { Toast } from "react-bootstrap";
// import { toast as t } from "react-toastify";

const App = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);
  getToken(setTokenFound);

  console.log("tokenfound?", isTokenFound);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log("isi", payload);
      // let notif = payload.notification;
      // t.info(`${notif.title}\n${notif.body}`, {
      //   position: t.POSITION.BOTTOM_CENTER,
      // });
    })
    .catch((err) => console.log("failed: ", err));

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
