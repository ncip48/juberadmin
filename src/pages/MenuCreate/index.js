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
import { BridgeService, GlobalService } from "../../services";
import _ from "lodash";

function MenuCreate({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nama: null,
    status: null,
    nextpage: null,
    submenu: null,
    icon: null,
    json: {
      icon: null,
      update: false,
    },
  });
  const [tambahanKey, setTambahanKey] = useState([]);
  const [tambahanValue, setTambahanValue] = useState([]);
  const [counter, setCounter] = useState(1);
  const [result, setResult] = useState("");

  const newJson = _.omit(form.json, "icon");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const tambahJson = () => {
    setForm({
      ...form,
      json: { ...form.json, [`menu${counter}`]: `val${counter}` },
    });
    setCounter(counter + 1);
  };

  const deleteJson = (val) => {
    let objLama = form.json;
    delete objLama[`${val}`];
    setForm({ ...form, json: { ...objLama } });
    console.log(objLama);
  };

  const handleKeyJson = (index) => (value) => (oldKey) => (val) => {
    delete Object.assign(form.json, {
      [val.target.value.replaceAll(" ", "_")]: form.json[index],
    })[oldKey];
    setForm({
      ...form,
      json: {
        ...form.json,
        [val.target.value.replaceAll(" ", "_")]: value,
      },
    });
  };

  const handleValueJson = (type) => (val) => {
    setForm({ ...form, json: { ...form.json, [type]: val.target.value } });
  };

  function objToString(obj) {
    return Object.entries(obj).reduce((str, [p, val], i, y) => {
      return `${str}${p}#${val?.length === 0 ? "" : val}${
        i !== y.length - 1 ? "-" : ""
      }`;
    }, "");
  }

  console.log(form.json);

  const uploadImage = async (data) => {
    const res = await dispatch(_fetch(GlobalService.uploadFoto(data)));
    if (!res?.success) return;
    setForm({ ...form, json: { ...form.json, icon: res.file } });
  };

  const deleteImage = async () => {
    const res = await dispatch(_fetch(GlobalService.deleteFoto(form?.icon)));
    if (!res?.success) return;
    setForm({ ...form, json: { ...form.json, icon: null } });
  };

  const createAction = async () => {
    // console.log(objToString(form.json));
    const payload = {
      id: Date.now(),
      nama: form.nama,
      status: form.status,
      nextpage: form.nextpage,
      submenu: form.submenu,
      icon: null,
      json: objToString(form.json),
    };
    // console.log(payload);
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "createmenu",
          payload: JSON.stringify(payload),
        }),
        false
      )
    );
    if (res.data.code != 200) {
      return toast.error(res.data.msg);
    }
    toast.success("Berhasil membuat menu");
    // console.log(res);
    // setResult("Berhasil membuat menu");
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="menu" />
          <Content>
            <PageHeading title="Tambah Menu" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Nama Menu"
                    onChange={handleChange("nama")}
                    placeholder="nama"
                    value={form.nama}
                  />
                  <Input
                    label="Status"
                    onChange={handleChange("status")}
                    placeholder="AKTIF/TIDAK AKTIF"
                    value={form.status}
                  />
                  <Input
                    label="Next Page"
                    onChange={handleChange("nextpage")}
                    placeholder="nextpage"
                    value={form.nextpage}
                  />
                  <Input
                    label="Sub Menu"
                    onChange={handleChange("submenu")}
                    placeholder="submenu"
                    value={form.submenu}
                  />
                  {form.icon == null ? (
                    <Input
                      accept="image/*"
                      label="Icon"
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
                        src={form.icon}
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
                  <hr />
                  <h5 className="text-dark">-- Menu Tambahan --</h5>
                  {Object.entries(newJson).map(([key, val], index) => {
                    return (
                      <div key={index} className="d-flex flex-row">
                        <Input
                          label=""
                          onChange={(vald) =>
                            handleKeyJson(index)(val)(key)(vald)
                          }
                          placeholder=""
                          value={key}
                        />
                        <h5 className="text-dark mx-2">:</h5>
                        <Input
                          label=""
                          onChange={handleValueJson(key)}
                          placeholder=""
                          value={val}
                        />
                        <h5
                          className="text-dark mx-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteJson(key)}
                        >
                          X
                        </h5>
                      </div>
                    );
                  })}
                  <h5
                    className="text-dark mt-0 mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => tambahJson()}
                  >
                    + Tambah
                  </h5>
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

export default withRouter(MenuCreate);
