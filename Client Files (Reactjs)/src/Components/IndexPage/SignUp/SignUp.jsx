import React, { Component } from "react";
import "./SignUp.css";
import logo from "../../../Assets/img/logo.png";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import $ from "jquery";
import axios from "axios";
import { ApiName } from "../../ApiName";
import { FaWindowClose } from "react-icons/fa";
class SignUp extends React.Component {
  state = {
    validated: false,
  };
  handleSignUp = () => {
    var data = JSON.stringify({
      userName: $("#usernameInput").val(),
      password: $("#passwordInput").val(),
      email: $("#emailInput").val(),
    });
    if ($("#passwordInput").val() != $("#confirmPasswordInput").val()) {
      toast.error("پسورد و تکرار آن یکی نیستند.");
      return;
    }
    if (
      $("#emailInput").val() == "" ||
      $("#passwordInput").val() == "" ||
      $("#passwordInput") == ""
    ) {
      $(".form-group").addClass("was-validated");
    }
    var config = {
      method: "post",
      url: ApiName + "/Auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        localStorage.ValidationToken = response.data.token;
        self.setState({ validated: true });
        window.location.pathname = "/login";
      })
      .catch(function (error) {
        console.log(error);
        toast.error(
          "لطفا فیلد ها را درست وارد کنید یا از اطلاعات دیگری استفاده کنید."
        );
      });
  };
  render() {
    if (this.state.validate) return <Redirect to="/index" />;
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
          <p className="isbold py-4 text-center">ثبت نام کاربر جدید</p>
          <form className="px-4">
            <div class="form-group mb-3">
              <label for="usernameInput" class="form-label text-left dltr">
                ایمیل
              </label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div class=" form-group mb-3">
              <label for="usernameInput" class="form-label text-left dltr">
                نام کاربری
              </label>
              <input
                type="email"
                class="form-control"
                id="usernameInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group mb-3">
              <label for="passwordInput" class="form-label">
                رمز عبور
              </label>
              <input type="password" class="form-control" id="passwordInput" />
            </div>
            <div class="form-group mb-3">
              <label for="confirmPasswordInput" class="form-label">
                تکرار رمز عبور
              </label>
              <input
                type="password"
                class="form-control"
                id="confirmPasswordInput"
              />
            </div>

            <div className="text-center mt-5">
              <button
                onClick={this.handleSignUp}
                type="button"
                class="btn btn-info px-5"
              >
                ورود
              </button>
            </div>
          </form>
          <div className="text-center container pt-5 pb-3">
            <Link to="/login" className="tdnone text-info">
              حساب کاربری دارم
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
