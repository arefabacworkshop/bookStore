import React, { Component } from "react";
import { FaCheckCircle } from "react-icons/fa";
import $ from "jquery";
import axios from "axios";
import { ApiName } from "../ApiName";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
class SellingResult extends React.Component {
  componentDidMount() {
    this.props.onPageChange();
    this.handleValidation();
  }
  state = {
    validated: false,
  };
  handleValidation = () => {
    var config = {
      method: "get",
      url: ApiName + "/auth/validation",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ validated: true });
      })
      .catch(function (error) {
        self.setState({ validated: false });
      });
  };
  handleLogin = () => {
    var data = JSON.stringify({
      userName: $("#LoginUserNameInput").val(),
      password: $("#loginPasswordInput").val(),
    });

    var config = {
      method: "post",
      url: ApiName + "/Auth/login",
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
      })
      .catch(function (error) {
        console.log(error);
        toast.error("لطفا اطلاعات درست را وارد کنید.");
        if (!$("#LoginUserNameInput").hasClass("was-validated")) {
          $("#LoginUserNameInput").addClass("was-validated");
        }
        if (!$("#loginPasswordInput").hasClass("was-validated")) {
          $("#loginPasswordInput").addClass("was-validated");
        }
      });
  };
  hanldeSignUp = () => {
    var data = JSON.stringify({
      userName: $("#signupUsernameInput").val(),
      password: $("#signupPasswordInput").val(),
      email: $("#signupEmailInput").val(),
    });

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
      })
      .catch(function (error) {
        console.log(error);
        toast.error("این عضو در حال حاضر وجود دارد");
        if (!$("#signupUsernameInput").hasClass("was-validated")) {
          $("#signupUsernameInput").addClass("was-validated");
        }
        if (!$("#signupPasswordInput").hasClass("was-validated")) {
          $("#signupPasswordInput").addClass("was-validated");
        }
        if (!$("#signupEmailInput").hasClass("was-validated")) {
          $("#signupEmailInput").addClass("was-validated");
        }
      });
  };
  render() {
    if (this.state.validated)
      return <Redirect to="/sellResult/PostDetails"></Redirect>;
    else
      return (
        <div class="container isreg drtl">
          <div class="buy-product container-fluid">
            <div class="container steps text-dark mt-3 rounded shadow px-4">
              <div class="row">
                <div class="step-1 col-md-4">
                  <div class="bg-info step-1-circle mx-auto">1</div>
                  <p>اعتبار سنجی</p>
                </div>
                <div class="step-2 col-md-4 ">
                  <div class="step-2-circle mx-auto">2</div>
                  <p>اطلاعات پستی</p>
                </div>
                <div class="step-3 col-md-4">
                  <div class="step-3-circle mx-auto ">3</div>
                  <p>تایید نهایی</p>
                </div>
              </div>
              <div class="progress">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "33.3%" }}
                  aria-valuenow="33.3"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="card mt-3 drtl text-right shadow">
              <div id="loginheader" class="card-header">
                اعتبارسنجی
              </div>
              <div
                id="loginbody"
                class="card-body container card-customization"
              >
                <div class="row">
                  <div class="col-md-6">
                    <p class="isbold">ورود اعضا</p>
                    <small class="isbold text-muted">
                      اگر قبلا ثبت نام کرده اید از این بخش وارد شوید.
                    </small>
                    <form class="mt-3 needs-validation form2">
                      <div class="mb-3">
                        <label for="LoginUserNameInput" class="form-label">
                          نام کاربری
                        </label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          id="LoginUserNameInput"
                          placeholder="نام کاربری"
                          aria-describedby="emailHelp"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="loginPasswordInput" class="form-label">
                          رمز عبور
                        </label>
                        <input
                          required
                          placeholder="رمزعبور"
                          type="password"
                          class="form-control"
                          id="loginPasswordInput"
                        />
                      </div>
                      <a
                        id="btnForm2"
                        onClick={this.handleLogin}
                        class="btn btn-info"
                      >
                        ورود
                      </a>
                    </form>
                  </div>
                  <div class="col-md-6">
                    <p class="isbold">ثبت نام سریع</p>
                    <small class="isbold text-muted">
                      اگر قبلا ثبت نام نکرده اید از این بخش ثبت نام کنید.
                    </small>
                    <form class="mt-3 form1">
                      <div class="mb-3">
                        <label for="signupEmailInput" class="form-label">
                          ایمیل
                        </label>
                        <input
                          required
                          type="email"
                          class="form-control"
                          id="signupEmailInput"
                          placeholder="ایمیل"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="signupUsernameInput" class="form-label">
                          نام کاربری
                        </label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          id="signupUsernameInput"
                          placeholder="نام کاربری"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="signupPasswordInput" class="form-label">
                          رمز عبور
                        </label>
                        <input
                          required
                          placeholder="رمزعبور"
                          type="password"
                          class="form-control"
                          id="signupPasswordInput"
                        />
                      </div>
                      <button
                        onClick={this.hanldeSignUp}
                        type="button"
                        id="btnForm1"
                        class="btn btn-outline-info"
                      >
                        ثبت نام
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default SellingResult;
