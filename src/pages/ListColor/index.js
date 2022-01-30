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

function ListColor() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSetting = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "getcolor" }))
    );
    let newData = [];
    let result = res?.data?.lobj || [];
    result.map((item) => {
      return newData.push({ ...item, isEditing: false });
    });
    setResult(newData);
  };

  const saveAction = async (payload) => {
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setcolor",
          payload,
        })
      )
    );
    getSetting();
  };

  const editAction = async (item) => {
    const newArr = result.map((p) =>
      p.idapps === item.idapps ? { ...p, isEditing: !p.isEditing } : p
    );
    setResult(newArr);
    if (item.isEditing === true) {
      const payload = JSON.stringify({
        idapps: item.idapps,
        value: item.value,
        desc: item.desc,
      });
      saveAction(payload);
    }
  };

  const handleChange = async (item, type, value) => {
    const newArr = result.map((p) =>
      p.idapps === item.idapps ? { ...p, [type]: value } : p
    );
    setResult(newArr);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="color" />
          <Content>
            <PageHeading title="Warna Aplikasi" add to="/add-color" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <div
                        className="col-lg-3 col-md-6 col-12 col-sm-6"
                        key={id}
                      >
                        <div
                          className="card"
                          style={{ backgroundColor: it.value }}
                        >
                          <div
                            className="card-body no-padding height-9 mt-1 p-2"
                            style={{ backgroundColor: it.value }}
                          >
                            <ul className="list-group list-group-unbordered">
                              <li
                                className="list-group-item px-3"
                                style={{
                                  borderTop: "0px none",
                                  borderTopLeftRadius: "3px",
                                  borderTopRightRadius: "3px",
                                }}
                              >
                                <b>{it.idapps}</b>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center px-3">
                                {/* <b>Deskripsi</b> */}
                                {it.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control text-right"
                                    value={it.desc}
                                    onChange={(e) =>
                                      handleChange(it, "desc", e.target.value)
                                    }
                                    style={{ width: "100%" }}
                                  />
                                ) : (
                                  <div className="pull-right">{it.desc}</div>
                                )}
                              </li>
                              <li
                                className="list-group-item d-flex justify-content-between align-items-center px-3"
                                style={{
                                  borderBottomLeftRadius: 3,
                                  borderBottomRightRadius: 3,
                                }}
                              >
                                <b>Value</b>
                                {it.isEditing ? (
                                  <input
                                    type="color"
                                    className="form-control text-right"
                                    value={it.value}
                                    onChange={(e) =>
                                      handleChange(it, "value", e.target.value)
                                    }
                                    style={{ width: "50%" }}
                                  />
                                ) : (
                                  <div className="pull-right">{it.value}</div>
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

export default ListColor;
