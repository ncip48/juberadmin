import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

function ForceSuccess() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    kodepesanan: "",
    alasan: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const checkAction = async () => {
    if (form.kodepesanan.length === 0)
      return toast.error("Masukkan Kode Pesanan");
    if (form.alasan.length === 0) return toast.error("Masukkan Alasan");
    const payload = {
      ...form,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "forcesuccesstrx",
          payload: JSON.stringify(payload),
        })
      )
    );
    setResult(res?.data?.msg);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="force-success" />
          <Content>
            <PageHeading title="Paksa Sukseskan Transaksi" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Masukkan Kode Pesanan"
                    onChange={handleChange("kodepesanan")}
                    placeholder="JBXXXXX"
                    value={form.kodepesanan}
                  />
                  <Input
                    label="Masukkan Alasan"
                    onChange={handleChange("alasan")}
                    placeholder="Admin Gabut"
                    value={form.alasan}
                  />
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => checkAction()}
                  />
                  {result?.length !== 0 && (
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

export default ForceSuccess;
