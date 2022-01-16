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
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function DriverManual() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    driverId: {
      sim: "",
      nama: "",
    },
    trxId: "",
  });
  const [result, setResult] = useState("");
  const [driver, setDriver] = useState([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const saveAction = async () => {
    if (form.trxId.length === 0) return toast.error("Masukkan No Transaksi");
    if (form.driverId.nama.length === 0) return toast.error("Pilih Driver");
    const payload = {
      driverid: form.driverId.sim,
      trxid: form.trxId,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "pilihdrivermanual",
          payload: JSON.stringify(payload),
        })
      )
    );
    // setForm({ driverId: "", trxId: "" });
    setResult(res.data.msg);
  };

  const getDriver = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "caridriveraktif",
          payload: JSON.stringify({ driverName: query }),
        })
      )
    );
    setDriver(res.data.lobj);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="driver-manual" />
          <Content>
            <PageHeading title="Pilih Driver Manual" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="ID Transaksi"
                    onChange={handleChange("trxId")}
                    placeholder="JBRXXXXXXX"
                    value={form.trxId}
                  />
                  <div onClick={() => setModal(true)}>
                    <Input
                      label="Driver"
                      onChange={handleChange("isi")}
                      value={
                        form.driverId.nama === ""
                          ? "Pilih Driver"
                          : form.driverId.nama
                      }
                      style={{
                        width: "20%",
                        cursor: "pointer",
                        caretColor: "transparent",
                      }}
                      readOnly
                    />
                  </div>
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
              label="Cari Driver"
              onChange={(val) => setQuery(val.target.value)}
              placeholder="Nama, No Telp, Kode Agen"
              value={query}
            />
            <Button title="Cari" type="warning" onClick={() => getDriver()} />
          </div>
          {driver.length !== 0 && (
            <>
              <hr />
              {driver.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <img
                        className="img-circle user-img-circle mr-3"
                        src={item.image}
                        alt="g"
                        style={{ width: "4rem", height: "4rem" }}
                      />
                      <div
                        className="d-flex align-items-center justify-content-between"
                        style={{ flex: 1 }}
                      >
                        <div>
                          <div className="d-flex align-items-center">
                            <h5 style={{ fontWeight: "bold" }} className="mr-3">
                              {item.nama}
                            </h5>{" "}
                            <h5>({item.kodeAgen})</h5>
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
                              driverId: { sim: item.sim, nama: item.nama },
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
          )}
        </Modal>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default DriverManual;
