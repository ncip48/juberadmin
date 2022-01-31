import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

//Pages
import {
  SignIn,
  Dashboard,
  NotFound,
  CheckAccount,
  Broadcast,
  Informasi,
  InformasiCreate,
  InformasiEdit,
  UpdateVersi,
  Voucher,
  VoucherCreate,
  Pengaturan,
  PengaturanAllIn,
  BannerPromo,
  DriverManual,
  ListMenu,
  ListLokasi,
  ListLokasiMenu,
  MenuCreate,
  ListColor,
  AddColor,
  MonitorBroadcast,
  ForceSuccess,
  ForceCancel,
  Verification,
  VerificationDetails,
} from "./pages";
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
      <PrivateRoute path="/information" component={Informasi} />
      <PrivateRoute path="/create-information" component={InformasiCreate} />
      <PrivateRoute path="/edit-information" component={InformasiEdit} />
      <PrivateRoute path="/update-version" component={UpdateVersi} />
      <PrivateRoute path="/voucher" component={Voucher} />
      <PrivateRoute path="/create-voucher" component={VoucherCreate} />
      <PrivateRoute path="/setting" component={Pengaturan} />
      <PrivateRoute path="/setting-all-in" component={PengaturanAllIn} />
      <PrivateRoute path="/banner-promo" component={BannerPromo} />
      <PrivateRoute path="/driver-manual" component={DriverManual} />
      <PrivateRoute path="/list-menu" component={ListMenu} />
      <PrivateRoute path="/list-location" component={ListLokasi} />
      <PrivateRoute path="/list-locmenu" component={ListLokasiMenu} />
      <PrivateRoute path="/create-menu" component={MenuCreate} />
      <PrivateRoute path="/edit-menu" component={MenuCreate} />
      <PrivateRoute path="/list-color" component={ListColor} />
      <PrivateRoute path="/add-color" component={AddColor} />
      <PrivateRoute path="/monitor-broadcast" component={MonitorBroadcast} />
      <PrivateRoute path="/force-success" component={ForceSuccess} />
      <PrivateRoute path="/force-cancel" component={ForceCancel} />
      <PrivateRoute path="/verification" component={Verification} />
      <PrivateRoute
        path="/verification-details"
        component={VerificationDetails}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
