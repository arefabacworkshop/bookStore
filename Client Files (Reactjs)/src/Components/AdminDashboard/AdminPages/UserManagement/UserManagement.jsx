import "./UserManagement.css";
import React, { Component } from "react";
import UserManagementTable from "./UserManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
import { FaThemeisle } from "react-icons/fa";
class UserManagement extends React.Component {
  state = {
    createUser: false,
    updateDetails: {
      email: "",
    },
    role: 2,
    tableData: [],
  };
  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };
  updateData = () => {
    var userAccess;
    if (this.state.role == 3) {
      userAccess = {
        dashboard: $("#dashboardAccess").is(":checked"),
        bookManagement: $("#booksAccess").is(":checked"),
        mainPageManagement: $("#mainPageAccess").is(":checked"),
        salesManagement: $("#salesAccess").is(":checked"),
        CustomePageManagement: $("#customePageAccess").is(":checked"),
        commentManagement: $("#commentsAccess").is(":checked"),
        Settings: $("#settingsAccess").is(":checked"),
      };
    }
    var data = JSON.stringify({
      newPassword: $("#passwordInput").val(),
      userName: $("#userNameInput").val(),
      email: $("#emailInput").val(),
      name: $("#nameInput").val(),
      phoneNumber: $("#phoneNumberInput").val(),
      roleId: $("#roleInput").val(),
      userAccess,
    });

    var config = {
      method: "patch",
      url: ApiName + "/user/" + this.state.updateDetails.id,
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#passwordInput").val("");
        $("#userNameInput").val("");
        $("#emailInput").val("");
        $("#nameInput").val("");
        $("#zipCodeInput").val("");
        $("#phoneNumberInput").val("");
        $("#addressInput").val("");
        $("#cityInput").val("");
        $("#stateInput").val("");
        $("#roleInput").val(2);
        toast.success("?????????? ???? ???????????? ???????????? ????");
        self.loadUsers();
        self.setState({ updateDetails: null, createUser: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/user/" + id,
      headers: { Authorization: localStorage.ValidationToken },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#emailInput").val(response.data.user.email);
        $("#nameInput").val(response.data.user.name);
        $("#phoneNumberInput").val(response.data.user.phoneNumber);
        $("#roleInput").val(response.data.user.roleId);
        $("#userNameInput").val(response.data.user.userName);
        if (response.data.user.roleId == 3) {
          $("#dashboardAccess").prop(
            "checked",
            response.data.userAccess.dashboard
          );
          $("#booksAccess").prop(
            "checked",
            response.data.userAccess.bookManagement
          );
          $("#mainPageAccess").prop(
            "checked",
            response.data.userAccess.mainPageManagement
          );
          $("#salesAccess").prop(
            "checked",
            response.data.userAccess.salesManagement
          );
          $("#customePageAccess").prop(
            "checked",
            response.data.userAccess.customePageManagement
          );
          $("#commentsAccess").prop(
            "checked",
            response.data.userAccess.commentManagement
          );
          $("#settingsAccess").prop(
            "checked",
            response.data.userAccess.settings
          );
        }
        self.setState({ updateDetails: null });
        self.setState({
          createUser: true,
          updateDetails: response.data.user,
          role: response.data.user.roleId,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  openPassword = (e) => {
    console.log(e.target.checked);
    if (!e.target.checked) {
      $("#passwordInput").prop("disabled", true);
    } else {
      $("#passwordInput").prop("disabled", false);
    }
  };

  handleUserCreation = () => {
    var userAccess;
    if (this.state.role == 3) {
      userAccess = {
        dashboard: $("#dashboardAccess").is(":checked"),
        bookManagement: $("#booksAccess").is(":checked"),
        mainPageManagement: $("#mainPageAccess").is(":checked"),
        salesManagement: $("#salesAccess").is(":checked"),
        CustomePageManagement: $("#customePageAccess").is(":checked"),
        commentManagement: $("#commentsAccess").is(":checked"),
        Settings: $("#settingsAccess").is(":checked"),
      };
    }
    var data = JSON.stringify({
      newPassword: $("#passwordInput").val(),
      userName: $("#userNameInput").val(),
      email: $("#emailInput").val(),
      name: $("#nameInput").val(),
      phoneNumber: $("#phoneNumberInput").val(),
      roleId: $("#roleInput").val(),
      userAccess,
    });

    var config = {
      method: "post",
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
        toast.success("?????????? ???? ???????????? ?????????? ????");
        self.loadUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleClick = () => {
    var newCreateUser = !this.state.createUser;
    $("#dashboardAccess").prop("checked", false);
    $("#booksAccess").prop("checked", false);
    $("#mainPageAccess").prop("checked", false);
    $("#salesAccess").prop("checked", false);
    $("#customePageAccess").prop("checked", false);
    $("#commentsAccess").prop("checked", false);
    $("#settingsAccess").prop("checked", false);
    $("#passwordInput").val("");
    $("#userNameInput").val("");
    $("#emailInput").val("");
    $("#nameInput").val("");
    $("#zipCodeInput").val("");
    $("#phoneNumberInput").val("");
    $("#addressInput").val("");
    $("#cityInput").val("");
    $("#stateInput").val("");
    $("#roleInput").val(2);
    this.setState({
      createUser: newCreateUser,
      updateDetails: null,
      role: 2,
    });
  };

  loadUsers = () => {
    var config = {
      method: "get",
      url: ApiName + "/user",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/user/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("???? ???????????? ?????? ????.");
        self.loadUsers();
      })
      .catch(function (error) {
        toast.error("?????????? ???? ?????? ???????? ???? ???????? ??????.");
      });
  };
  validateForms = () => {
    const forms = document.querySelectorAll(".requires-validation");
    var self = this;
    self.setState({ isValid: true });
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        self.setState({ isValid: false });
      }
    });
    if (this.state.isValid) return true;
    else return false;
  };
  getUserDetail = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/user/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ updateDetails: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadUsers();
  }
  render() {
    return (
      <div>
        <div className="drtl">
          <button
            onClick={this.handleClick}
            className="btn btn-secondary px-2 islight mb-2"
          >
            ?????????? ???????? ?????????? ???????? +
          </button>
          <div
            className={
              this.state.createUser === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">?????????? ???????? ??????????</p>
            ) : (
              <p className="isreg my-0"> ???????????? ??????????</p>
            )}

            <form className="islight requires-validation" action="">
              <label
                className={
                  this.state.updateDetails == null
                    ? "d-none"
                    : "custom-control custom-checkbox"
                }
              >
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
                  disabled={this.state.updateDetails != null ? true : false}
                  type="text"
                  class="form-control"
                  required
                  name=""
                  id="passwordInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="">?????? ????????????</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  name=""
                  id="userNameInput"
                  aria-describedby="helpId"
                  placeholder=""
                  defaultValue={
                    this.state.updateDetails == null
                      ? ""
                      : this.state.updateDetails.userName
                  }
                />
              </div>
              <div class="form-group">
                <label for="">??????????</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  name=""
                  id="emailInput"
                  aria-describedby="helpId"
                  placeholder=""
                  defaultValue={
                    this.state.updateDetails == null
                      ? ""
                      : this.state.updateDetails.email
                  }
                />
              </div>
              <div class="form-group">
                <label for="">?????? ???????????????? ?? ??????</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  name=""
                  id="nameInput"
                  aria-describedby="helpId"
                  placeholder=""
                  defaultValue={
                    this.state.updateDetails == null
                      ? ""
                      : this.state.updateDetails.name
                  }
                />
              </div>
              <div class="form-group">
                <label for="">??????</label>
                <select
                  required
                  defaultValue={
                    this.state.updateDetails == null
                      ? 2
                      : this.state.updateDetails.roleId
                  }
                  class="form-control"
                  required
                  onChange={this.handleRoleChange}
                  name=""
                  id="roleInput"
                >
                  <option value={1}>?????????? ??????????</option>
                  <option selected value={2}>
                    ?????????? ????????
                  </option>
                  <option value={3}>??????????????</option>
                </select>
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
                  defaultValue={
                    this.state.updateDetails == null
                      ? ""
                      : this.state.updateDetails.phoneNumber
                  }
                />
              </div>
              <div
                className={
                  this.state.role != 3 ? "d-none" : "form-controll mt-2"
                }
              >
                <p className="isreg">???????????? ?????? ??????????????</p>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="dashboardAccess"
                      value={false}
                    />
                    ??????????????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="salesAccess"
                      value={false}
                    />
                    ???????????? ??????????????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="booksAccess"
                      value={false}
                    />
                    ???????????? ???????? ????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="commentsAccess"
                      value={false}
                    />
                    ???????????? ??????????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="customePageAccess"
                      value={false}
                    />
                    ???????????? ?????????? ???????? ???????? ??????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="mainPageAccess"
                      value={false}
                    />
                    ???????????? ???????? ????????
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name=""
                      id="settingsAccess"
                      value={false}
                    />
                    ???????????? ??????????????
                  </label>
                </div>
              </div>
              <div className="text-center pt-4">
                <button
                  onClick={
                    this.state.updateDetails == null
                      ? this.handleUserCreation
                      : this.updateData
                  }
                  className="btn btn-success px-4"
                  type="button"
                >
                  ?????? ??????????????
                </button>
              </div>
            </form>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">???????? ??????????????</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <UserManagementTable
                  loadUpdateData={this.loadUpdateData}
                  removeItem={this.removeItem}
                  data={this.state.tableData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
