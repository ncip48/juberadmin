/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
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
import { cipher, formatDate } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

const tabs = [
  // {title: 'Belum Bayar', component: 'BelumBayar', count: 14, status: 6},
  { title: "Dibayar", component: "Dibayar", count: 4, status: 1 },
  { title: "Dikemas", component: "Dikemas", count: 4, status: 2 },
  { title: "Dikirim", component: "Dikirim", count: 1, status: 3 },
  { title: "Selesai", component: "Selesai", count: 0, status: 4 },
  { title: "Dibatalkan", component: "Dibatalkan", count: 0, status: 0 },
  { title: "Pengembalian", component: "Pengembalian", count: 1, status: 5 },
];

function Penjualan() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [state, setState] = useState(tabs[0]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const enc = cipher("akuimuet");

  const selectType = (id) => {
    switch (id) {
      case 0:
        return {
          key: "admin/trans/cancel",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
      case 1:
        return {
          key: "admin/trans/paid",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
      case 2:
        return {
          key: "admin/trans/packing",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
      case 3:
        return {
          key: "admin/trans/sending",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
      case 4:
        return {
          key: "admin/trans/done",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
      case 5:
        return {
          key: "admin/trans/return",
          type: "get",
          examplePayload: {
            id: "xx",
          },
        };
    }
  };

  useEffect(() => {
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, page]);

  const getSales = async () => {
    const { key, type } = selectType(state.status);
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key,
          method: type,
          payload: JSON.stringify({
            page: page,
          }),
        })
      )
    );
    console.log(res.data.data);
    setResult(res?.data?.data?.data);
    setTotalPage(res?.data?.data?.last_page);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="penjualan" />
          <Content>
            <PageHeading title="Penjualan" />
            <div className="row">
              <div className="col-12">
                <div className="borderBox light bordered card-box">
                  <div className="borderBox-title tabbable-line">
                    <ul className="nav nav-tabs" style={{ float: "left" }}>
                      {tabs.map((item, index) => {
                        return (
                          <li className="nav-item" key={index}>
                            <a
                              href={item.title.toLowerCase()}
                              data-toggle="tab"
                              className={index === 0 ? "active" : ""}
                              onClick={() => setState(item)}
                            >
                              {item.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="borderBox-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id={state.title}>
                        <div className="row clearfix">
                          {result?.map((item, id) => {
                            return (
                              <div
                                className="col-lg-3 col-md-6 col-12 col-sm-6"
                                key={id}
                              >
                                <Link
                                  to={{
                                    pathname: `/detail-sales`,
                                    search: `?id=${enc(JSON.stringify(item))}`,
                                  }}
                                >
                                  <div className="card blogThumb">
                                    <div
                                      className="thumb-center"
                                      style={{ backgroundColor: "lightgrey" }}
                                    >
                                      <img
                                        className="img-responsive"
                                        alt="user"
                                        src={
                                          item.body[0].item.picture ??
                                          "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
                                        }
                                        style={{
                                          height: "9rem",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </div>
                                    <div
                                      className="vehicle-name bg-b-danger"
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div style={{ fontSize: 18 }}>
                                        {item.profile.name ?? "Error"}
                                      </div>
                                    </div>
                                    <div
                                      className="vehicle-box"
                                      style={{
                                        textAlign: "justify",
                                      }}
                                    >
                                      Produk {state.title}
                                    </div>
                                    <div
                                      className="vehicle-box"
                                      style={{
                                        textAlign: "justify",
                                      }}
                                    >
                                      {formatDate(
                                        item.created_at,
                                        "date monthName year hour:minute"
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="tableExport_paginate"
                        >
                          <ul
                            className="pagination"
                            style={{ justifyContent: "center" }}
                          >
                            <li
                              className="paginate_button page-item previous disabled"
                              id="tableExport_previous"
                            >
                              <a className="page-link">Sebelumnya</a>
                            </li>
                            {[...Array(totalPage).keys()].map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`paginate_button page-item ${
                                    item + 1 === page ? "active" : ""
                                  } `}
                                >
                                  <a
                                    onClick={() => setPage(item + 1)}
                                    className="page-link"
                                  >
                                    {item + 1}
                                  </a>
                                </li>
                              );
                            })}
                            <li
                              className="paginate_button page-item next"
                              id="tableExport_next"
                            >
                              <a className="page-link">Selanjutnya</a>
                            </li>
                          </ul>
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

export default Penjualan;
