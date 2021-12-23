import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

//Pages
import { SignIn, Dashboard, NotFound, CheckAccount, Broadcast } from "./pages";
import { LoginRoute } from "./components/LoginRoute";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute exact path="/login" component={SignIn} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/home" component={Dashboard} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/check-account" component={CheckAccount} />
      <PrivateRoute path="/broadcast" component={Broadcast} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
