import "./TranslatorsManagement.css";
import React, { Component } from "react";
import TranslatorsManagementTable from "./TranslatorsManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class TranslatorsManagement extends React.Component {
  state = {
    createTranslators: false,
    updateDetails: [],
    tableData: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.id,
      name: $("#translatorNameInput").val(),
    });

    var config = {
      method: "patch",
      url: ApiName + "/translator",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("نویسنده با موفقیت ویرایش شد.ٌ");
        self.loadData();
        self.setState({ updateDetails: null });
        $("#translatorNameInput").val("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/translator/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ updateDetails: null });
        self.setState({
          createTranslators: true,
          updateDetails: response.data,
        });
        $("#translatorNameInput").val(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/translator",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/translator/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        if (self.state.tableData.length == 1) window.location.reload(false);
        else {
          toast.success("با موفقیت حذف شد.");
          self.loadData();
        }
      })
      .catch(function (error) {
        toast.error("مشکلی در حذف آیتم به وجود آمد.");
      });
  };
  handleTranslatorsUpload = () => {
    if (this.state.updateDetails == null) {
      if ($("#translatorNameInput").val() == "") {
        if (!$("#translatorNameInput").hasClass("is-invalid")) {
          $("#translatorNameInput").addClass("is-invalid");
        }
        return;
      }
      var config = {
        method: "post",
        url: ApiName + "/translator/" + $("#translatorNameInput").val(),
        headers: {
          Authorization: localStorage.ValidationToken,
        },
      };
      var self = this;
      axios(config)
        .then(function (response) {
          toast.success("با موفقیت اضافه شد");
          self.loadData();
        })
        .catch(function (error) {
          console.log(error);
          toast.error("مشکلی در ارتباط با سرور به وجود آمد");
        });
    }
  };
  handleClick = () => {
    var newCreateTranslator = !this.state.createTranslators;
    this.setState({
      createTranslators: newCreateTranslator,
      updateDetails: null,
    });
    $("#translatorNameInput").val("");
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div>
        <div className="drtl">
          <button
            onClick={this.handleClick}
            className="btn btn-secondary px-2 islight mb-2"
          >
            اضافه کردن مترجم جدید +
          </button>
          <div
            className={
              this.state.createTranslators === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن مترجم</p>
            ) : (
              <p className="isreg my-0"> ویرایش مترجم</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <label for="TranslatorsName">نام مترجم</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="translatorNameInput"
                aria-describedby="helpId"
                placeholder=""
                defaultValue={
                  this.state.updateDetails == null
                    ? ""
                    : this.state.updateDetails.name
                }
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-info"
                onClick={
                  this.state.updateDetails == null
                    ? this.handleTranslatorsUpload
                    : this.updateData
                }
              >
                تایید
              </button>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست مترجم</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <TranslatorsManagementTable
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

export default TranslatorsManagement;
