import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { formatDate, formatRupiah } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

const BoxUser = ({ item, type }) => {
  return (
    <div className="card card-topline-red">
      <div className="card-head card-topline-red text-center">
        <header>{type}</header>
      </div>
      <div className="card-body no-padding height-9">
        <div className="row">
          <div className="profile-userpic">
            <img
              src="../../assets/img/driver.jpg"
              className="img-responsive"
              alt=""
            />{" "}
          </div>
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name"> John Deo </div>
        </div>
        {/* <ul className="list-group list-group-unbordered">
          <li className="list-group-item">
            <b>Followers</b> <a className="pull-right">1,200</a>
          </li>
          <li className="list-group-item">
            <b>Following</b> <a className="pull-right">750</a>
          </li>
          <li className="list-group-item">
            <b>Friends</b> <a className="pull-right">11,172</a>
          </li>
        </ul>
        <div className="profile-userbuttons">
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-primary"
          >
            Follow
          </button>
          <button
            type="button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-pink"
          >
            Message
          </button>
        </div> */}
      </div>
    </div>
  );
};

function PenjualanDetail() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVoucher = async () => {
    const res = await dispatch(
      _fetch(BridgeService.JbDelivery({ key: "allvoucher" }))
    );
    // console.log(res.data.lobj);
    setResult(res?.data?.lobj);
  };

  const deleteAction = async (id) => {
    await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "deletevoucher",
          payload: JSON.stringify({ id }),
        })
      )
    );
    // console.log(res.data.lobj);
    getVoucher();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="penjualan" />
          <Content>
            <PageHeading title="Detail Penjualan" />
            <div className="row">
              <div className="col-md-12">
                <div className="profile-sidebar">
                  <BoxUser type="Penjual" />
                  <BoxUser type="Pembeli" />
                </div>
                <div className="profile-content">
                  <div className="row">
                    <div className="profile-tab-box">
                      <div className="p-l-20">
                        <ul className="nav ">
                          <li className="nav-item tab-all">
                            <a
                              className="nav-link active show"
                              href="#tab1"
                              data-toggle="tab"
                            >
                              About Me
                            </a>
                          </li>
                          <li className="nav-item tab-all p-l-20">
                            <a
                              className="nav-link"
                              href="#tab2"
                              data-toggle="tab"
                            >
                              Activity
                            </a>
                          </li>
                          <li className="nav-item tab-all p-l-20">
                            <a
                              className="nav-link"
                              href="#tab3"
                              data-toggle="tab"
                            >
                              Settings
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="white-box">
                      <div className="tab-content">
                        <div
                          className="tab-pane active fontawesome-demo"
                          id="tab1"
                        >
                          <div id="biography">
                            <div className="row">
                              <div className="col-md-3 col-6 b-r">
                                {" "}
                                <strong>Full Name</strong>
                                <br />
                                <p className="text-muted">John Deo</p>
                              </div>
                              <div className="col-md-3 col-6 b-r">
                                {" "}
                                <strong>Mobile</strong>
                                <br />
                                <p className="text-muted">(123) 456 7890</p>
                              </div>
                              <div className="col-md-3 col-6 b-r">
                                {" "}
                                <strong>Email</strong>
                                <br />
                                <p className="text-muted">
                                  johndeo@example.com
                                </p>
                              </div>
                              <div className="col-md-3 col-6">
                                {" "}
                                <strong>Location</strong>
                                <br />
                                <p className="text-muted">India</p>
                              </div>
                            </div>
                            <hr />
                            <p className="m-t-30">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque varius luctus accumsan. Nunc
                              vulputate, mi eget faucibus pulvinar, arcu metus
                              mattis lectus, id commodo purus justo non turpis.
                            </p>
                            <p>
                              Aenean eget ultrices mi, eget interdum tortor.
                              Aenean eget imperdiet nulla. Vestibulum venenatis
                              eu ipsum et faucibus. Fusce venenatis lobortis
                              nisi, sit amet fringilla risus vehicula non.
                              Quisque vel rutrum lacus.{" "}
                            </p>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged.
                            </p>
                            <br />
                            <h4 className="font-bold">Education</h4>
                            <hr />
                            <ul>
                              <li>B.A.,Gujarat University, Ahmedabad,India.</li>
                              <li>
                                M.A.,Gujarat University, Ahmedabad, India.
                              </li>
                              <li>P.H.D., Shaurashtra University, Rajkot</li>
                            </ul>
                            <br />
                            <h4 className="font-bold">Experience</h4>
                            <hr />
                            <ul>
                              <li>
                                One year experience as Jr. Professor from
                                April-2009 to march-2010 at B. J. Arts College,
                                Ahmedabad.
                              </li>
                              <li>
                                Three year experience as Jr. Professor at V.S.
                                Arts &amp; Commerse Collage from April - 2008 to
                                April - 2011.
                              </li>
                              <li>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
                              </li>
                              <li>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
                              </li>
                              <li>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
                              </li>
                              <li>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
                              </li>
                            </ul>
                            <br />
                            <h4 className="font-bold">Vehicle Information</h4>
                            <hr />
                            <div className="row">
                              <div className="col-md-3">Licence Number:</div>
                              <div className="col-md-9">534534634</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Cab Type:</div>
                              <div className="col-md-9">SUV</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Cab Model:</div>
                              <div className="col-md-9">XUV</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Seating Capacity:</div>
                              <div className="col-md-9">5</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Cab Number:</div>
                              <div className="col-md-9">XP 09 4564</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Tax Renewal Date:</div>
                              <div className="col-md-9">05-07-2018</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                Insurance Renewal Date:
                              </div>
                              <div className="col-md-9">25-04-2018</div>
                            </div>
                            <br />
                          </div>
                        </div>
                        <div className="tab-pane" id="tab2">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="full-width p-l-20">
                                <div className="panel">
                                  <form>
                                    <textarea
                                      className="form-control p-text-area"
                                      rows="4"
                                      placeholder="Whats in your mind today?"
                                    ></textarea>
                                  </form>
                                  <footer className="panel-footer">
                                    <button className="btn btn-post pull-right">
                                      Post
                                    </button>
                                    <ul className="nav nav-pills p-option">
                                      <li>
                                        <a href="#">
                                          <i className="fa fa-user"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fa fa-camera"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fa  fa-location-arrow"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fa fa-meh-o"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </footer>
                                </div>
                              </div>
                              <div className="full-width p-l-20">
                                <ul className="activity-list">
                                  <li>
                                    <div className="avatar">
                                      <img
                                        src="../../assets/img/user/user1.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="activity-desk">
                                      <h5>
                                        <a href="#">Rajesh</a>{" "}
                                        <span>Uploaded 3 new photos</span>
                                      </h5>
                                      <p className="text-muted">
                                        7 minutes ago near Alaska, USA
                                      </p>
                                      <div className="album">
                                        <a href="#">
                                          <img
                                            alt=""
                                            src="../../assets/img/mega-img1.jpg"
                                          />
                                        </a>
                                        <a href="#">
                                          <img
                                            alt=""
                                            src="../../assets/img/mega-img2.jpg"
                                          />
                                        </a>
                                        <a href="#">
                                          <img
                                            alt=""
                                            src="../../assets/img/mega-img3.jpg"
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="avatar">
                                      <img
                                        src="../../assets/img/user/user3.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="activity-desk">
                                      <h5>
                                        <a href="#">John Doe</a>{" "}
                                        <span>attended a meeting with</span>
                                        <a href="#">Lina Smith.</a>
                                      </h5>
                                      <p className="text-muted">
                                        2 days ago near Alaska, USA
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="avatar">
                                      <img
                                        src="../../assets/img/user/user4.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="activity-desk">
                                      <h5>
                                        <a href="#">Kehn Anderson</a>{" "}
                                        <span>
                                          completed the task “wireframe design”
                                          within the dead line
                                        </span>
                                      </h5>
                                      <p className="text-muted">
                                        4 days ago near Alaska, USA
                                      </p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="avatar">
                                      <img
                                        src="../../assets/img/user/user5.jpg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="activity-desk">
                                      <h5>
                                        <a href="#">Jacob Ryan</a>{" "}
                                        <span>
                                          was absent office due to sickness
                                        </span>
                                      </h5>
                                      <p className="text-muted">
                                        4 days ago near Alaska, USA
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                                <div className="post-box">
                                  {" "}
                                  <span className="text-muted text-small">
                                    <i
                                      className="fa fa-clock-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    13 minutes ago
                                  </span>
                                  <div className="post-img">
                                    <img
                                      src="../../assets/img/slider/fullimage1.jpg"
                                      className="img-responsive"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <h4 className="">
                                      Lorem Ipsum is simply dummy text of the
                                      printing
                                    </h4>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s,{" "}
                                    </p>
                                    <p>
                                      {" "}
                                      <a
                                        href=""
                                        className="btn btn-raised btn-info btn-sm"
                                      >
                                        <i
                                          className="fa fa-heart-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Like (5){" "}
                                      </a>{" "}
                                      <a
                                        href=""
                                        className="btn btn-raised bg-soundcloud btn-sm"
                                      >
                                        <i className="zmdi zmdi-long-arrow-return"></i>{" "}
                                        Reply
                                      </a>{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="post-box">
                                  {" "}
                                  <span className="text-muted text-small">
                                    <i
                                      className="fa fa-clock-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    37 minutes ago
                                  </span>
                                  <div className="post-img">
                                    <img
                                      src="../../assets/img/slider/fullimage2.jpg"
                                      className="img-responsive"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <h4 className="">
                                      Lorem Ipsum is simply dummy text of the
                                      printing
                                    </h4>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s,{" "}
                                    </p>
                                    <p>
                                      {" "}
                                      <a
                                        href=""
                                        className="btn btn-raised btn-info btn-sm"
                                      >
                                        <i
                                          className="fa fa-heart-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Like (5){" "}
                                      </a>{" "}
                                      <a
                                        href=""
                                        className="btn btn-raised bg-soundcloud btn-sm"
                                      >
                                        <i className="zmdi zmdi-long-arrow-return"></i>{" "}
                                        Reply
                                      </a>{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="post-box">
                                  {" "}
                                  <span className="text-muted text-small">
                                    <i
                                      className="fa fa-clock-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    53 minutes ago
                                  </span>
                                  <div className="post-img">
                                    <img
                                      src="../../assets/img/slider/fullimage3.jpg"
                                      className="img-responsive"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <h4 className="">
                                      Lorem Ipsum is simply dummy text of the
                                      printing
                                    </h4>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s,{" "}
                                    </p>
                                    <p>
                                      {" "}
                                      <a
                                        href=""
                                        className="btn btn-raised btn-info btn-sm"
                                      >
                                        <i
                                          className="fa fa-heart-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Like (5){" "}
                                      </a>{" "}
                                      <a
                                        href=""
                                        className="btn btn-raised bg-soundcloud btn-sm"
                                      >
                                        <i className="zmdi zmdi-long-arrow-return"></i>{" "}
                                        Reply
                                      </a>{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-12 p-t-20 text-center">
                                  <button
                                    type="button"
                                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-info"
                                  >
                                    Load More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab3">
                          <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <div className="card-head">
                                <header>Password Change</header>
                                <button
                                  id="panel-button2"
                                  class="mdl-button mdl-js-button mdl-button--icon pull-right"
                                  data-upgraded=",MaterialButton"
                                >
                                  <i class="material-icons">more_vert</i>
                                </button>
                                <ul
                                  class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                  data-mdl-for="panel-button2"
                                >
                                  <li class="mdl-menu__item">
                                    <i className="material-icons">
                                      assistant_photo
                                    </i>
                                    Action
                                  </li>
                                  <li class="mdl-menu__item">
                                    <i className="material-icons">print</i>
                                    Another action
                                  </li>
                                  <li class="mdl-menu__item">
                                    <i className="material-icons">favorite</i>
                                    Something else here
                                  </li>
                                </ul>
                              </div>
                              <div className="card-body " id="bar-parent1">
                                <form>
                                  <div className="form-group">
                                    <label for="simpleFormEmail">
                                      User Name
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="simpleFormEmail"
                                      placeholder="Enter user name"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label for="simpleFormPassword">
                                      Current Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="simpleFormPassword"
                                      placeholder="Current Password"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label for="simpleFormPassword">
                                      New Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="newpassword"
                                      placeholder="New Password"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default PenjualanDetail;
