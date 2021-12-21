/* eslint-disable array-callback-return */
import React from "react";
import {
  Container,
  ItemHome,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { Link } from "react-router-dom";
import items from "../../constants/menu.json";

function Dashboard() {
  return (
    <Wrapper>
      <Topbar />
      <Container>
        <Sidebar active="dashboard" />
        <div className="page-content-wrapper">
          <div className="page-content" style={{ minHeight: 1615 }}>
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
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Dashboard;
