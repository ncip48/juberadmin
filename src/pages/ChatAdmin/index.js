/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  RenderBox,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { cipher, formatDate } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { withRouter } from "react-router-dom";
import chat_api, { getSocketApi } from "../../api/websocket";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { socketHost } from "../../config";
import moment from "moment";

const ListUser = ({ item, active, onClick }) => {
  return (
    <div
      className={active ? "active" : "chat-inactive"}
      onClick={() => onClick(item)}
    >
      <div className="media chat-list">
        <div className="media-left thumb thumb-sm">
          <img
            alt=""
            className="media-object chat-img"
            src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
          />{" "}
        </div>
        <div className="media-body">
          <p className="media-heading" style={{ marginBottom: 0 }}>
            <span className="text-strong">
              {item.opponent[0].name ?? "Error"}
            </span>
            <small className="pull-right">
              {formatDate(item.Last_chat[0].chat_created_at, "hour:minute")}
            </small>
          </p>
          <small className="message text-muted">
            {item.Last_chat[0].chat_message ?? ""}
          </small>
        </div>
      </div>
    </div>
  );
};

function ChatAdmin({ history }) {
  const [result, setResult] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const enc = cipher("akuimuet");
  const [inputText, setInputText] = useState("");

  let socket = io(socketHost);

  const [messages, setMessages] = useState({});
  const [chatIsi, setChatIsi] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let params = {
      id: selectedItem?.you[0]?.nickname ?? user.idrs + "_adminjuber",
      senderIdrs: selectedItem?.opponent[0]?.nickname ?? "Error",
      token,
      isChat: true,
    };

    socket.emit("new user", params);
    getChatDetail();

    socket.on("error", (data) => {
      console.log("SocketEventError", data);
    });

    socket.on("disconnect", () => {
      //   this.setState({ isOnline: false });
    });

    socket.on("read", (data) => {
      // console.log('SocketEventRead', data);
      //   this.changeToRead();
    });

    socket.on("chat", (data) => {
      addNewChat(data);
    });

    socket.on("connection", () => {
      socket.emit("new user", params);
      // this.setState({isOnline: true});
    });

    return () => {
      socket.off("error");
      socket.off("chat");
      socket.off("read");
      socket.off("disconnect");
      socket.off("connection");
    };
  }, [selectedItem]);

  const getChatDetail = async () => {
    let data = await chat_api({
      method: getSocketApi.chat.detail_chat.method,
      url: getSocketApi.chat.detail_chat.url,
      payload: {
        idrs: selectedItem?.you[0]?.nickname ?? user.idrs + "_adminjuber",
        senderIdrs: selectedItem?.opponent[0]?.nickname ?? "Error",
        isUser: false,
      },
    });
    let response = data.data.reverse();
    setChatIsi(response);
  };

  const addNewChat = (datas) => {
    setChatIsi((currentArray) => [
      ...currentArray,
      {
        nama: datas.nama,
        picture: datas.picture,
        message: datas.message,
        created_at: moment().format(),
        idrs: datas.id,
        senderIdrs: datas.senderIdrs,
        is_user: datas.isUser,
        read: false,
        isError: false,
        data: !datas.data || datas.data == "" ? "{}" : datas.data,
      },
    ]);
    // console.log(datas);
  };

  const sendChat = (params) => {
    if (inputText === "") return;
    setInputText("");
    socket.emit("chat", params);
    // this.GroupedChat(state.data);
    addNewChat(params);
    // getList();
  };

  //   console.log(messages);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    // console.log("hit");
    let data = await chat_api({
      method: getSocketApi.chat.list_chat_user.method,
      url: getSocketApi.chat.list_chat_user.url,
      payload: {
        socket_nickname:
          user?.idrs == "JB3003" ? "JB3003_adminjuber" : "JB3097_adminjuber",
        is_user: false,
      },
    });
    // console.log(data);
    setResult(data?.data);
  };

  const setItem = (item) => {
    setSelectedItem(item);
  };

  //   console.log("isichat", chatIsi);

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="chat" />
          <Content>
            <PageHeading title="Chat Admin" />
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className={selectedItem ? "col-sm-4" : "col-sm-12"}>
                    <div className="card card-box">
                      <div className="card-head">
                        <header>User List</header>
                      </div>
                      <div className="card-body no-padding height-9">
                        <div
                          className="collapse collapse-xs collapse-sm show chat-page"
                          id="open-chats"
                        >
                          <div className="form-group mt-20 is-empty">
                            <input
                              type="text"
                              value=""
                              placeholder="Search..."
                              className="form-control"
                            />
                            <span className="material-input"></span>
                          </div>
                          <div
                            className="list-unstyled"
                            id="inbox"
                            style={{
                              maxHeight: 625,
                              overflowY: "scroll",
                              minHeight: 625,
                            }}
                          >
                            {result?.map((item, index) => {
                              return (
                                <ListUser
                                  item={item}
                                  key={index}
                                  onClick={(it) => setItem(it)}
                                  active={item?.id === selectedItem?.id}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedItem && (
                    <div className="col-sm-8">
                      <div className="card card-box">
                        <div className="card-head">
                          <header>
                            {selectedItem?.opponent[0]?.name.includes("%i")
                              ? selectedItem?.opponent[0]?.name
                                  .replace("%i", "")
                                  .replace("%i", "")
                              : selectedItem?.opponent[0]?.name}
                          </header>
                        </div>
                        <div className="card-body no-padding height-9">
                          <div className="">
                            <ScrollToBottom className="scroll-to-bottom">
                              <ul
                                className="chat nice-chat chat-page small-slimscroll-style"
                                style={{ marginTop: 10 }}
                              >
                                {chatIsi?.map((item, index) => {
                                  return (
                                    <RenderBox
                                      type={!item.is_user}
                                      msg={item.message}
                                      name={item.nama}
                                      date={item.created_at}
                                      data={item}
                                      key={index}
                                    />
                                  );
                                })}
                              </ul>
                            </ScrollToBottom>
                            <div className="box-footer chat-box-submit">
                              <form action="#" method="post">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    placeholder="Enter Chat"
                                    className="form-control"
                                    onChange={(e) =>
                                      setInputText(e.target.value)
                                    }
                                    value={inputText}
                                  />
                                  <span className="input-group-btn">
                                    <button
                                      type="button"
                                      className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-warning"
                                      onClick={() =>
                                        sendChat({
                                          data: {},
                                          id:
                                            selectedItem.you[0]?.nickname ??
                                            user.idrs + "_adminjuber",
                                          isUser: false,
                                          nama:
                                            selectedItem.you[0]?.name ??
                                            "Administrator",
                                          message: inputText,
                                          picture: "",
                                          senderIdrs:
                                            selectedItem.opponent[0].nickname,
                                        })
                                      }
                                    >
                                      Send{" "}
                                      <i className="fa fa-paper-plane-o"></i>
                                    </button>
                                  </span>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

export default withRouter(ChatAdmin);
