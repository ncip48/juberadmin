/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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

function BannerPromo({ history, location }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    image: "",
  });
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);

  const uploadImage = async (data) => {
    const res = await dispatch(_fetch(GlobalService.uploadFoto(data)));
    if (!res?.success) return;
    setForm({ ...form, image: res.file });
  };

  const deleteImage = async () => {
    const res = await dispatch(_fetch(GlobalService.deleteFoto(form?.image)));
    if (!res?.success) return;
    setForm({ ...form, image: "" });
  };

  const editAction = async () => {
    const payload = {
      value: form.image,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setpromobanner",
          payload: JSON.stringify(payload),
        })
      )
    );
    setForm({ image: "" });
    setImage(res.data.lobj[0].value);
    setResult(res.data.msg);
  };

  const getBanner = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getpromobanner",
        }),
        false
      )
    );
    setImage(res.data.msg);
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="banner-promo" />
          <Content>
            <PageHeading title="Banner Promo" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <h4>Gambar Promo</h4>
                  <img
                    src={image}
                    alt=""
                    className="img-thumbnail mb-2"
                    style={{
                      height: "20rem",
                      width: "20rem",
                      objectFit: "contain",
                    }}
                  />
                  <hr />
                  {form.image.length === 0 ? (
                    <Input
                      accept="image/*"
                      label="Ubah Gambar"
                      type="file"
                      onChange={(e) => uploadImage(e?.target?.files[0])}
                    />
                  ) : (
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
                      <img
                        src={form.image}
                        alt=""
                        className="img-thumbnail mb-2"
                        style={{
                          height: "8rem",
                          width: "8rem",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: 99,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="text-center d-flex justify-content-center align-items-center"
                        onClick={() => deleteImage()}
                      >
                        <i
                          className="material-icons"
                          style={{ color: "#E44F56", cursor: "pointer" }}
                        >
                          cancel
                        </i>
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title="Submit"
                      type="warning"
                      onClick={() => editAction()}
                    />
                  </div>
                  {result.length !== 0 && (
                    <>
                      <hr />
                      <div className="alert alert-success">{result}</div>
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

export default withRouter(BannerPromo);
