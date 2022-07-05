/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
import NoAuthService from "../../services/NoAuthService";

function OtpSms({ history, location }) {
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
    uuid: null,
  });
  const [formPrefix, setFormPrefix] = useState({
    idapps: null,
    value: null,
    desc: null,
  });
  const [prefix, setPrefix] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getSetting();
    getPrefix();
  }, []);

  console.log(form);

  const getSetting = async () => {
    const res = await dispatch(_fetch(NoAuthService.getSmsSwitch()));
    console.log(res);
    const status = res.data.lobj[0].value.includes("ALL") ? "ALL" : "PREFIX";
    const uuid = res.data.lobj[0].value.includes("ALL#")
      ? res.data.lobj[0].value.split("#")[1]
      : null;
    setForm({ ...form, status: status, uuid });
  };

  const getPrefix = async () => {
    const res = await dispatch(_fetch(NoAuthService.getSmsPrefix()));
    console.log(res);
    setPrefix(res.data.lobj);
  };

  const setSetting = async () => {
    const payload = {
      value: form.status == "ALL" ? form.status + "#" + form.uuid : form.status,
    };
    const res = await dispatch(
      _fetch(NoAuthService.setSmsSwitch({ payload: JSON.stringify(payload) }))
    );
    console.log("setting prefix ~> ", res);
    getSetting();
  };

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const handleChangeP = (type) => (val) => {
    setFormPrefix({ ...formPrefix, [type]: val.target.value });
  };

  const handleChangeF = (type) => (val) => {
    setForm({ ...form, [type]: val });
  };

  console.log("form", form);

  const saveAction = async () => {
    const payload = {
      idapps: formPrefix.idapps,
      value: formPrefix.value,
      desc: formPrefix.desc,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setSmsGwPrefix",
          payload: JSON.stringify(payload),
        })
      )
    );
    console.log(res);
    toast.success("Berhasil update prefix");
    getPrefix();
  };

  const editAction = async (item) => {
    if (item.idapps.includes("switch"))
      return toast.error("Tidak bisa edit switch");
    setIsEdit(true);
    setFormPrefix({
      idapps: item.idapps,
      value: item.value,
      desc: item.desc,
    });
  };

  const cancelEdit = async () => {
    setIsEdit(false);
    setFormPrefix({
      idapps: "",
      value: "",
      desc: "",
    });
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="otp-sms" />
          <Content>
            <PageHeading title="Setting Otp Sms" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <div className="form-group">
                    <label>Status</label>
                    <div
                      className="radio"
                      onClick={() => handleChangeF("status")("PREFIX")}
                    >
                      <input
                        type="radio"
                        name="status"
                        id="aktif"
                        value="PREFIX"
                        checked={form.status === "PREFIX"}
                        onChange={handleChangeF("tipe")}
                      />
                      <label htmlFor="optionsRadios1">BY PREFIX</label>
                    </div>
                    <div
                      className="radio"
                      onClick={() => handleChangeF("status")("ALL")}
                    >
                      <input
                        type="radio"
                        name="status"
                        id="tidakaktif"
                        value="ALL"
                        checked={form.status === "ALL"}
                        onChange={handleChangeF("tipe")}
                      />
                      <label htmlFor="optionsRadios2">ALL</label>
                    </div>
                  </div>
                  {form.status == "ALL" && (
                    <Input
                      label="UUID"
                      onChange={handleChange("uuid")}
                      placeholder="uuid"
                      value={form.uuid}
                    />
                  )}
                  <Button
                    title="Simpan"
                    type="warning"
                    onClick={() => setSetting()}
                  />
                </Card>
                <Card>
                  <Input
                    label="ID"
                    onChange={handleChangeP("idapps")}
                    placeholder="contoh smsgw#xl"
                    value={formPrefix.idapps}
                  />
                  <Input
                    label="Deskripsi"
                    onChange={handleChangeP("desc")}
                    placeholder="contoh XL"
                    value={formPrefix.desc}
                  />
                  <Input
                    label="Value (pisahkan dengan #)"
                    onChange={handleChangeP("value")}
                    placeholder="contoh 0808#0808#"
                    value={formPrefix.value}
                  />

                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title={"Simpan"}
                      type="warning"
                      onClick={() => saveAction()}
                    />
                    {isEdit && (
                      <Button
                        title="Batal Edit"
                        type="danger"
                        onClick={() => cancelEdit()}
                        style={{ width: 130, marginLeft: 10 }}
                      />
                    )}
                  </div>
                </Card>
                <Card>
                  <table
                    className="table table-hover table-checkable order-column full-width"
                    id="example4"
                  >
                    <thead>
                      <tr>
                        <th className=""> idapps </th>
                        <th className=""> desc </th>
                        <th className=""> value </th>
                        <th className="center"> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {prefix?.map((item, index) => {
                        return (
                          <tr className="odd gradeX" key={index}>
                            <td className="">{item.idapps}</td>
                            <td className="">{item.desc}</td>
                            <td className="">
                              {item.value.replace(/\b#\b/g, ", ")}
                            </td>
                            <td className="center">
                              <a
                                className="btn btn-tbl-edit btn-xs"
                                onClick={() => editAction(item)}
                              >
                                <i className="fa fa-pencil"></i>
                              </a>
                              <a className="btn btn-tbl-delete btn-xs">
                                <i className="fa fa-trash-o "></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

export default withRouter(OtpSms);
