import { getMessaging, getToken as T, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyAQ04xo9VnREHiCvLXDXJSLzad3BjYkq5I",
  authDomain: "juberdelivery-01.firebaseapp.com",
  projectId: "juberdelivery-01",
  storageBucket: "juberdelivery-01.appspot.com",
  messagingSenderId: "402879309111",
  appId: "1:402879309111:web:8755386e1673271056e6b2",
  measurementId: "G-R6BD59G7PL",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

export const getToken = (setTokenFound, token) => {
  return T(messaging, {
    vapidKey:
      "BNLH6nTs3DFoYOFIdw8NmqqnGrsdlMkBAhGbkA8RWbv8ikUXMcdLk4rRuYu4HpinfjJPDxjYh2xqIwGcji9GJXg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        token(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        token(null);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("from front", payload);
      resolve(payload);
    });
  });
