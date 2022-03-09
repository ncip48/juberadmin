/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";

class NotFound extends Component {
  render() {
    const history = this.props.history;
    return (
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="" />
          <Content>
            <PageHeading title="Not Found" />
            <div id="content">
              <div className="container-fluid">
                {/* <!-- 404 Error Text --> */}
                <div className="text-center">
                  <div className="error mx-auto" data-text="404">
                    404
                  </div>
                  <p className="lead text-gray-800 mb-5">Page Not Found</p>
                  <p className="text-gray-500 mb-0">
                    It looks like you found a glitch in the matrix...
                  </p>
                  <a href="#" onClick={() => history.goBack()}>
                    &larr; Back to main
                  </a>
                </div>
              </div>
            </div>
          </Content>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(NotFound);
