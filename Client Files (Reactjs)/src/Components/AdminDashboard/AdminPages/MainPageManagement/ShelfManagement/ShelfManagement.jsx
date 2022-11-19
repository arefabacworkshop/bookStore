import "./ShelfManagement.css";
import React, { Component } from "react";
import ShelfManagementTable from "./ShelfManagementTable";
import { ApiName } from "../../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
class ShelfManagement extends React.Component {
  state = {
    createShelf: false,
    updateDetails: [],
    tableData: [],
    booksOptions: [],
    selectedBooks: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.shelf.id,
      name: $("#shelfNameInput").val(),
      books:
        this.state.selectedBooks.length == 0
          ? this.state.updateDetails.books
          : this.state.selectedBooks,
    });

    var config = {
      method: "patch",
      url: ApiName + "/shelf",
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
        $("#shelfNameInput").val("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/shelf/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#shelfNameInput").val(response.data.shelf.name);
        self.setState({
          createShelf: true,
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
      url: ApiName + "/shelf",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد.");
      });
  };
  loadOptions = () => {
    var config = {
      method: "get",
      url: ApiName + "/books",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ booksOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/shelf/" + id,
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
  handleShelfUpload = () => {
    var obj = {
      name: $("#shelfNameInput").val(),
      books: this.state.selectedBooks,
    };
    var config = {
      method: "post",
      url: ApiName + "/shelf",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
      data: obj,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.loadData();
        toast.success("با موفقیت ثبت شد");
      })
      .catch(function (error) {
        toast.error("مشکلی در ارتباط با سرور به وجود آمد.");
        console.log(error);
      });
  };
  onSelect(selectedList, selectedItem, self) {
    self.setState({ selectedBooks: selectedList });
  }
  onRemove(selectedList, removedItem, self) {
    self.setState({ selectedBooks: selectedList });
  }
  handleClick = () => {
    $("#shelfNameInput").val("");
    var newCreateShelf = !this.state.createShelf;
    this.setState({
      createShelf: newCreateShelf,
      updateDetails: null,
    });
  };
  componentDidMount() {
    this.loadOptions();
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
            اضافه کردن قفسه جدید +
          </button>
          <div
            className={
              this.state.createShelf === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن قفسه</p>
            ) : (
              <p className="isreg my-0"> ویرایش قفسه</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <label for="ShelfName">نام قفسه</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="shelfNameInput"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group my-2 col-md-6">
              <label for="">انتخاب کتاب ها</label>
              <Multiselect
                placeholder=""
                options={this.state.booksOptions}
                onSelect={(selectedList, selectedItem) =>
                  this.onSelect(selectedList, selectedItem, this)
                }
                onRemove={(selectedList, selectedItem) =>
                  this.onRemove(selectedList, selectedItem, this)
                }
                selectedValues={
                  this.state.updateDetails != null
                    ? this.state.updateDetails.books
                    : []
                }
                displayValue="name"
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-info"
                onClick={
                  this.state.updateDetails == null
                    ? this.handleShelfUpload
                    : this.updateData
                }
              >
                تایید
              </button>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست قفسه</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <ShelfManagementTable
                  loadUpdateData={this.loadUpdateData}
                  data={
                    this.state.tableData.length == 0 ? [] : this.state.tableData
                  }
                  removeItem={this.removeItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShelfManagement;
