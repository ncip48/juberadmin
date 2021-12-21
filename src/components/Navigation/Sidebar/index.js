/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clickMenuOpen } from "../../../redux/actions";
import { logout } from "../../../redux/actions/auth";
import items from "../../../constants/menu.json";

class Sidebar extends Component {
  // componentDidMount() {
  //   document.getElementById('body').classNameName = 'page-top';
  // }
  // state = {
  //   sidebarToggled: false,
  // }

  // handleSideBarToggle() {
  //   if (this.sidebarToogled === true) {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').classNameName = 'page-top sidebar-toggled';
  //   } else {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').classNameName = 'page-top';
  //   }

  // }

  doLogout() {
    const { logout, history } = this.props;
    logout();
    history.push("/login");
  }

  render() {
    const { toggled, active, user } = this.props;
    console.log(user);
    return (
      <div className="sidebar-container">
        <div
          className={
            toggled
              ? "sidemenu-container navbar-collapse collapse fixed-menu sidemenu-closed"
              : "sidemenu-container navbar-collapse collapse fixed-menu"
          }
        >
          <div id="remove-scroll">
            <ul
              className="sidemenu page-header-fixed p-t-20"
              data-keep-expanded="false"
              data-auto-scroll="true"
              data-slide-speed="200"
            >
              <li className="sidebar-toggler-wrapper hide">
                <div className="sidebar-toggler">
                  <span></span>
                </div>
              </li>
              <li className="sidebar-user-panel">
                <div className="user-panel">
                  <div className="pull-left image">
                    <img
                      src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
                      className="img-circle user-img-circle"
                      alt="User"
                    />
                  </div>
                  <div className="pull-left info">
                    <p className="text-white"> {user?.namars}</p>
                    <a title="Inbox" href="email_inbox.html">
                      <i className="material-icons">email</i>
                    </a>
                    <a title="Profile" href="user_profile.html">
                      <i className="material-icons">person</i>
                    </a>
                    <button title="Logout" onClick={() => this.doLogout()}>
                      <i className="material-icons">power_settings_new</i>
                    </button>
                  </div>
                </div>
              </li>
              <li className="menu-heading">
                <span>-- Main</span>
              </li>
              {items.map((item, index) => {
                return (
                  <li
                    className={
                      active === item.active ? "nav-item active" : "nav-item"
                    }
                    key={index}
                  >
                    <Link className="nav-link nav-toggle" to={item.to}>
                      <i className="material-icons">{item.icon}</i>
                      <span className="title">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
              {/* <li className="nav-item">
                <a href="#" className="nav-link nav-toggle">
                  <i className="material-icons">airport_shuttle</i>
                  <span className="title">Vehicle</span>
                  <span className="arrow"></span>
                </a>
                <ul className="sub-menu">
                  <li className="nav-item">
                    <a href="add_vehicle.html" className="nav-link ">
                      <span className="title">Add Vehicle Details</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="all_vehicles.html" className="nav-link ">
                      <span className="title">View All Vehicle</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="edit_vehicle.html" className="nav-link ">
                      <span className="title">Edit Vehicle Details</span>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickMenuOpen, logout }, dispatch);

const mapStateToProps = (store) => ({
  toggled: store.menuState.menuOpen,
  user: store.auth.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
