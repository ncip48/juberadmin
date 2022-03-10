import React, { useState } from "react";
import { getToken, onMessageListener } from "./config/firebase";
import Routes from "./routes";

const App = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  console.log("tokenfound?", isTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return <Routes />;
};
export default App;
