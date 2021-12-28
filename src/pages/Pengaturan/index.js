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

function Pengaturan() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSetting = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "allsetting" }))
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
          key: "savesetting",
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
        list: [{ idapps: item.idapps, desc: item.desc, value: item.value }],
      });
      saveAction(payload);
    }
  };

  const handleChange = async (item, value) => {
    const newArr = result.map((p) =>
      p.idapps === item.idapps ? { ...p, value: value } : p
    );
    setResult(newArr);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="setting" />
          <Content>
            <PageHeading title="Pengaturan" />
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
                                <b>{it.desc}</b>
                                <div className="pull-right">{it.namapromo}</div>
                              </li>
                              <li className="list-group-item">
                                {it.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={it.value}
                                    onChange={(e) =>
                                      handleChange(it, e.target.value)
                                    }
                                  />
                                ) : (
                                  <div className="pull-left">{it.value}</div>
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

export default Pengaturan;
