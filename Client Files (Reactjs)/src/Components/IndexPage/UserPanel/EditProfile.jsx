import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import { ApiName } from "../../ApiName";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
class EditProfile extends React.Component {
  state = {
    changed: false,
  };
  openPassword = (e) => {
    console.log(e.target.checked);
    if (!e.target.checked) {
      $("#oldPasswordInput").val("");
      $("#newPassword").val("");
      $("#confirmNewPassword").val("");
      $("#oldPasswordInput").prop("disabled", true);
      $("#newPassword").prop("disabled", true);
      $("#confirmNewPassword").prop("disabled", true);
    } else {
      $("#oldPasswordInput").prop("disabled", false);

      $("#newPassword").prop("disabled", false);

      $("#confirmNewPassword").prop("disabled", false);
    }
  };
  handleUpdate = () => {
    var obj = {};
    if ($("#newPassword").val() == "") {
      obj = {
        phoneNumber: $("#phoneNumberInput").val(),

        name: $("#nameInput").val(),
        email: $("#emailInput").val(),
      };
    } else {
      if ($("#newPassword").val() == $("#confirmNewPassword").val()) {
        obj = {
          oldPassword: $("#oldPasswordInput").val(),
          newPassword: $("#newPassword").val(),

          phoneNumber: $("#phoneNumberInput").val(),

          name: $("#nameInput").val(),
          email: $("#emailInput").val(),
        };
      } else {
        if (!$("#newPassword").hasClass("is-invalid"))
          $("#newPassword").addClass("is-invalid");
        if (!$("#confirmNewPassword").hasClass("is-invalid"))
          $("#confirmNewPassword").addClass("is-invalid");
        return;
      }
    }
    console.log(obj);
    var data = JSON.stringify(obj);
    var config = {
      method: "patch",
      url: ApiName + "/user",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.props.updateUserInfo(response.data);
        self.setState({ changed: true });
        toast.success("?????????????? ???? ???????????? ???????????? ????.");
      })
      .catch(function (error) {
        toast.error("???????? ?????? ???????? ???????? ???? ???????? ????????.");
        console.log(error);
      });
  };
  render() {
    if (this.state.changed) return <Redirect to="/index/userpanel" />;
    else
      return (
        <div className="container rounded bg-white drtl py-3">
          <p className="islight text-right h5 pb-3">?????????????? ????</p>
          <form className="islight" action="">
            <label class="custom-control custom-checkbox">
              <input
                defaultChecked={false}
                type="checkbox"
                name="enablePasswordChange"
                id="enablePasswordChange"
                value="checkedValue"
                class="custom-control-input"
                onChange={(e) => this.openPassword(e)}
              />
              <span class="custom-control-indicator"> ?????????? ?????? ???????? </span>
              <span class="custom-control-description"></span>
            </label>
            <div class="form-group">
              <label for="">???????? ????????</label>
              <input
                disabled
                type="password"
                class="form-control"
                name=""
                id="oldPasswordInput"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">???????? ???????? ????????</label>
              <input
                disabled
                type="password"
                class="form-control"
                name=""
                id="newPassword"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">?????????? ???????? ???????? ????????</label>
              <input
                disabled
                type="password"
                class="form-control"
                name=""
                id="confirmNewPassword"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">??????????</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="emailInput"
                aria-describedby="helpId"
                placeholder=""
                defaultValue={this.props.user.email}
              />
            </div>
            <div class="form-group">
              <label for="">?????? ???????????????? ?? ??????</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="nameInput"
                aria-describedby="helpId"
                placeholder=""
                defaultValue={this.props.user.name}
              />
            </div>
            <div class="form-group">
              <label for="">?????????? ????????????</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="phoneNumberInput"
                aria-describedby="helpId"
                placeholder=""
                defaultValue={this.props.user.phoneNumber}
              />
            </div>

            <div className="text-center pt-4">
              <button
                onClick={this.handleUpdate}
                className="btn btn-success px-4"
                type="button"
              >
                ?????? ??????????????
              </button>
            </div>
          </form>
        </div>
      );
  }
}

export default EditProfile;
