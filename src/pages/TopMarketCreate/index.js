/* eslint-disable no-extend-native */
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
import { BridgeService } from "../../services";

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const dateObject = new Date();

function TopMarketCreate({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id: "",
    store: {
      id: "",
      name: "",
    },
    date: dateObject.addDays(2),
  });
  const [formSearch, setFormSearch] = useState({
    query: "",
  });
  const [result, setResult] = useState("");
  const [trx, setTrx] = useState(null);
  const [modal, setModal] = useState(false);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };
  const handleChangeSearch = (type) => (val) => {
    setFormSearch({ ...formSearch, [type]: val.target.value });
  };

  const saveAction = async () => {
    if (form.date.length === 0) return toast.error("Masukkan Tanggal");
    if (form.store.id.length === 0) return toast.error("Pilih Toko");
    const payload = {
      store_id: form.store.id,
      date: formatDate(form.date, "year-month-date"),
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "store/topmerchant/create",
          method: "post",
          payload: JSON.stringify(payload),
        })
      )
    );
    setForm({
      id: "",
      store: {
        id: "",
        name: "",
      },
      date: dateObject.addDays(2),
    });
    // console.log(res.data)
    setResult(res.data.message);
    history.goBack();
  };

  const getToko = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "store/search",
          method: "post",
          payload: JSON.stringify({ search: formSearch.query }),
        })
      )
    );
    // console.log(payload);
    // console.log(res.data);
    setTrx(res.data.data);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="topmerchant" />
          <Content>
            <PageHeading title="Tambah Top Merchant" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <div onClick={() => setModal(true)}>
                    <Input
                      label="Nama Toko"
                      onChange={handleChange("isi")}
                      value={
                        form.store.id === ""
                          ? "Pilih Nama Toko"
                          : form.store.name
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
                    label="Expire"
                    onChange={handleChange("date")}
                    placeholder="Sys Error"
                    value={form.date}
                    type="date"
                  />
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title="Submit"
                      type="warning"
                      onClick={() => saveAction()}
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
        <Modal show={modal} onHide={() => setModal(false)}>
          <div>
            <Input
              label="Cari Toko"
              onChange={handleChangeSearch("query")}
              placeholder="Nama Toko"
              value={formSearch.query}
            />
            <Button title="Cari" type="warning" onClick={() => getToko()} />
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
                                {item.store_name}
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
                                store: {
                                  id: item.id,
                                  name: item.store_name,
                                },
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

export default TopMarketCreate;
