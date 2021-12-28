import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function PengaturanAllIn() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSetting = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "settingjballin" }))
    );
    let newData = [];
    let result = res.data.lobj;
    result.map((item) => {
      return newData.push({ ...item, isEditing: false });
    });
    setResult(newData);
  };

  const saveAction = async (payload) => {
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "savesettingallin",
          payload,
        })
      )
    );
    getSetting();
  };

  const editAction = async (item) => {
    const newArr = result.map((p) =>
      p.idsetting === item.idsetting ? { ...p, isEditing: !p.isEditing } : p
    );
    setResult(newArr);
    if (item.isEditing === true) {
      const payload = JSON.stringify({
        listallin: [
          {
            idsetting: item.idsetting,
            jaraktambahan: Number(item.jaraktambahan),
            ongkir: Number(item.ongkir),
            tambahan: Number(item.tambahan),
          },
        ],
      });
      saveAction(payload);
    }
  };

  const handleChange = async (item, type, value) => {
    const newArr = result.map((p) =>
      p.idsetting === item.idsetting ? { ...p, [type]: value } : p
    );
    setResult(newArr);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="setting-all-in" />
          <Content>
            <PageHeading title="Pengaturan All In" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-12 col-sm-6"
                        key={id}
                      >
                        <div className="card card-topline-yellow">
                          <div className="card-body no-padding height-9 mt-1">
                            <ul className="list-group list-group-unbordered">
                              <li
                                className="list-group-item"
                                style={{ borderTop: "0px none" }}
                              >
                                <b>{it.nmLayanan}</b>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Ongkir</b>
                                {it.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control text-right"
                                    value={it.ongkir}
                                    onChange={(e) =>
                                      handleChange(it, "ongkir", e.target.value)
                                    }
                                    style={{ width: "50%" }}
                                  />
                                ) : (
                                  <div className="pull-right">{it.ongkir}</div>
                                )}
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Jarak Tambahan</b>
                                {it.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control text-right"
                                    value={it.jaraktambahan}
                                    onChange={(e) =>
                                      handleChange(
                                        it,
                                        "jaraktambahan",
                                        e.target.value
                                      )
                                    }
                                    style={{ width: "50%" }}
                                  />
                                ) : (
                                  <div className="pull-right">
                                    {it.jaraktambahan}
                                  </div>
                                )}
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Tambahan</b>
                                {it.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control text-right"
                                    value={it.tambahan}
                                    onChange={(e) =>
                                      handleChange(
                                        it,
                                        "tambahan",
                                        e.target.value
                                      )
                                    }
                                    style={{ width: "50%" }}
                                  />
                                ) : (
                                  <div className="pull-right">
                                    {it.tambahan}
                                  </div>
                                )}
                              </li>
                            </ul>
                            <div className="profile-userbuttons">
                              <button
                                type="button"
                                className={`mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle ${
                                  it.isEditing ? "btn-danger" : "btn-warning"
                                }`}
                                data-upgraded=",MaterialButton,MaterialRipple"
                                onClick={() => editAction(it)}
                              >
                                {it.isEditing ? "Simpan" : "Edit"}
                                <span className="mdl-button__ripple-container">
                                  <span className="mdl-ripple"></span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Content>
        </Container>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default PengaturanAllIn;
