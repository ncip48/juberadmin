import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
import { BridgeService } from "../../services";

function AddColor({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    idapps: "",
    desc: "",
    value: "#ffffff",
  });
  const [result, setResult] = useState("");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const createAction = async () => {
    if (form.idapps.length === 0) return toast.error("Masukkan Id Warna");
    if (form.desc.length === 0) return toast.error("Masukkan Deskripsi");
    if (form.value.length === 0) return toast.error("Masukkan Value");
    const payload = {
      ...form,
    };
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setcolor",
          payload: JSON.stringify(payload),
        })
      )
    );
    setForm({
      idapps: "",
      desc: "",
      value: "",
    });
    setResult("Berhasil membuat voucher");
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="color" />
          <Content>
            <PageHeading title="Tambah Warna" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Id Warna"
                    onChange={handleChange("idapps")}
                    placeholder="color.primary"
                    value={form.idapps}
                  />
                  <Input
                    label="Deskripsi"
                    onChange={handleChange("desc")}
                    placeholder="Warna Utama"
                    value={form.desc}
                  />
                  <Input
                    label="Value"
                    onChange={handleChange("value")}
                    placeholder="#ffffff"
                    value={form.value}
                    type="color"
                    style={{ width: "10%" }}
                  />
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title="Submit"
                      type="warning"
                      onClick={() => createAction()}
                    />
                    <Button
                      title="Kembali"
                      type="danger"
                      onClick={() => history.goBack()}
                      style={{ width: 130, marginLeft: 10 }}
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

export default withRouter(AddColor);
