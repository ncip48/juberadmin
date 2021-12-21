import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "../../styles/css/extra_pages.scss";
import "../../styles/css/material-design-iconic-font.min.scss";
import { ToastContainer, toast } from "react-toastify";
import { _fetch } from "../../redux/actions/global";
import { login } from "../../redux/actions/auth";

let phoneAdmin = ["085156842765", "087730545111"];

function SignIn({ history }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    no_hp: "",
    otp: null,
  });
  const [loginState, setLoginState] = useState({
    step: 0,
    msg: null,
  });

  const handleChange = (type) => (val) => {
    setForm({ ...form, [type]: val.target.value });
  };

  const lanjutAction = async () => {
    if (form.no_hp.length === 0) return toast.error("Masukkan No HP");
    if (!phoneAdmin.includes(form.no_hp))
      return toast.error("Bukan No HP Admin");

    try {
      let res = await dispatch(
        _fetch(AuthService.loginOtp({ phone: form.no_hp }))
      );
      setLoginState({ step: 1, msg: res.data.value });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginAction = async () => {
    try {
      let res = await dispatch(
        _fetch(AuthService.verifyRegisterOtp({ otp: String(form.otp) }))
      );
      await dispatch(
        login({
          idrs: res.idrs,
          namars: res.namars,
          poin: res.poin || 0,
          saldo: res.saldo || 0,
          token: res.token,
          phone: form.no_hp,
        })
      );
      history.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100 page-background">
          <div className="wrap-login100">
            {/* {error.error && (
            <div className="alert alert-danger">
              <strong>Error!</strong> {error.msg}
            </div>
          )} */}
            <div className="login100-form validate-form">
              <span className="login100-form-logo">
                <img
                  alt=""
                  src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/72x72/4af7d493734b0de09f97029ab846ed43/image_38.png"
                />
              </span>
              <span className="login100-form-title p-b-34 p-t-27">Log in</span>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="nohp"
                  placeholder="No HP"
                  onChange={handleChange("no_hp")}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xf2c8;"
                ></span>
              </div>
              {loginState.step === 1 && (
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    onChange={handleChange("otp")}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="&#xf191;"
                  ></span>
                </div>
              )}
              {loginState.step === 0 ? (
                <div className="container-login100-form-btn">
                  <button
                    className="login100-form-btn"
                    onClick={() => lanjutAction()}
                  >
                    Lanjutkan
                  </button>
                </div>
              ) : (
                <div className="d-flex">
                  <div className="container-login100-form-btn">
                    <button
                      className="login100-form-btn btn-block"
                      onClick={() => loginAction()}
                    >
                      Masuk
                    </button>
                  </div>
                  <div className="container-login100-form-btn justify-content-end">
                    <button
                      className="login100-form-btn"
                      onClick={() => setLoginState({ ...loginState, step: 0 })}
                    >
                      Batalkan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default withRouter(SignIn);
