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
import { fckingDateDiff, formatDate } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function TopProdukFood() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTop = async () => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "jbfood/recommend/admin",
          method: "get",
        })
      )
    );
    console.log(res.data.data.data);
    setResult(res?.data?.data?.data);
  };

  const deleteAction = async (id) => {
    const res = await dispatch(
      _fetch(
        BridgeService.JbMarket({
          key: "jbfood/recommend",
          method: "delete",
          payload: JSON.stringify({ id: id }),
        })
      )
    );
    console.log(res.data);
    getTop();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="topmerchant" />
          <Content>
            <PageHeading
              title="Top Produk Food"
              add
              to="/create-top-product-food"
            />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((it, id) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-12 col-sm-6"
                        key={id}
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
                                it.picture
                                  ? it.picture
                                  : "https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
                              }
                              style={{ height: "9rem", objectFit: "contain" }}
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
                            <div style={{ fontSize: 18 }}>{it.barang.nama}</div>
                          </div>
                          <div
                            className="vehicle-box"
                            style={{ textAlign: "justify" }}
                          >
                            Toko : {it.toko.nama}
                          </div>
                          <div
                            className="vehicle-box"
                            style={{ textAlign: "justify" }}
                          >
                            Expired :{" "}
                            {formatDate(it.expired_at, "date/month/year")} (
                            {fckingDateDiff(it.expired_at)})
                          </div>
                          <div className="center py-2">
                            <Link
                              className="btn btn-tbl-edit btn-xs mr-2"
                              to={{
                                pathname: "/edit-top-market",
                                query: { item: it, state: "edit" },
                              }}
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                            <div
                              className="btn btn-tbl-delete btn-xs"
                              onClick={() => deleteAction(it.id)}
                            >
                              <i className="fa fa-trash-o "></i>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default TopProdukFood;
