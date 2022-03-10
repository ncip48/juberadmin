/* eslint-disable array-callback-return */
import React from "react";
import {
  Container,
  Content,
  ItemHome,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { Link } from "react-router-dom";
import items from "../../constants/menu.json";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="dashboard" />
          <Content>
            <PageHeading title="Dashboard" />
            <div className="row clearfix">
              {items.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                    to={item.to}
                  >
                    <ItemHome title={item.name} icon={item.icon} />
                  </Link>
                );
              })}
            </div>
          </Content>
        </Container>
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
