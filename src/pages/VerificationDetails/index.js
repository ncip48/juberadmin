/* eslint-disable react/jsx-no-target-blank */
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
import { decipher, getJenisDok, getStatus } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";
import { withRouter } from "react-router-dom";

function VerificationDetails({ history }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  const dec = decipher("akuimuet");

  useEffect(() => {
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSetting = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "admingetdok",
          payload: JSON.stringify({ idrs: dec(id).split("#")[0] }),
        })
      )
    );
    console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const terimaVerif = async (jenisDok) => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminverdok",
          payload: JSON.stringify({
            idrs: dec(id).split("#")[0],
            doksts: jenisDok + "-4",
          }),
        })
      )
    );
    console.log(res);
    await getSetting();
  };
  const tolakVerif = async (jenisDok) => {
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminverdok",
          payload: JSON.stringify({
            idrs: dec(id).split("#")[0],
            doksts: jenisDok + "-3",
          }),
        })
      )
    );
    await getSetting();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="verifikasi" />
          <Content>
            <PageHeading title={dec(id).replace("#", " - ")} />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, ids) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-12 col-sm-6"
                        key={ids}
                      >
                        <div className="card card-topline-yellow">
                          <div className="card-body no-padding height-9 mt-1">
                            <ul className="list-group list-group-unbordered">
                              <li
                                className="list-group-item text-center"
                                style={{ borderTop: "0px none" }}
                              >
                                <b>{getJenisDok(it.jenisdok)}</b>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Status</b>
                                <div className="pull-right">
                                  {getStatus(it.status)}
                                </div>
                              </li>
                              <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{ borderBottomWidth: 0 }}
                              >
                                <b>No Dokumen</b>
                                <div className="pull-right">{it.nodok}</div>
                              </li>
                              <a
                                href={it.picture}
                                target="_blank"
                                className="text-center"
                              >
                                <img
                                  src={it.picture}
                                  alt=""
                                  className="img-thumbnail mb-2"
                                  style={{
                                    // height: "20rem",
                                    // width: "20rem",
                                    objectFit: "contain",
                                    borderRadius: 8,
                                    borderColor: "#E44F56",
                                  }}
                                />
                              </a>
                            </ul>
                            <div className="profile-userbuttons">
                              <button
                                type="button"
                                className={`mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-warning mr-3`}
                                data-upgraded=",MaterialButton,MaterialRipple"
                                onClick={() => terimaVerif(it.jenisdok)}
                              >
                                Terima
                                <span className="mdl-button__ripple-container">
                                  <span className="mdl-ripple"></span>
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-danger`}
                                data-upgraded=",MaterialButton,MaterialRipple"
                                onClick={() => tolakVerif(it.jenisdok)}
                              >
                                Tolak
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

export default withRouter(VerificationDetails);
