/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  Container,
  Content,
  Input,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { _fetch } from "../../redux/actions/global";
import { BridgeService, GlobalService } from "../../services";

function Slider({ history }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState({
    one: "",
    two: "",
    three: "",
  });
  const [running, setRunning] = useState("");
  const [slider, setSlider] = useState(null);
  const [topBanner, setTopBanner] = useState("");

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getslider",
          payload: JSON.stringify({ setting: "slider" }),
        })
      )
    );
    const runningText = res?.data?.lobj.filter((r) => r.idapps == "slider1")[0];
    const bannerTop = res?.data?.lobj.filter((r) => r.idapps == "slider2")[0];
    const bannerBottom = res?.data?.lobj.filter(
      (r) => r.idapps !== "slider1" && r.idapps !== "slider2"
    );
    console.log(res.data.lobj);
    setRunning(runningText?.value);
    setTopBanner(bannerTop?.value);
    setSlider(bannerBottom);
  };

  const editRunningAction = async () => {
    setResult({ ...result, one: "" });
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setslider",
          payload: JSON.stringify({ idapps: "slider1", value: running }),
        }),
        false
      )
    );
    setResult({ ...result, one: res?.data?.msg });
    getSliders();
  };

  const editBannerTop = async () => {
    setTopBanner("");
  };

  const editBannerTopAction = async () => {
    setResult({ ...result, two: "" });
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setslider",
          payload: JSON.stringify({ idapps: "slider2", value: topBanner }),
        }),
        false
      )
    );
    setResult({ ...result, two: res?.data?.msg });
    getSliders();
  };

  const editBannerBottomAction = async (img) => {
    setResult({ ...result, three: "" });
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setslider",
          payload: JSON.stringify({ value: img }),
        }),
        false
      )
    );
    setResult({ ...result, three: res?.data?.msg });
    getSliders();
  };

  const uploadImage = async (data, type) => {
    const res = await dispatch(_fetch(GlobalService.uploadFoto(data)));
    if (!res?.success) return;
    // setForm({ ...form, image: res.file });
    if (type == "top") {
      setTopBanner(res.file);
    } else {
      editBannerBottomAction(res.file);
    }
  };

  //   const deleteImage = async (val) => {
  //     const res = await dispatch(_fetch(GlobalService.deleteFoto(val)));
  //     if (!res?.success) return;
  //   };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="slider" />
          <Content>
            <PageHeading title={`Slider & Running Text`} />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Running Text"
                    onChange={(val) => setRunning(val.target.value)}
                    placeholder="Masukkan Running Text"
                    value={running}
                    multiline
                    rows="30"
                  />
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => editRunningAction()}
                  />
                  {result.one.length !== 0 && (
                    <>
                      <hr />
                      <div className="alert alert-success">{result.one}</div>
                    </>
                  )}
                </Card>
                <Card>
                  {topBanner.length === 0 ? (
                    <Input
                      accept="image/*"
                      label="Banner Home Atas"
                      type="file"
                      onChange={(e) => uploadImage(e?.target?.files[0], "top")}
                    />
                  ) : (
                    <>
                      <label>Banner Home Atas</label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "9.5rem",
                          padding: 10,
                          border: "2px solid #d2d6de",
                          backgroundColor: "rgba(210, 210, 210, 0.25)",
                          color: "#ffffff",
                        }}
                        className="mb-3 d-flex flex-column"
                      >
                        <a href={topBanner} target="_blank">
                          <img
                            src={topBanner}
                            alt=""
                            className="img-thumbnail mb-2"
                            style={{
                              height: "8rem",
                              width: "8rem",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                        <div
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: 99,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="text-center d-flex justify-content-center align-items-center"
                          onClick={() => editBannerTop()}
                        >
                          <i
                            className="material-icons"
                            style={{ color: "#E44F56", cursor: "pointer" }}
                          >
                            edit
                          </i>
                        </div>
                      </div>
                    </>
                  )}
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => editBannerTopAction()}
                  />
                  {result.two.length !== 0 && (
                    <>
                      <hr />
                      <div className="alert alert-success">{result.two}</div>
                    </>
                  )}
                </Card>
                <Card>
                  <>
                    <label>Banner Home Bawah</label>
                    <div className="d-flex">
                      {slider?.map((res, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "9.5rem",
                              padding: 10,
                              // border: "2px solid #d2d6de",
                              // backgroundColor: "rgba(210, 210, 210, 0.25)",
                              // color: "#ffffff",
                            }}
                            className="mb-3 d-flex flex-column"
                            key={index}
                          >
                            <a href={res.value} target="_blank">
                              <img
                                src={res.value}
                                alt=""
                                className="img-thumbnail mb-2"
                                style={{
                                  height: "8rem",
                                  width: "8rem",
                                  objectFit: "contain",
                                }}
                              />
                            </a>
                            {/* <div
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: 99,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="text-center d-flex justify-content-center align-items-center"
                              onClick={() => deleteImage(res.value)}
                            >
                              <i
                                className="material-icons"
                                style={{ color: "#E44F56", cursor: "pointer" }}
                              >
                                cancel
                              </i>
                            </div> */}
                          </div>
                        );
                      })}
                    </div>
                    <hr />
                    <Input
                      accept="image/*"
                      label="Tambah"
                      type="file"
                      onChange={(e) =>
                        uploadImage(e?.target?.files[0], "bottom")
                      }
                      onClick={(e) => (e.target.value = null)}
                    />
                  </>
                  {result.three.length !== 0 && (
                    <>
                      <hr />
                      <div className="alert alert-success">{result.three}</div>
                    </>
                  )}
                </Card>
              </div>
            </div>
          </Content>
        </Container>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default withRouter(Slider);
