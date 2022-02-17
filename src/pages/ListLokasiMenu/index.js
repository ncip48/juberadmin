import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  AutoComplete,
  Container,
  Content,
  Input,
  Modal,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
  Button,
} from "../../components";
import { _fetch, _fetch_nomsg } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function ListLokasiMenu() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [resultMenu, setResultMenu] = useState(null);
  const [modal, setModal] = useState(false);
  const { search } = useLocation();
  const lokasi = new URLSearchParams(search).get("idlokasi");
  const [form, setForm] = useState({
    menu: "",
    note: "",
  });
  const [clickQuery, setClickQuery] = useState(null);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val });
  };

  console.log(form);

  useEffect(() => {
    getLokasi();
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.menu]);

  const getLokasi = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getlokasimenu",
          payload: JSON.stringify({ lokasi }),
        }),
        false
      )
    );
    console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const getMenu = async () => {
    const res = await dispatch(
      _fetch_nomsg(
        BridgeService.JbDelivery({
          key: "carimenu",
          payload: JSON.stringify({ nama: form.menu }),
        }),
        false
      )
    );
    // console.log(res.data.lobj);
    setResultMenu(res?.data?.lobj);
  };

  const addMenu = () => {
    setResult([
      ...result,
      {
        id: clickQuery.id,
        nama: clickQuery.nama,
        notes: form.note,
        baru: true,
      },
    ]);
    setModal(false);
  };

  const simpan = async () => {
    const joinedId = result?.map((elem) => elem.id).join("#");
    const joinedNotes = result
      ?.map((elem) => elem.id + "#" + elem.notes)
      .join("-");
    const payload = {
      lokasi,
      id: joinedId,
      notes: joinedNotes,
    };
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setlokasimenu",
          payload: JSON.stringify(payload),
        }),
        false
      )
    );
    getLokasi();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="lokasi" />
          <Content>
            <PageHeading
              title={`Lokasi ${lokasi}`}
              add
              onAdd={() => setModal(true)}
            />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                      >
                        <div
                          className={`card ${item?.baru ? "bg-success" : ""}`}
                        >
                          <div className="panel-body">
                            <h6>{item.nama}</h6>
                            <h6>({item.id})</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => simpan()}
                  >
                    <div className="card bg-danger">
                      <div className="panel-body">
                        <h6>Simpan</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Container>
        <Modal show={modal} onHide={() => setModal(false)}>
          <AutoComplete
            suggestions={resultMenu}
            onChangeText={(val) => handleChange("menu")(val)}
            onClickText={(val) => setClickQuery(val)}
          />
          <div className="mt-4">
            <Input
              label="Notes"
              onChange={(e) => handleChange("note")(e.target.value)}
              placeholder="Masukkan Notes"
              value={form.note}
            />
          </div>
          <div className="d-flex justify-content-center align-items-end">
            <Button
              title="Tambahkan"
              type="warning"
              onClick={() => addMenu()}
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

export default ListLokasiMenu;
