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
import lokasiList from "../../constants/lokasi.json";

function ListLokasi() {
  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="lokasi" />
          <Content>
            <PageHeading title="List Lokasi" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {lokasiList.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                        to={{
                          pathname: `/list-locmenu`,
                          search: `?idlokasi=${item.lokasi}`,
                        }}
                      >
                        <div className="card">
                          <div className="panel-body">
                            <h6>Lokasi {item.lokasi}</h6>
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

export default ListLokasi;
