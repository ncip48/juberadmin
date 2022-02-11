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
import { formatRupiah } from "../../helpers";

function BonusReferal() {
  const dispatch = useDispatch();
  const [form, setForm] = useState("");
  const [result, setResult] = useState("");
  const [bonus, setBonus] = useState("");

  useEffect(() => {
    checkVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkVersion = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getbonusreferal",
        })
      )
    );
    setBonus(
      res?.data?.lobj[0]?.desc + " = " + formatRupiah(res?.data?.lobj[0].value)
    );
  };

  const checkAction = async () => {
    if (form.length === 0) return toast.error("Masukkan Bonus Referal");
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "setbonusreferal",
          payload: JSON.stringify({ value: form }),
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
          <Sidebar active="bonus-referal" />
          <Content>
            <PageHeading title="Bonus Referal" />
            <div className="row">
              <div className="col-12">
                <Card>
                  <>
                    <div className="alert alert-primary">{bonus}</div>
                  </>
                  <Input
                    label="Masukkan Bonus"
                    onChange={(e) => setForm(e.target.value)}
                    value={form}
                    placeholder="5000"
                  />
                  <Button
                    title="Submit"
                    type="warning"
                    onClick={() => checkAction()}
                  />
                  {result?.length !== 0 && (
                    <>
                      <hr />
                      <div className="alert alert-success">
                        Set Bonus Saldo Sukses
                      </div>
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

export default BonusReferal;
