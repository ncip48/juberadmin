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
import { BridgeService } from "../../services";
import { withRouter } from "react-router-dom";
import chat_api, { getSocketApi } from "../../api/websocket";

function PeriksaChatSee({ history }) {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const [result, setResult] = useState(null);
  const dec = decipher("akuimuet");
  let prevData = JSON.parse(dec(id));
  const enc = cipher("akuimuet");

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    let data = await chat_api({
      method: getSocketApi.chat.list_chat_user.method,
      url: getSocketApi.chat.list_chat_user.url,
      payload: {
        socket_nickname: prevData.chat_idrs,
        is_user: true,
      },
    });
    console.log(data);
    setResult(data?.data);
  };

  const saveAction = async (payload) => {};

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
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <Link
                        key={id}
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center text-dark"
                        to={{
                          pathname: `/detail-check-chat`,
                          search: `?id=${enc(JSON.stringify(it))}`,
                        }}
                      >
                        <div className="card">
                          <div className="panel-body">
                            <h5>
                              <MarkupText
                                msg={it?.opponent[0]?.name ?? "Unknown"}
                              />
                            </h5>
                            <h6>Chat : {it?.Last_chat[0]?.chat_message}</h6>
                            <h6>
                              {formatDate(
                                it.Last_chat[0].chat_created_at,
                                "hour:minute"
                              )}
                            </h6>
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

export default withRouter(PeriksaChatSee);
