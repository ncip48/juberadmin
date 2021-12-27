import moment from "moment";
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

function VoucherCreate({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    namapromo: "",
    kodepromo: "",
    quota: "",
    diskon: "",
    tglexp: moment().format("Y-M-D"),
  });
  const [result, setResult] = useState("");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const createAction = async () => {
    if (form.namapromo.length === 0)
      return toast.error("Masukkan Nama Voucher");
    if (form.kodepromo.length === 0) return toast.error("Masukkan Kode Promo");
    if (form.quota.length === 0) return toast.error("Masukkan Quota");
    if (form.diskon.length === 0) return toast.error("Masukkan Potongan");
    const payload = {
      ...form,
      diskon: Number(form.diskon),
      quota: Number(form.quota),
    };
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "createvoucher",
          payload: JSON.stringify(payload),
        })
      )
    );
    setForm({
      namapromo: "",
      kodepromo: "",
      quota: "",
      diskon: "",
      tglexp: moment().format("Y-M-D"),
    });
    setResult("Berhasil membuat voucher");
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="voucher" />
          <Content>
            <PageHeading title="Buat Voucher" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Nama Voucher"
                    onChange={handleChange("namapromo")}
                    placeholder="Hari Kemerdekaan"
                    value={form.namapromo}
                  />
                  <Input
                    label="Kode Promo"
                    onChange={handleChange("kodepromo")}
                    placeholder="MERDEKA"
                    value={form.kodepromo}
                  />
                  <Input
                    label="Quota"
                    onChange={handleChange("quota")}
                    placeholder="100"
                    value={form.quota}
                  />
                  <Input
                    label="Potongan"
                    onChange={handleChange("diskon")}
                    placeholder="5000"
                    value={form.diskon}
                  />
                  <Input
                    type="date"
                    label="Expire"
                    onChange={handleChange("tglexp")}
                    value={form.tglexp}
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

export default withRouter(VoucherCreate);
