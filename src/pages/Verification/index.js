import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { cipher } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";
import { withRouter } from "react-router-dom";

function Verification({ history }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  const enc = cipher("akuimuet");

  useEffect(() => {
    getSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSetting = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminlistuser",
          payload: JSON.stringify({ doksts: 5 }),
        })
      )
    );
    console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const saveAction = async (payload) => {};

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="verifikasi" />
          <Content>
            <PageHeading title="Manage Verification" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <Link
                        key={id}
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center text-dark"
                        to={{
                          pathname: `/verification-details`,
                          search: `?id=${enc(it)}`,
                        }}
                      >
                        <div className="card">
                          <div className="panel-body">
                            <h6>{it.replace("#", " - ")}</h6>
                          </div>
                        </div>
                      </Link>
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

export default withRouter(Verification);
