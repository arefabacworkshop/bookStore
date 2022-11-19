import "./WritersManagement.css";
import React, { Component } from "react";
import WritersManagementTable from "./WritersManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class WritersManagement extends React.Component {
  state = {
    createWriters: false,
    updateDetails: null,
    tableData: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.id,
      name: $("#writerNameInput").val(),
    });

    var config = {
      method: "patch",
      url: ApiName + "/writer",
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
        $("#writerNameInput").val("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/writer/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          createWriters: true,
          updateDetails: response.data,
        });
        $("#writerNameInput").val(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/writer",
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
      url: ApiName + "/writer/" + id,
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
  handleWriterUpload = () => {
    if (this.state.updateDetails == null) {
      if ($("#writerNameInput").val() == "") {
        if (!$("#writerNameInput").hasClass("is-invalid")) {
          $("#writerNameInput").addClass("is-invalid");
        }
        return;
      }
      var config = {
        method: "post",
        url: ApiName + "/writer/" + $("#writerNameInput").val(),
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
    var newCreateWriter = !this.state.createWriters;
    this.setState({ createWriters: newCreateWriter, updateDetails: null });
    $("#writerNameInput").val("");
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
            اضافه کردن نویسنده جدید +
          </button>
          <div
            className={
              this.state.createWriters === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن نویسنده</p>
            ) : (
              <p className="isreg my-0"> ویرایش نویسنده</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <label for="writerNameInput">نام نویسنده</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="writerNameInput"
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
                    ? this.handleWriterUpload
                    : this.updateData
                }
              >
                تایید
              </button>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست نویسندگان</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <WritersManagementTable
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

export default WritersManagement;
