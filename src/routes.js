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
  CancelAdmin,
  BonusReferal,
  UpdateUser,
  ListMenuTop,
  TopMarket,
  TopMarketCreate,
  TopProdukFood,
  TopProdukFoodCreate,
  Penjualan,
  PenjualanDetail,
  PeriksaChat,
  PeriksaChatSee,
  PeriksaChatDetail,
  ChatAdmin,
  ListBlokir,
  ListBlokirDriver,
  Slider,
  MappingOto,
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
      <PrivateRoute path="/cancel-admin" component={CancelAdmin} />
      <PrivateRoute path="/verification" component={Verification} />
      <PrivateRoute path="/bonus-referal" component={BonusReferal} />
      <PrivateRoute path="/update-user" component={UpdateUser} />
      <PrivateRoute
        path="/verification-details"
        component={VerificationDetails}
      />
      <PrivateRoute path="/list-menu-top" component={ListMenuTop} />
      <PrivateRoute path="/top-market" component={TopMarket} />
      <PrivateRoute path="/create-top-market" component={TopMarketCreate} />
      <PrivateRoute path="/edit-top-market" component={TopMarketCreate} />
      <PrivateRoute path="/top-product-food" component={TopProdukFood} />
      <PrivateRoute
        path="/create-top-product-food"
        component={TopProdukFoodCreate}
      />
      <PrivateRoute
        path="/edit-top-product-food"
        component={TopProdukFoodCreate}
      />
      <PrivateRoute path="/sales" component={Penjualan} />
      <PrivateRoute path="/detail-sales" component={PenjualanDetail} />
      <PrivateRoute path="/check-chat" component={PeriksaChat} />
      <PrivateRoute path="/see-check-chat" component={PeriksaChatSee} />
      <PrivateRoute path="/detail-check-chat" component={PeriksaChatDetail} />
      <PrivateRoute path="/chat-admin" component={ChatAdmin} />
      <PrivateRoute path="/list-block" component={ListBlokir} />
      <PrivateRoute path="/list-driver-block" component={ListBlokirDriver} />
      <PrivateRoute path="/sliders" component={Slider} />
      <PrivateRoute path="/mapping-oto" component={MappingOto} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
