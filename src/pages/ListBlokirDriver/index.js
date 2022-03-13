import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Content,
  ItemMenu,
  PageHeading,
  Sidebar,
  Topbar,
  Wrapper,
} from "../../components";
import { _fetch } from "../../redux/actions/global";
import { BridgeService } from "../../services";

function ListBlokirDriver() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const payload = {
      doksts: "6",
      jnsUser: "driver",
    };
    const res = await dispatch(
      _fetch(
        BridgeService.JbDelivery({
          key: "adminlistuser",
          payload: JSON.stringify(payload),
        }),
        false
      )
    );
    console.log(res.data);
    // setResult(res?.data?.lobj);
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="menu" />
          <Content>
            <PageHeading title="List Menu" />
            <div className="row">
              <div className="col-12">
                <div className="row clearfix">
                  {result?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="col-xl-2 col-lg-3 col-md-6 col-sm-12 text-center text-dark"
                        to={{
                          pathname: "/edit-menu",
                          query: { item, state: "edit" },
                        }}
                      >
                        <ItemMenu item={item} />
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

export default ListBlokirDriver;
