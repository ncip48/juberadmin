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

function ListMenuTop() {
  const result = [
    {
      name: "Marketplace",
      to: "top-market",
    },
    {
      name: "Produk Food",
      to: "top-food",
    },
  ];
  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="topmerchant" />
          <Content>
            <PageHeading title="List Menu" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                        to={{
                          pathname: item.to,
                        }}
                      >
                        <div className="card ">
                          <div className="panel-body">
                            <h6>{item.name}</h6>
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

export default ListMenuTop;
