import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { formatDate, formatRupiah } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function Voucher() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVoucher = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "allvoucher" }))
    );
    // console.log(res.data.lobj);
    setResult(res.data.lobj);
  };

  const deleteAction = async (id) => {
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "deletevoucher",
          payload: JSON.stringify({ id }),
        })
      )
    );
    // console.log(res.data.lobj);
    getVoucher();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="voucher" />
          <Content>
            <PageHeading title="Voucher" add to="/create-voucher" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-12 col-sm-6"
                        key={id}
                      >
                        <div className="card card-topline-yellow">
                          <div className="card-body no-padding height-9 mt-1">
                            <ul className="list-group list-group-unbordered">
                              <li
                                className="list-group-item"
                                style={{ borderTop: "0px none" }}
                              >
                                <b>Nama Promo</b>
                                <div className="pull-right">{it.namapromo}</div>
                              </li>
                              <li className="list-group-item">
                                <b>Kode Promo</b>
                                <div className="pull-right">{it.kodepromo}</div>
                              </li>
                              <li className="list-group-item">
                                <b>Diskon</b>
                                <div className="pull-right">
                                  {formatRupiah(it.diskon)}
                                </div>
                              </li>
                              <li className="list-group-item">
                                <b>Tanggal Expired</b>
                                <div className="pull-right">
                                  {formatDate(it.tglexp, "date monthLess year")}
                                </div>
                              </li>
                              <li className="list-group-item work-monitor">
                                <div
                                  className="states"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    className="info"
                                    style={{ marginTop: 0 }}
                                  >
                                    <div className="desc pull-left">
                                      <b>Quota</b>
                                    </div>
                                    <div className="percent pull-right">
                                      {it.usedpromo}/{it.quota} -{" "}
                                      {Math.round(
                                        (parseInt(it.usedpromo) /
                                          parseInt(it.quota)) *
                                          100
                                      )}{" "}
                                      %
                                    </div>
                                  </div>
                                  <div className="progress progress-xs">
                                    <div
                                      className={`progress-bar progress-bar-warning progress-bar-striped active width-${Math.round(
                                        (parseInt(it.usedpromo) /
                                          parseInt(it.quota)) *
                                          100
                                      )}`}
                                      role="progressbar"
                                      aria-valuenow={it.usedpromo}
                                      aria-valuemin="0"
                                      aria-valuemax={it.quota}
                                    >
                                      <span className="sr-only">50% </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div className="profile-userbuttons">
                              <button
                                type="button"
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-pink"
                                data-upgraded=",MaterialButton,MaterialRipple"
                                onClick={() => deleteAction(it.id)}
                              >
                                Hapus
                                <span className="mdl-button__ripple-container">
                                  <span className="mdl-ripple"></span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default Voucher;
