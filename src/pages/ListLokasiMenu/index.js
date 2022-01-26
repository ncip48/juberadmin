import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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

function ListLokasiMenu() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const { search } = useLocation();
  const lokasi = new URLSearchParams(search).get("idlokasi");

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMenu = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "getlokasimenu",
          payload: JSON.stringify({ lokasi }),
        }),
        false
      )
    );
    // console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const simpan = async () => {
    const joinedId = result?.map((elem) => elem.id).join("#");
    const joinedNotes = result
      ?.map((elem) => elem.id + "#" + elem.notes)
      .join("-");
    console.log(joinedId);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="lokasi" />
          <Content>
            <PageHeading title={`Lokasi ${lokasi}`} add to="/create-menu" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                      >
                        <div className="card circle">
                          <div className="panel-body">
                            <h6>{item.nama}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                    onClick={() => simpan()}
                  >
                    <div className="card circle bg-danger">
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
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default ListLokasiMenu;
