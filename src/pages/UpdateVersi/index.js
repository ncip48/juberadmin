import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

function UpdateVersi() {
  const dispatch = useDispatch();
  const [versi, setVersi] = useState("");
  const [result, setResult] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    checkVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkVersion = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "application/version/check",
          method: "POST",
        })
      )
    );
    setVersion(res?.data?.data?.config);
  };

  const checkAction = async () => {
    if (versi.length === 0) return toast.error("Masukkan Versi Terbaru");
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "application/version/update",
          method: "POST",
          payload: JSON.stringify({ version: versi }),
        })
      )
    );
    setResult(res?.data?.message);
    checkVersion();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="update" />
          <Content>
            <PageHeading title="Update Versi" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <>
                    <div className="alert alert-primary">
                      Versi Sekarang = {version}
                    </div>
                  </>
                  <Input
                    label="Masukkan Versi"
                    onChange={(e) => setVersi(e.target.value)}
                    placeholder={versi}
                  />
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => checkAction()}
                  />
                  {result?.length !== 0 && (
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

export default UpdateVersi;
