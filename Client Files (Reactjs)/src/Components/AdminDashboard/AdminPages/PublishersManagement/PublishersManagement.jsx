import "./PublishersManagement.css";
import React, { Component } from "react";
import PublishersManagementTable from "./PublishersManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class PublishersManagement extends React.Component {
  state = {
    createPublisher: false,
    updateDetails: null,
    tableData: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.id,
      name: $("#publisherNameInput").val(),
    });

    var config = {
      method: "patch",
      url: ApiName + "/publisher",
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
        self.setState({ updateDetails: null });
        $("#publisherNameInput").val("");
        self.loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/publisher/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ updateDetails: null });
        self.setState({
          createPublisher: true,
          updateDetails: response.data,
        });
        $("#publisherNameInput").val(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/publisher",
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
      url: ApiName + "/publisher/" + id,
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
  handlePublisherUpload = () => {
    if (this.state.updateDetails == null) {
      if ($("#publisherNameInput").val() == "") {
        if (!$("#publisherNameInput").hasClass("is-invalid")) {
          $("#publisherNameInput").addClass("is-invalid");
        }
        return;
      }
      var config = {
        method: "post",
        url: ApiName + "/publisher/" + $("#publisherNameInput").val(),
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
    var newCreatePublisher = !this.state.createPublisher;
    this.setState({ createPublisher: newCreatePublisher, updateDetails: null });
    $("#publisherNameInput").val("");
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
            اضافه کردن انتشارات +
          </button>
          <div
            className={
              this.state.createPublisher === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن انتشارات</p>
            ) : (
              <p className="isreg my-0"> ویرایش انتشارات</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <label for="publisherName">نام انتشارات</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="publisherNameInput"
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
                className="btn btn-info islight"
                onClick={
                  this.state.updateDetails == null
                    ? this.handlePublisherUpload
                    : this.updateData
                }
              >
                تایید
              </button>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست انتشارات</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <PublishersManagementTable
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

export default PublishersManagement;
