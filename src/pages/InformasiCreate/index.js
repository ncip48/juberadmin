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
import { GlobalService, InformationService } from "../../services";

function InformasiCreate({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    judul: "",
    isi: "",
    image: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const uploadImage = async (data) => {
    const res = await dispatch(_fetch(GlobalService.uploadFoto(data)));
    if (!res?.success) return;
    setForm({ ...form, image: res.file });
  };

  const deleteImage = async () => {
    const res = await dispatch(_fetch(GlobalService.deleteFoto(form?.image)));
    if (!res?.success) return;
    setForm({ ...form, image: "" });
  };

  const createAction = async () => {
    if (form.judul.length === 0) return toast.error("Masukkan Judul");
    if (form.isi.length === 0) return toast.error("Masukkan Isi");
    const payloadInfo = {
      judul: form.judul,
      image: form.image,
      isi: form.isi,
    };
    await dispatch(
      _fetch(
        InformationService.createInformasi({
          payload: JSON.stringify(payloadInfo),
        })
      )
    );
    setForm({ judul: "", isi: "", image: "" });
    setResult("Berhasil membuat informasi");
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="informasi" />
          <Content>
            <PageHeading title="Buat Informasi" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="Judul"
                    onChange={handleChange("judul")}
                    placeholder="Masukkan Judul"
                    value={form.judul}
                  />
                  <Input
                    label="Isi"
                    onChange={handleChange("isi")}
                    placeholder="Masukkan Isi"
                    multiline
                    rows="30"
                    value={form.isi}
                  />
                  {form.image.length === 0 ? (
                    <Input
                      accept="image/*"
                      label="Gambar"
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
                        src={form.image}
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

export default withRouter(InformasiCreate);
