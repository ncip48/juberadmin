import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CardBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      noHead: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.title ? this.props.title : "Basic Card Example",
      noHead: this.props.noHead ?? false,
      edit: this.props.edit ?? false,
    });
  }

  render() {
    return (
      <div className="card shadow mb-4">
        {!this.state.noHead && (
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-danger">
              {this.state.edit && (
                <i className="pt-2 mr-1 fa fa-list-alt fa-fw"></i>
              )}
              {this.state.title}
              {this.state.edit && (
                <div className="float-right">
                  <div
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-block btn-warning text-dark btn-sm"
                  >
                    <i className="fa fa-angle-double-left"></i> Kembali
                  </div>
                </div>
              )}
            </h6>
          </div>
        )}
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(CardBasic);
