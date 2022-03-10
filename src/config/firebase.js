import { getMessaging, getToken as T, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import "firebase/messaging";
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
} from "./constant";

var firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

export const getToken = (setTokenFound) => {
  return T(messaging, {
    vapidKey:
      "BH97plGjFleE6fvFuH_08jfyKG4GTXlZg4tdUcUAwwjOjL0xSPoKAdruBMhW0Qw9G6f7UvaL6yr1VyNbkUvjj8I",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
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
      resolve(payload);
    });
  });
