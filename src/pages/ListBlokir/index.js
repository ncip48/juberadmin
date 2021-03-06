import React from "react";
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
import lokasiList from "../../constants/lokasi_blokir.json";

function ListBlokir() {
  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="blokir" />
          <Content>
            <PageHeading title="List Menu" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {lokasiList.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                        to={item.to}
                      >
                        <div className="card">
                          <div className="panel-body mt-3">
                            <img
                              src={item.img}
                              style={{
                                height: "3rem",
                                width: "3rem",
                                objectFit: "contain",
                              }}
                              alt="i"
                            />
                            <h6>{item.nama}</h6>
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

export default ListBlokir;
