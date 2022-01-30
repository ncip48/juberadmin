import moment from "moment";
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
import { BridgeService } from "../../services";

function MonitorBroadcast({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    trxid: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const createAction = async () => {
    if (form.trxid.length === 0) return toast.error("Masukkan Trx Id");
    const payload = {
      ...form,
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "monitorBroadcast",
          payload: JSON.stringify(payload),
        })
      )
    );
    console.log(res);
    setResult(res?.data?.lobj);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="monitor-broadcast" />
          <Content>
            <PageHeading title="Monitor Broadcast" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="TRX Id"
                    onChange={handleChange("trxid")}
                    placeholder="JBXXXXXX"
                    value={form.trxid}
                  />
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      title="Submit"
                      type="warning"
                      onClick={() => createAction()}
                    />
                  </div>
                </Card>
              </div>
            </div>
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

export default withRouter(MonitorBroadcast);
