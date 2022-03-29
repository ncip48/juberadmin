/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  AutoComplete,
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
import { _fetch, _fetch_nomsg } from "../../redux/actions/global";
import { BridgeService, GlobalService } from "../../services";
import _ from "lodash";
import { useEffect } from "react";

function MenuCreate({ history, location }) {
  const item = location?.query?.item;
  const isEdit = location?.query?.state === "edit";
  console.log(isEdit);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nama: null,
    status: null,
    nextpage: null,
    webview: null,
    submenu: null,
    icon: null,
    json: {
      icon: "",
      update: false,
    },
  });
  const [counter, setCounter] = useState(1);
  const [result, setResult] = useState("");
  const [submenu, setSubmenu] = useState([]);
  const [resultMenu, setResultMenu] = useState(null);
  const [modal, setModal] = useState(false);

  const [query, setQuery] = useState("");
  const [clickQuery, setClickQuery] = useState(null);

  useEffect(() => {
    if (isEdit) {
      console.log("Old Data", item);
      setForm({
        nama: item.nama,
        status: item.status,
        nextpage: splitNextPage(item.nextpage, "nextpage"),
        webview: splitNextPage(item.nextpage, "webview"),
        submenu: item.submenu,
        icon: item.icon,
        json: JSON.parse(item.json),
      });
      getSubmenu();
    }
  }, []);

  console.log(form);

  const getSubmenu = async () => {
    const res = await dispatch(
      _fetch(
        GlobalService.getSubmenu({
          payload: JSON.stringify({ submenu: item?.submenu }),
        })
      )
    );
    console.log("submenu", res);
    setSubmenu(res?.data?.lobj);
  };

  const deleteSubmenu = (item) => {
    const newSubmenu = submenu.filter((arr) => arr.id !== item.id);
    setSubmenu(newSubmenu);
  };

  const addSubmenu = () => {
    setSubmenu([...submenu, { ...clickQuery }]);
    console.log(clickQuery);
  };

  const renderChips = (item) => {
    return item.length == 0 ? (
      <span className="mdl-chip mdl-chip--deletable mr-2">
        <span className="mdl-chip__text">Belum ada submenu</span>
        <button type="button" className="mdl-chip__action">
          <i className="material-icons">cancel</i>
        </button>
      </span>
    ) : (
      <span className="mdl-chip mdl-chip--deletable mr-2" key={item.id}>
        <span className="mdl-chip__text">{item.nama}</span>
        <button
          type="button"
          className="mdl-chip__action"
          onClick={() => deleteSubmenu(item)}
        >
          <i className="material-icons">cancel</i>
        </button>
      </span>
    );
  };

  const newJson = _.omit(form.json, "icon");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const handleChangeF = (type) => (val) => {
    setForm({ ...form, [type]: val });
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
    // console.log(objLama);
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

  const createNextPage = () => {
    if (
      form?.webview?.length == 0 ||
      form.webview == null ||
      form.webview == ""
    ) {
      return form.nextpage;
    } else {
      return form.nextpage + "#" + form.webview;
    }
  };

  const splitNextPage = (item, type = "nextpage") => {
    if (item?.includes("#")) {
      if (type == "nextpage") {
        return item?.split("#")[0];
      } else if (type == "webview") {
        return item?.split("#")[1];
      }
    } else {
      if (type == "nextpage") {
        return item;
      } else if (type == "webview") {
        return null;
      }
    }
  };

  console.log("form", form);

  const uploadImage = async (data) => {
    const res = await dispatch(_fetch(GlobalService.uploadFoto(data)));
    if (!res?.success) return;
    setForm({ ...form, json: { ...form.json, icon: res.file } });
  };

  const deleteImage = async () => {
    const res = await dispatch(
      _fetch(GlobalService.deleteFoto(form?.json?.icon))
    );
    if (!res?.success) return;
    setForm({ ...form, json: { ...form.json, icon: "" } });
  };

  useEffect(() => {
    getMenuSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getMenuSearch = async () => {
    const res = await dispatch(
      _fetch_nomsg(
        BridgeService.JbDelivery({
          key: "carimenu",
          payload: JSON.stringify({ nama: query }),
        }),
        false
      )
    );
    // console.log(res.data.lobj);
    setResultMenu(res?.data?.lobj);
  };

  const createAction = async () => {
    // const joinedIdSubmenu = submenu
    //   ?.map(
    //     (elem, index) =>
    //       elem.id + String(index < 1 ? "0" + (index + 1) : index + 1)
    //   )
    //   .join("#");
    const joinedIdSubmenu = submenu?.map((elem, index) => elem.id).join("#");
    let payload;
    if (isEdit) {
      payload = {
        id: item.id,
        nama: form.nama,
        status: form.status,
        nextpage: createNextPage(),
        submenu: joinedIdSubmenu,
        icon: null,
        json: objToString(form.json),
      };
    } else {
      payload = {
        id: Date.now(),
        nama: form.nama,
        status: form.status,
        nextpage: createNextPage(),
        submenu: joinedIdSubmenu,
        icon: null,
        json: objToString(form.json),
      };
    }
    console.log("payload", payload);
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
    console.log(res);
    setResult("Berhasil membuat menu");
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="menu" />
          <Content>
            <PageHeading title={isEdit ? "Edit Menu" : "Tambah Menu"} />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Nama Menu"
                    onChange={handleChange("nama")}
                    placeholder="nama"
                    value={form.nama}
                  />
                  <div className="form-group">
                    <label>Status</label>
                    <div
                      className="radio"
                      onClick={() => handleChangeF("status")("AKTIF")}
                    >
                      <input
                        type="radio"
                        name="status"
                        id="aktif"
                        value="AKTIF"
                        checked={form.status === "AKTIF"}
                        onChange={handleChangeF("tipe")}
                      />
                      <label htmlFor="optionsRadios1">AKTIF</label>
                    </div>
                    <div
                      className="radio"
                      onClick={() => handleChangeF("status")("TIDAK AKTIF")}
                    >
                      <input
                        type="radio"
                        name="status"
                        id="tidakaktif"
                        value="TIDAK AKTIF"
                        checked={form.status === "TIDAK AKTIF"}
                        onChange={handleChangeF("tipe")}
                      />
                      <label htmlFor="optionsRadios2">TIDAK AKTIF</label>
                    </div>
                  </div>
                  <Input
                    label="Next Page"
                    onChange={handleChange("nextpage")}
                    placeholder="nextpage"
                    value={form.nextpage}
                  />
                  <Input
                    label="Webview"
                    onChange={handleChange("webview")}
                    placeholder="webview"
                    value={form.webview}
                  />
                  {/* <Input
                    label="Sub Menu"
                    onChange={handleChange("submenu")}
                    placeholder="submenu"
                    value={form.submenu}
                  /> */}
                  <label>Sub Menu</label>
                  <br />
                  {submenu?.map((val) => {
                    return renderChips(val);
                  })}
                  <div className="mb-3"></div>
                  <h5
                    className="text-dark mt-0 mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setModal(true)}
                  >
                    + Tambah submenu
                  </h5>
                  {form.json.icon.length === 0 ? (
                    <Input
                      accept="image/*"
                      label="Icon"
                      type="file"
                      onChange={(e) => uploadImage(e?.target?.files[0])}
                    />
                  ) : (
                    <div>
                      <label>Icon</label>
                      <br />
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
                          src={form.json.icon}
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
                      title={isEdit ? "Simpan" : "Submit"}
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
        <Modal show={modal} onHide={() => setModal(false)}>
          <AutoComplete
            suggestions={resultMenu}
            onChangeText={(val) => setQuery(val)}
            onClickText={(val) => setClickQuery(val)}
          />
          <div className="d-flex justify-content-center align-items-end mt-4">
            <Button
              title="Tambahkan"
              type="warning"
              onClick={() => addSubmenu()}
            />
            <Button
              title="Batal"
              type="danger"
              onClick={() => setModal(false)}
              style={{ width: 130, marginLeft: 10 }}
            />
          </div>
        </Modal>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default withRouter(MenuCreate);
