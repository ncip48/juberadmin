/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clickMenuOpen } from "../../../redux/actions";

class Topbar extends Component {
  render() {
    // const { clickMenuOpen } = this.props;

    return (
      <div className="page-header navbar navbar-fixed-top">
        <div className="page-header-inner ">
          <div className="page-logo">
            <Link to="/dashboard">
              <img
                alt=""
                src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/72x72/4af7d493734b0de09f97029ab846ed43/image_38.png"
                style={{ height: 40, width: 40 }}
              />
              <span className="logo-default ml-2">Juber</span>
            </Link>
          </div>
          {/* <ul className="nav navbar-nav navbar-left in">
            <li>
              <div
                onClick={() => clickMenuOpen()}
                className="menu-toggler sidebar-toggler font-size-23"
              >
                <i className="fa fa-bars"></i>
              </div>
            </li>
          </ul> */}
          <form className="search-form-opened" action="#" method="GET">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                name="query"
              />
              <span className="input-group-btn search-btn">
                <a className="btn submit">
                  <i className="fa fa-search"></i>
                </a>
              </span>
            </div>
          </form>

          <a
            className="menu-toggler responsive-toggler"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span></span>
          </a>

          <div className="top-menu">
            <ul className="nav navbar-nav pull-right">
              <li
                className="dropdown dropdown-extended dropdown-notification"
                id="header_notification_bar"
              >
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-close-others="true"
                >
                  <i className="fa fa-bell-o"></i>
                  <span className="notify"></span>
                  <span className="heartbeat"></span>
                </a>
                <ul className="dropdown-menu pullDown">
                  <li className="external">
                    <h3>
                      <span className="bold">Notifications</span>
                    </h3>
                    <span className="notification-label purple-bgcolor">
                      New 6
                    </span>
                  </li>
                  <li>
                    <ul
                      className="dropdown-menu-list small-slimscroll-style"
                      data-handle-color="#637283"
                    >
                      <li>
                        <a>
                          <span className="time">just now</span>
                          <span className="details">
                            <span className="notification-icon circle deepPink-bgcolor box-shadow-1">
                              <i className="fa fa-check"></i>
                            </span>{" "}
                            Congratulations!.{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="time">3 mins</span>
                          <span className="details">
                            <span className="notification-icon circle purple-bgcolor box-shadow-1">
                              <i className="fa fa-user o"></i>
                            </span>
                            <b>John Micle </b>is now following you.{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="time">7 mins</span>
                          <span className="details">
                            <span className="notification-icon circle blue-bgcolor box-shadow-1">
                              <i className="fa fa-comments-o"></i>
                            </span>
                            <b>Sneha Jogi </b>sent you a message.{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="time">12 mins</span>
                          <span className="details">
                            <span className="notification-icon circle pink box-shadow-1">
                              <i className="fa fa-heart"></i>
                            </span>
                            <b>Ravi Patel </b>like your photo.{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="time">15 mins</span>
                          <span className="details">
                            <span className="notification-icon circle yellow box-shadow-1">
                              <i className="fa fa-warning"></i>
                            </span>{" "}
                            Warning!{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="time">10 hrs</span>
                          <span className="details">
                            <span className="notification-icon circle red box-shadow-1">
                              <i className="fa fa-times"></i>
                            </span>{" "}
                            Application error.{" "}
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown-menu-footer">
                      <a> All notifications </a>
                    </div>
                  </li>
                </ul>
              </li>

              <li
                className="dropdown dropdown-extended dropdown-inbox"
                id="header_inbox_bar"
              >
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-close-others="true"
                >
                  <i className="fa fa-envelope-o"></i>
                  <span className="notify"></span>
                  <span className="heartbeat"></span>
                </a>
                <ul className="dropdown-menu animated pullDown">
                  <li className="external">
                    <h3>
                      <span className="bold">Messages</span>
                    </h3>
                    <span className="notification-label cyan-bgcolor">
                      New 2
                    </span>
                  </li>
                  <li>
                    <ul
                      className="dropdown-menu-list small-slimscroll-style"
                      data-handle-color="#637283"
                    >
                      <li>
                        <a href="#">
                          <span className="photo">
                            <img
                              src="../../assets/img/user/user2.jpg"
                              className="img-circle"
                              alt=""
                            />{" "}
                          </span>
                          <span className="subject">
                            <span className="from"> Sarah Smith </span>
                            <span className="time">Just Now </span>
                          </span>
                          <span className="message">
                            {" "}
                            Jatin I found you on LinkedIn...{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="photo">
                            <img
                              src="../../assets/img/user/user3.jpg"
                              className="img-circle"
                              alt=""
                            />{" "}
                          </span>
                          <span className="subject">
                            <span className="from"> John Deo </span>
                            <span className="time">16 mins </span>
                          </span>
                          <span className="message">
                            {" "}
                            Fwd: Important Notice Regarding Your Domain Name...{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="photo">
                            <img
                              src="../../assets/img/user/user1.jpg"
                              className="img-circle"
                              alt=""
                            />{" "}
                          </span>
                          <span className="subject">
                            <span className="from"> Rajesh </span>
                            <span className="time">2 hrs </span>
                          </span>
                          <span className="message">
                            {" "}
                            pls take a print of attachments.{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="photo">
                            <img
                              src="../../assets/img/user/user8.jpg"
                              className="img-circle"
                              alt=""
                            />{" "}
                          </span>
                          <span className="subject">
                            <span className="from"> Lina Smith </span>
                            <span className="time">40 mins </span>
                          </span>
                          <span className="message">
                            {" "}
                            Apply for Ortho Surgeon{" "}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="photo">
                            <img
                              src="../../assets/img/user/user5.jpg"
                              className="img-circle"
                              alt=""
                            />{" "}
                          </span>
                          <span className="subject">
                            <span className="from"> Jacob Ryan </span>
                            <span className="time">46 mins </span>
                          </span>
                          <span className="message">
                            {" "}
                            Request for leave application.{" "}
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown-menu-footer">
                      <a href="#"> All Messages </a>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="dropdown dropdown-user">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-close-others="true"
                >
                  <img
                    alt=""
                    className="img-circle "
                    src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-default animated jello">
                  <li>
                    <a href="user_profile.html">
                      <i className="fa fa-user-o"></i> Profile{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cogs"></i> Settings
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-question-circle"></i> Help
                    </a>
                  </li>
                  <li className="divider"> </li>
                  <li>
                    <a href="lock_screen.html">
                      <i className="fa fa-lock"></i> Lock
                    </a>
                  </li>
                  <li>
                    <a href="login.html">
                      <i className="fa fa-sign-out"></i> Log Out{" "}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = (store) => ({
  toggled: store.menuState.menuOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
