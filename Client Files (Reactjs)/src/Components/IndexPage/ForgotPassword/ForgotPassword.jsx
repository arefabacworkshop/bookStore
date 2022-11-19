import React, { Component } from "react";
import "./ForgotPassword.css";
import logo from "../../../Assets/img/logo.png";
import { Link } from "react-router-dom";
class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="LoginWrapper pt-5 ">
        <div className="py-5 text-center">
          <img
            src={logo}
            width="65px"
            height="65px"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="login-form-wrapper rounded  shadow  isreg drtl mx-auto mt-2">
          <p className="isbold py-4 text-center">بازیابی رمز عبور</p>
          <form className="px-4">
            <div class="mb-3">
              <label for="usernameInput" class="form-label text-left dltr">
                ایمیل
              </label>
              <input
                type="email"
                class="form-control"
                id="usernameInput"
                aria-describedby="emailHelp"
                placeholder="ایمیل"
              />
            </div>
            <div className="text-center mt-5">
              <button type="submit" class="btn btn-info px-5">
                ورود
              </button>
            </div>
          </form>
          <div className="text-center container pt-5 pb-3">
            <Link to="/login" className="tdnone ml-1 text-info">
              حساب کاربری دارم
            </Link>
            &nbsp; | &nbsp;
            <Link to="/signup" className="tdnone text-info">
              کاربر جدید هستم
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
