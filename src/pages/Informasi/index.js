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
import { batasiKata } from "../../helpers";
import { _fetch } from "../../redux/actions/global";
import { InformationService } from "../../services";

function Informasi() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInformation = async () => {
    const res = await dispatch(_fetch(InformationService.getInformasi({})));
    // console.log(res.data.lobj);
    setResult(res.data.lobj);
  };

  const deleteAction = async (id) => {
    await dispatch(
      _fetch(
        InformationService.deleteInformasi({ payload: JSON.stringify({ id }) })
      )
    );
    // console.log(res.data.lobj);
    getInformation();
  };

  return (
    <>
      <Wrapper>
        <Topbar />
        <Container>
          <Sidebar active="informasi" />
          <Content>
            <PageHeading title="Informasi" add to="/create-information" />
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
                              src={it.image}
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
                            <div style={{ fontSize: 18 }}>
                              {batasiKata(it.judul, 30)}
                            </div>
                          </div>
                          <div
                            className="vehicle-box"
                            style={{ textAlign: "justify", minHeight: 85 }}
                          >
                            {batasiKata(it.isi, 100)}
                          </div>
                          <div className="center py-2">
                            <Link
                              className="btn btn-tbl-edit btn-xs mr-2"
                              to={{
                                pathname: "/edit-information",
                                query: { item: it },
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

export default Informasi;
