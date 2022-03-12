/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { cipher } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";
import { withRouter } from "react-router-dom";
import chat_api, { getSocketApi } from "../../api/websocket";

function PeriksaChat({ history }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const enc = cipher("akuimuet");

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    let data = await chat_api({
      method: getSocketApi.chat.list_chat_admin.method,
      url: getSocketApi.chat.list_chat_admin.url,
      payload: {
        have_admin: false,
        page: page,
      },
    });
    console.log(data);
    setResult(data?.data?.data);
    setTotalPage(data?.data?.totalPage);
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
                          pathname: `/see-check-chat`,
                          search: `?id=${enc(JSON.stringify(it))}`,
                        }}
                      >
                        <div className="card">
                          <div className="panel-body">
                            <h6>
                              {it.chat_idrs} - {it.chat_nama}
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

export default withRouter(PeriksaChat);
