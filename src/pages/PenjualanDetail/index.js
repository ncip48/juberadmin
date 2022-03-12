/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { decipher, formatDate, formatRupiah } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

const BoxUser = ({ name, type, photo }) => {
  return (
    <div className="card card-topline-red">
      <div className="card-head card-topline-red text-center">
        <header>{type}</header>
      </div>
      <div className="card-body no-padding height-9">
        <div className="row">
          <div className="profile-userpic">
            <img
              src={
                photo === null || photo === ""
                  ? "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
                  : photo
              }
              className="img-responsive"
              style={{ width: 100, height: 100, objectFit: "contain" }}
              alt=""
            />{" "}
          </div>
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name"> {name} </div>
        </div>
        {/* <ul className="list-group list-group-unbordered">
          <li className="list-group-item">
            <b>Followers</b> <a className="pull-right">1,200</a>
          </li>
          <li className="list-group-item">
            <b>Following</b> <a className="pull-right">750</a>
          </li>
          <li className="list-group-item">
            <b>Friends</b> <a className="pull-right">11,172</a>
          </li>
        </ul>
        <div className="profile-userbuttons">
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-primary"
          >
            Follow
          </button>
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-pink"
          >
            Message
          </button>
        </div> */}
      </div>
    </div>
  );
};

function PenjualanDetail() {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const dec = decipher("akuimuet");
  let prevData = JSON.parse(dec(id));

  // console.log(dec(id));

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "order",
          method: "get",
          payload: JSON.stringify({ id: prevData.id }),
        })
      )
    );
    // console.log(res.data);
    setResult(res?.data?.data);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="penjualan" />
          <Content>
            <PageHeading title="Detail Penjualan" />
            <div className="row">
              <div className="col-md-12">
                <div className="profile-sidebar">
                  <BoxUser
                    type="Penjual"
                    name={prevData.store.store_name}
                    photo={prevData.store.picture}
                  />
                  <BoxUser
                    type="Pembeli"
                    name={prevData.profile.name}
                    photo={prevData.profile.profile_picture}
                  />
                </div>
                <div className="profile-content">
                  <div className="row">
                    <div className="white-box" style={{ marginTop: 0 }}>
                      <div className="tab-content">
                        <div
                          className="tab-pane active fontawesome-demo"
                          id="tab1"
                        >
                          <div id="biography">
                            <h4 className="font-bold">Produk</h4>
                            <hr />
                            <div className="full-width">
                              <ul className="activity-list">
                                {prevData?.body?.map((i, index) => {
                                  return (
                                    <li
                                      key={index}
                                      style={{
                                        paddingBottom: 0,
                                        marginBottom: 15,
                                      }}
                                    >
                                      <div className="avatar">
                                        <img src={i.item.picture} alt="" />
                                      </div>
                                      <div className="activity-desk">
                                        <h5
                                          className="d-flex justify-content-between"
                                          style={{
                                            marginBottom: 0,
                                            marginTop: 0,
                                          }}
                                        >
                                          <a>{i.item.name}</a>
                                          Variasi {i.variant_name}
                                        </h5>
                                        <p className="text-muted text-right">
                                          x{i.qty}
                                        </p>
                                        <h5 className="font-weight-bold text-right">
                                          {formatRupiah(i.sub_total / i.qty)}
                                        </h5>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <br />
                            <h4 className="font-bold">Rincian Pesanan</h4>
                            <hr />
                            <div className="row">
                              <div className="col-md-3">Subtotal Produk</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                Subtotal Pengiriman:
                              </div>
                              <div className="col-md-9">
                                {formatRupiah(result?.head?.shipment_fee ?? 0)}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                Subtotal Diskon Pengiriman:
                              </div>
                              <div className="col-md-8">Rp. 0</div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                Voucher Juber Digunakan:
                              </div>
                              <div className="col-md-8">Rp. 0</div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">Biaya Penanganan:</div>
                              <div className="col-md-8">
                                {formatRupiah(1000)}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 font-weight-bold">
                                Total Pesanan:
                              </div>
                              <div className="col-md-8 font-weight-bold">
                                {formatRupiah(
                                  Number(result?.head?.total_payment ?? 0) +
                                    Number(1000)
                                )}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-md-4 font-weight-bold">
                                Metode Pembayaran:
                              </div>
                              <div className="col-md-8 font-weight-bold">
                                JuberPay
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-md-4 font-weight-bold">
                                No Pesanan:
                              </div>
                              <div className="col-md-8 font-weight-bold">
                                {result?.head?.transaction_number}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">Waktu Pemesanan:</div>
                              <div className="col-md-8">
                                {formatDate(
                                  result?.head?.created_at,
                                  "date-month-year"
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">Waktu Pembayaran:</div>
                              <div className="col-md-8">
                                {formatDate(
                                  result?.head?.created_at,
                                  "date-month-year"
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">Waktu Pengiriman:</div>
                              <div className="col-md-8">
                                {formatDate(
                                  result?.head?.created_at,
                                  "date-month-year"
                                )}
                              </div>
                            </div>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Container>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default PenjualanDetail;
