/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
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
import { formatDate, formatRupiah } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";
import { isExpired } from "../../helpers";

function MappingOto() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    idapps: "",
    kodeproduk: "",
    keymapping: "",
    status: "AKTIF",
  });

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const handleChangeF = (type) => (val) => {
    setForm({ ...form, [type]: val });
  };

  useEffect(() => {
    getMappingOto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMappingOto = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "getOtoInqMapping", payload: "" }))
    );
    console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const saveAction = async () => {
    let res, payload;
    if (isEdit) {
      payload = JSON.stringify({
        idapps: form.idapps,
        value: form.kodeproduk + "#" + form.keymapping,
        desc: form.status,
      });
      res = await dispatch(
        _fetch(BridgeService.JbDelivery({ key: "setOtoInqMapping", payload }))
      );
      setIsEdit(false);
    } else {
      payload = JSON.stringify({
        value: form.kodeproduk + "#" + form.keymapping,
        desc: form.status,
      });
      res = await dispatch(
        _fetch(BridgeService.JbDelivery({ key: "setOtoInqMapping", payload }))
      );
    }
    console.log(res.data);
    getMappingOto();
  };

  const editAction = async (item) => {
    setIsEdit(true);
    setForm({
      idapps: item.idapps,
      kodeproduk: item.value.split("#")[0],
      keymapping: item.value.split("#")[1],
      status: item.desc,
    });
  };

  const cancelEdit = async () => {
    setIsEdit(false);
    setForm({
      idapps: "",
      kodeproduk: "",
      keymapping: "",
      status: "AKTIF",
    });
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="mapping-oto" />
          <Content>
            <PageHeading title="Mapping OTO" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Kode Produk"
                    onChange={handleChange("kodeproduk")}
                    placeholder="contoh PLN"
                    value={form.kodeproduk}
                  />
                  <Input
                    label="Key Mapping"
                    onChange={handleChange("keymapping")}
                    placeholder="contoh CEKPLN"
                    value={form.keymapping}
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
                        <th className="center"> Kode Produk </th>
                        <th className="center"> Key Mapping </th>
                        <th className="center"> Status </th>
                        <th className="center"> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result?.map((item, index) => {
                        return (
                          <tr className="odd gradeX" key={index}>
                            <td className="center">
                              {item.value.split("#")[0]}
                            </td>
                            <td className="center">
                              {item.value.split("#")[1]}
                            </td>
                            <td className="center">
                              <span
                                className={`label label-sm box-shadow-1 ${
                                  item.desc === "AKTIF"
                                    ? "label-success"
                                    : "label-danger"
                                }`}
                              >
                                {item.desc}
                              </span>
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

export default MappingOto;
