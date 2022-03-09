/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
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

function TopProdukFoodCreate({ history, location }) {
  const item = location?.query?.item;
  const isEdit = location?.query?.state === "edit";

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id: "",
    store: {
      id: "",
      nama: "",
    },
    barang: {
      id: "",
      nama: "",
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

  useEffect(() => {
    if (isEdit) {
      console.log("Old Data", item);
      setForm({
        id: item.id,
        store: {
          id: item.toko.id,
          nama: item.toko.nama,
        },
        barang: {
          id: item.barang.id,
          nama: item.barang.nama,
        },
        date: formatDate(item.expired_at, "year-month-date"),
      });
    }
  }, []);

  const saveAction = async () => {
    if (form.date.length === 0) return toast.error("Masukkan Tanggal");
    if (form.store.id.length === 0) return toast.error("Pilih Toko");

    let payload, res;

    if (isEdit) {
      payload = {
        id_produk: form.barang.id,
        expired_at: formatDate(form.date, "year-month-date"),
      };
      res = await dispatch(
        _fetch(
          BridgeService.JbMarket({
            key: "jbfood/recommend/patch",
            method: "post",
            payload: JSON.stringify(payload),
          })
        )
      );
    } else {
      payload = {
        id_produk: form.barang.id,
        expired_at: formatDate(form.date, "year-month-date"),
      };
      res = await dispatch(
        _fetch(
          BridgeService.JbMarket({
            key: "jbfood/recommend/patch",
            method: "post",
            payload: JSON.stringify(payload),
          })
        )
      );
    }
    setForm({
      id: "",
      store: {
        id: "",
        name: "",
      },
      barang: {
        id: "",
        nama: "",
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
          key: "jbfood/search/admin",
          method: "get",
          payload: JSON.stringify({ id: formSearch.query }),
        })
      )
    );
    // console.log(payload);
    console.log(res.data);
    setTrx(res.data.data);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="topmerchant" />
          <Content>
            <PageHeading
              title={isEdit ? "Edit Top Produk Food" : "Tambah Top Produk Food"}
            />
            <div className="row">
              <div className="col-12">
                <Card>
                  <div onClick={() => (isEdit ? null : setModal(true))}>
                    <Input
                      label="Produk Food"
                      onChange={handleChange("isi")}
                      value={
                        form.barang.id === ""
                          ? "Pilih Produk Food"
                          : form.barang.nama
                      }
                      style={{
                        width: "50%",
                        cursor: "pointer",
                        caretColor: "transparent",
                      }}
                      readOnly
                    />
                  </div>
                  {isEdit && (
                    <Input
                      label="Nama Toko"
                      onChange={handleChange("isi")}
                      value={form.store.nama}
                      style={{
                        width: "50%",
                        cursor: "pointer",
                        caretColor: "transparent",
                      }}
                      readOnly
                    />
                  )}
                  <Input
                    label="Expire"
                    onChange={handleChange("date")}
                    placeholder="Tanggal"
                    value={form.date}
                    type="date"
                  />
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title={isEdit ? "Update" : "Submit"}
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
              label="Cari Produk Food"
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
                                {item.nama}
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
                                barang: {
                                  id: item.id,
                                  nama: item.nama,
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

export default withRouter(TopProdukFoodCreate);
