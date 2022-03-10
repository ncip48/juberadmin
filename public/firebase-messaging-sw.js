/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAQ04xo9VnREHiCvLXDXJSLzad3BjYkq5I",
  authDomain: "juberdelivery-01.firebaseapp.com",
  projectId: "juberdelivery-01",
  storageBucket: "juberdelivery-01.appspot.com",
  messagingSenderId: "402879309111",
  appId: "1:402879309111:web:8755386e1673271056e6b2",
  measurementId: "G-R6BD59G7PL",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
