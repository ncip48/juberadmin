import React, { useState } from "react";
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
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function CheckAccount() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState("");

  const checkAction = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "searchphone",
          payload: JSON.stringify({ telp: phone }),
        })
      )
    );
    setResult(res.data.msg);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="check" />
          <Content>
            <PageHeading title="Cek Akun" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <Input
                    label="No HP"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Button
                    title="Submit"
                    type="pink"
                    onClick={() => checkAction()}
                  />
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

export default CheckAccount;
