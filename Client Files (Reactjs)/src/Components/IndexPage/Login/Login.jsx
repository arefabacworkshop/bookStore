import React, { Component } from "react";
import "./Login.css";
import logo from "../../../Assets/img/logo.png";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ApiName } from "../../ApiName";
import { toast } from "react-toastify";
class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    logedIn: false,
  };
  changeUsernameInput = (e) => {
    this.setState({ userName: e.target.value });
  };
  changePasswordInput = (e) => {
    this.setState({ password: e.target.value });
  };
  handleLogin = (userName, password) => {
    var data = JSON.stringify({ userName: userName, password: password });
    var self = this;
    var config = {
      method: "post",
      url: ApiName + "/Auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        localStorage.ValidationToken = response.data.token;
        self.setState({ logedIn: true });
      })
      .catch(function (error) {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
      });
  };
  render() {
    if (this.state.logedIn) {
      return <Redirect to="/index" />;
    } else
      return (
        <div className="LoginWrapper pt-5 ">
          <div className="py-5 text-center">
            <Link to="/index">
              <img
                src={logo}
                width="65px"
                height="65px"
                alt=""
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="login-form-wrapper rounded  shadow  isreg drtl mx-auto mt-2">
            <p className="isbold py-4 text-center">ورود به حساب کاربری</p>
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
                  value={this.state.userName}
                  onChange={this.changeUsernameInput}
                />
              </div>
              <div class="mb-3">
                <label for="passwordInput" class="form-label">
                  رمز عبور
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="passwordInput"
                  value={this.state.password}
                  onChange={this.changePasswordInput}
                />
              </div>

              <div className="text-center mt-5">
                <button
                  onClick={() =>
                    this.handleLogin(this.state.userName, this.state.password)
                  }
                  type="button"
                  class="btn btn-info px-5"
                >
                  ورود
                </button>
              </div>
            </form>
            <div className="text-center container pt-5 pb-3">
              <Link to="/forgotpassword" className="tdnone ml-1 text-info">
                رمز عبور را فراموش کرده ام
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

export default Login;
