/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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

function UpdateUser() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    userId: {
      idrs: "",
      nama: "",
    },
    trxId: "",
  });
  const [formInput, setFormInput] = useState({
    idreseller: "",
    telp: "",
    namareseller: "",
    alamatreseller: "",
    jeniskelamin: "",
    merk: "",
    nopol: "",
  });

  const [result, setResult] = useState("");
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const handleChangeInput = (type) => (val) => {
    setFormInput({ ...formInput, [type]: val.target.value });
  };

  useEffect(() => {
    setFormInput({
      idreseller: form?.fullData?.kodeAgen ?? "",
      telp: form?.fullData?.telp ?? "",
      namareseller: form?.fullData?.nama ?? "",
      alamatreseller: form?.fullData?.alamat ?? "",
      jeniskelamin: form?.fullData?.jeniskelamin ?? "",
      merk: form?.fullData?.merk ?? "",
      nopol: form?.fullData?.nopol ?? "",
    });
  }, [form.userId]);

  const saveAction = async () => {
    if (formInput.idreseller.length === 0) return toast.error("Masukkan IDRS");
    const payload = {
      ...formInput,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminupdateuser",
          payload: JSON.stringify(payload),
        })
      )
    );
    // setForm({ driverId: "", trxId: "" });
    setResult(res.data.msg);
  };

  const getUser = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminfinduser",
          payload: JSON.stringify({ key: query }),
        })
      )
    );
    console.log(res.data.lobj);
    setUser(res.data.lobj);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="update-user" />
          <Content>
            <PageHeading title="Update User" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <div onClick={() => setModal(true)}>
                    <Input
                      label="User"
                      onChange={handleChange("isi")}
                      value={
                        form.userId.nama === ""
                          ? "Pilih User"
                          : form.userId.nama
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
                    title="Cari"
                    type="warning"
                    onClick={() => saveAction()}
                  />
                </Card>
                {form.userId.idrs !== "" && (
                  <Card>
                    <Input
                      label="IDRS"
                      onChange={handleChangeInput("idreseller")}
                      placeholder="IDRS"
                      value={formInput.idreseller}
                      readOnly
                    />
                    <Input
                      label="Telp"
                      onChange={handleChangeInput("telp")}
                      placeholder="Telp"
                      value={formInput.telp}
                    />
                    <Input
                      label="Nama Reseller"
                      onChange={handleChangeInput("namareseller")}
                      placeholder="Nama Reseller"
                      value={formInput.namareseller}
                    />
                    <Input
                      label="Alamat"
                      onChange={handleChangeInput("alamatreseller")}
                      placeholder="Alamat"
                      value={formInput.alamatreseller}
                    />
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <select
                        className="form-control"
                        onChange={handleChangeInput("jeniskelamin")}
                        value={formInput.jeniskelamin}
                      >
                        <option value="1">Laki Laki</option>
                        <option value="0">Perempuan</option>
                      </select>
                    </div>
                    <Input
                      label="Merk Kendaraan"
                      onChange={handleChangeInput("merk")}
                      placeholder="Merk"
                      value={formInput.merk}
                    />
                    <Input
                      label="Nopol"
                      onChange={handleChangeInput("nopol")}
                      placeholder="Nopol"
                      value={formInput.nopol}
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
                )}
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
            <Button title="Cari" type="warning" onClick={() => getUser()} />
          </div>
          {user.length !== 0 && (
            <>
              <hr />
              {user.map((item, index) => {
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
                              userId: {
                                idrs: item.kodeAgen,
                                nama: item.nama,
                              },
                              fullData: item,
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

export default UpdateUser;
