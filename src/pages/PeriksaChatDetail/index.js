/* eslint-disable eqeqeq */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  MarkupText,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { cipher, decipher, formatDate } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { withRouter } from "react-router-dom";
import chat_api, { getSocketApi } from "../../api/websocket";
import ScrollToBottom from "react-scroll-to-bottom";

const RenderBox = ({ msg, date, type, name, data }) => {
  //   let havePicture = data?.picture !== "" && data?.picture !== null;
  //   let haveAttachProduct = JSON.parse(data.data).type == "product_att";
  //   let attachProduct = JSON.parse(data.data).data;
  //   let haveAttachInv = JSON.parse(data?.data)?.type == "invoice_att";
  //   let attachInv = JSON.parse(data?.data)?.data;
  return (
    <li className={type == false ? "in" : "out"}>
      <img
        src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
        className="avatar"
        alt=""
      />
      <div
        className="message"
        style={{ maxWidth: 500, float: !type ? "left" : "right" }}
      >
        <span className="arrow"></span>{" "}
        <a className="name">
          {name.includes("%i")
            ? name.replace("%i", "").replace("%i", "")
            : name}
        </a>{" "}
        <span className="datetime">
          {formatDate(date, "date monthLess year hour:minute")}
        </span>{" "}
        <span className="body">{msg}</span>
      </div>
    </li>
  );
};

function PeriksaChatDetail({ history }) {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const dec = decipher("akuimuet");
  let prevData = JSON.parse(dec(id));
  const [result, setResult] = useState(null);
  //   console.log(prevData);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    let data = await chat_api({
      method: getSocketApi.chat.detail_chat_visible.method,
      url: getSocketApi.chat.detail_chat_visible.url,
      payload: {
        idrs: prevData.you[0].nickname,
        senderIdrs: prevData.opponent[0].nickname,
        isUser: true,
      },
    });
    // console.log(data.data);
    setResult(data?.data);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="periksachat" />
          <Content>
            <PageHeading title="Periksa Chat" />
            <div className="row">
              <div className="col-12">
                <div>
                  <div className="col-sm-8"></div>
                  <div className="card card-box">
                    <div className="card-head">
                      <header>
                        {prevData?.opponent[0]?.name.includes("%i")
                          ? prevData?.opponent[0]?.name
                              .replace("%i", "")
                              .replace("%i", "")
                          : prevData?.opponent[0]?.name}
                      </header>
                    </div>
                    <div className="card-body no-padding height-9">
                      <div className="">
                        <ScrollToBottom className="scroll-to-bottom">
                          <ul
                            className="chat nice-chat chat-page small-slimscroll-style"
                            style={{ marginTop: 10 }}
                          >
                            {result?.reverse()?.map((item, index) => {
                              return (
                                <RenderBox
                                  type={item.is_user}
                                  msg={item.message}
                                  name={item.nama}
                                  date={item.created_at}
                                  data={item.data}
                                  key={index}
                                />
                              );
                            })}
                          </ul>
                        </ScrollToBottom>
                        {/* <div className="box-footer chat-box-submit">
                          <form action="#" method="post">
                            <div className="input-group">
                              <input
                                type="text"
                                name="message"
                                placeholder="Enter Chat"
                                className="form-control"
                              />
                              <span className="input-group-btn">
                                <button
                                  type="button"
                                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-warning"
                                >
                                  Send <i className="fa fa-paper-plane-o"></i>
                                </button>
                              </span>{" "}
                            </div>
                          </form>
                        </div> */}
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

export default withRouter(PeriksaChatDetail);
