import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

//Pages
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/home" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
