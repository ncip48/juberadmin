/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  Container,
  Content,
  Input,
  Modal,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { formatDate } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService, NotifService } from "../../services";

function ForceSuccess() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    kodepesanan: "",
    tokendriver: "",
    alasan: "",
  });
  const [formSearch, setFormSearch] = useState({
    tipe: "FOOD",
    tgl: formatDate(new Date()),
  });
  const [result, setResult] = useState("");
  const [trx, setTrx] = useState(null);
  const [modal, setModal] = useState(false);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };
  const handleChangeSearch = (type) => (val) => {
    setFormSearch({ ...formSearch, [type]: val.target.value ?? val });
  };
  const handleChangeSearchF = (type) => (val) => {
    setFormSearch({ ...formSearch, [type]: val });
  };

  const saveAction = async () => {
    if (form.alasan.length === 0) return toast.error("Masukkan Alasan");
    if (form.kodepesanan.length === 0) return toast.error("Pilih Trx Id");
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
    setForm({ kodepesanan: "", alasan: "" });
    setResult(res.data.msg);
    const payloadNotif = {
      tokens: [form.tokendriver],
      judul: "Pesanan disukseskan",
      msg: `Pesanan ${form.kodepesanan} disukseskan admin, alasan ${form.alasan}`,
      data: {
        service: "successadmin",
        type: "driver",
        idpesanan: form.kodepesanan,
      },
    };
    console.log(payloadNotif);
    const resNotif = await dispatch(
      _fetch(NotifService.broadcast(payloadNotif), false)
    );
    console.log(resNotif);
  };

  const getTrx = async () => {
    const payload = {
      ...formSearch,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getTrxByType",
          payload: JSON.stringify(payload),
        })
      )
    );
    // console.log(payload);
    console.log(res.data);
    setTrx(res.data.lobj);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="force-success" />
          <Content>
            <PageHeading title="Success Admin" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <div onClick={() => setModal(true)}>
                    <Input
                      label="Transaksi"
                      onChange={handleChange("isi")}
                      value={
                        form.kodepesanan === ""
                          ? "Pilih Transaksi"
                          : form.kodepesanan
                      }
                      style={{
                        width: "20%",
                        cursor: "pointer",
                        caretColor: "transparent",
                      }}
                      readOnly
                    />
                  </div>
                  <Input
                    label="Alasan"
                    onChange={handleChange("alasan")}
                    placeholder="Sys Error"
                    value={form.alasan}
                  />
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => saveAction()}
                  />
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
        <Modal show={modal} onHide={() => setModal(false)}>
          <div>
            <Input
              label="Tanggal"
              onChange={handleChangeSearch("tgl")}
              placeholder="Tanggal"
              value={formSearch.tgl}
              type="date"
            />
            <div className="form-group d-flex align-items-center justify-content-around">
              <div
                className="radio"
                onClick={() => handleChangeSearchF("tipe")("FOOD")}
              >
                <input
                  type="radio"
                  name="tipe"
                  id="food"
                  value="FOOD"
                  checked={formSearch.tipe === "FOOD"}
                  onChange={handleChangeSearch("tipe")}
                />
                <label htmlFor="optionsRadios1">FOOD</label>
              </div>
              <div
                className="radio"
                onClick={() => handleChangeSearchF("tipe")("RIDE")}
              >
                <input
                  type="radio"
                  name="tipe"
                  id="ride"
                  value="RIDE"
                  checked={formSearch.tipe === "RIDE"}
                  onChange={handleChangeSearch("tipe")}
                />
                <label htmlFor="optionsRadios2">RIDE</label>
              </div>
              <div
                className="radio"
                onClick={() => handleChangeSearchF("tipe")("SERVICES")}
              >
                <input
                  type="radio"
                  name="tipe"
                  id="services"
                  value="SERVICES"
                  checked={formSearch.tipe === "SERVICES"}
                  onChange={handleChangeSearch("tipe")}
                />
                <label htmlFor="optionsRadios3">SERVICES</label>
              </div>
              <div
                className="radio"
                onClick={() => handleChangeSearchF("tipe")("SEND")}
              >
                <input
                  type="radio"
                  name="tipe"
                  id="send"
                  value="SEND"
                  checked={formSearch.tipe === "SEND"}
                  onChange={handleChangeSearch("tipe")}
                />
                <label htmlFor="optionsRadios3">SEND</label>
              </div>
            </div>
            <Button title="Cari" type="warning" onClick={() => getTrx()} />
          </div>
          {trx !== null &&
            (trx.length === 0 ? (
              <>
                <hr />
                <div className="alert alert-danger">Tidak Ada Transaksi</div>
              </>
            ) : (
              <>
                <hr />
                {trx.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex align-items-center justify-content-between my-2">
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ flex: 1 }}
                        >
                          <div>
                            <div className="d-flex align-items-center">
                              <h5
                                style={{ fontWeight: "bold" }}
                                className="mr-3"
                              >
                                {item.kodepesanan}
                              </h5>
                            </div>
                            <h6 style={{ marginTop: 0 }}>{item.nopol}</h6>
                          </div>
                          <Button
                            small
                            type="pink"
                            title="Pilih"
                            onClick={() => {
                              setForm({
                                ...form,
                                kodepesanan: item.kodepesanan,
                                tokendriver: item?.id_driver?.split("#")[1],
                              });
                              setModal(false);
                            }}
                            style={{ width: "5rem" }}
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </>
            ))}
        </Modal>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default ForceSuccess;
