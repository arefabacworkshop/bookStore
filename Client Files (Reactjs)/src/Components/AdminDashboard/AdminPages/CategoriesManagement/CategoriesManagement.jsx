import "./CategoriesManagement.css";
import React, { Component } from "react";
import CategoriesManagementTable from "./CategoriesManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class CategoriesManagement extends React.Component {
  state = {
    createCategory: false,
    updateDetails: null,
    tableData: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.id,
      name: $("#categoryNameInput").val(),
    });

    var config = {
      method: "patch",
      url: ApiName + "/category",
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
        $("#categoryNameInput").val("");
        self.loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/category/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ updateDetails: null });
        $("#categoryNameInput").val(response.data.name);
        self.setState({
          createCategory: true,
          updateDetails: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/category",
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
      url: ApiName + "/category/" + id,
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
  handleCategoryUpload = () => {
    if (this.state.updateDetails == null) {
      if ($("#categoryNameInput").val() == "") {
        if (!$("#categoryNameInput").hasClass("is-invalid")) {
          $("#categoryNameInput").addClass("is-invalid");
        }
        return;
      }
      var config = {
        method: "post",
        url: ApiName + "/category/" + $("#categoryNameInput").val(),
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
    var newCreateCategory = !this.state.createCategory;
    this.setState({ createCategory: newCreateCategory, updateDetails: null });
    $("#categoryNameInput").val("");
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
            اضافه کردن موضوع جدید +
          </button>
          <div
            className={
              this.state.createCategory === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن موضوع</p>
            ) : (
              <p className="isreg my-0"> ویرایش موضوع</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <label for="categoryName">نام موضوع</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="categoryNameInput"
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
                    ? this.handleCategoryUpload
                    : this.updateData
                }
              >
                اعمال
              </button>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست موضوع</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <CategoriesManagementTable
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

export default CategoriesManagement;
