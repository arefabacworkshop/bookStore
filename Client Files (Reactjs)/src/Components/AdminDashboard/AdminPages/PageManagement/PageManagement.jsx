import "./PageManagement.css";
import React, { Component, useState } from "react";
import PageManangementTable from "./PageManangementTable";
import axios from "axios";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { ApiName } from "../../../ApiName";
import $ from "jquery";
class PageManagement extends React.Component {
  state = {
    createPage: false,
    selectedWriters: [],
    selectedTranslators: [],
    selectedPublishers: [],
    selectedCategories: [],
    selectedBooks: [],
    updatePage: {},
    writerOptions: [],
    publisherOptions: [],
    translatorOptions: [],
    categoryOptions: [],
    bookOptions: [],
    isValid: true,
    pages: [],
  };
  updateData = (id) => {
    if (!this.validateForms()) return;
    var data = JSON.stringify({
      id: id,
      name: $("#nameInput").val(),
      categories:
        this.state.selectedCategories.length == 0
          ? this.state.updatePage.pageCategory
          : this.state.selectedCategories,
      writers:
        this.state.selectedWriters.length == 0
          ? this.state.updatePage.pageWriters
          : this.state.selectedWriters,
      publishers:
        this.state.selectedPublishers.length == 0
          ? this.state.updatePage.pagePublishers
          : this.state.selectedPublishers,
      translators:
        this.state.selectedTranslators.length == 0
          ? this.state.updatePage.pageTranslators
          : this.state.selectedTranslators,
      books:
        this.state.selectedBooks.length == 0
          ? this.state.updatePage.pageBooks
          : this.state.selectedBooks,
    });

    var config = {
      method: "patch",
      url: ApiName + "/page",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("با موفقیت ویرایش شد");
        $("#nameInput").val("");
        self.setState({
          selectedBooks: [],
          selectedCategories: [],
          selectedPublishers: [],
          selectedTranslators: [],
          selectedWriters: [],
          updatePage: null,
        });
        self.loadPage();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/page/updateDetails/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#nameInput").val(response.data.page.name);
        self.setState({
          createPage: true,
          updatePage: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/page/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        if (self.state.pages.length == 1) window.location.reload(false);
        else {
          toast.success("با موفقیت حذف شد.");
          self.loadPage();
        }
      })
      .catch(function (error) {
        toast.error("مشکلی در حذف آیتم به وجود آمد.");
      });
  };
  loadOptions = () => {
    //books
    var config = {
      method: "get",
      url: ApiName + "/books",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ bookOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //publisher
    var config = {
      method: "get",
      url: ApiName + "/publisher",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ publisherOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //writer
    var config = {
      method: "get",
      url: ApiName + "/writer",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ writerOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //translator
    var config = {
      method: "get",
      url: ApiName + "/translator",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ translatorOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //category
    var config = {
      method: "get",
      url: ApiName + "/category",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ categoryOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };
  handleClick = () => {
    $("#nameInput").val("");

    this.setState({
      updatePage: null,
      selectedPublishers: [],
      selectedCategories: [],
      selectedTranslators: [],
      selectedWriters: [],
      selectedBooks: [],
    });
    var newCreateBook = !this.state.createPage;
    this.setState({ createPage: newCreateBook });
  };
  loadPage = () => {
    var config = {
      method: "get",
      url: ApiName + "/page/all",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ pages: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleCreatePage = () => {
    if (!this.validateForms()) return;
    var data = JSON.stringify({
      name: $("#nameInput").val(),
      categories: this.state.selectedCategories,
      writers: this.state.selectedWriters,
      publishers: this.state.selectedPublishers,
      translators: this.state.selectedTranslators,
      books: this.state.selectedBooks,
    });

    var config = {
      method: "post",
      url: ApiName + "/page",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("با موفقیت اضافه شد");
        $("#nameInput").val("");
        self.setState({
          selectedBooks: [],
          selectedCategories: [],
          selectedPublishers: [],
          selectedTranslators: [],
          selectedWriters: [],
        });
        self.loadPage();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onSelect(selectedList, selectedItem, self, type) {
    if (type == "writer") self.setState({ selectedWriters: selectedList });
    if (type == "category") self.setState({ selectedCategories: selectedList });
    if (type == "translator")
      self.setState({ selectedTranslators: selectedList });
    if (type == "publisher")
      self.setState({ selectedPublishers: selectedList });
    if (type == "book") self.setState({ selectedBooks: selectedList });
  }
  onRemove(selectedList, removedItem, self, type) {
    if (type == "writer") self.setState({ selectedWriters: selectedList });
    if (type == "category") self.setState({ selectedCategories: selectedList });
    if (type == "translator")
      self.setState({ selectedTranslators: selectedList });
    if (type == "publisher")
      self.setState({ selectedPublishers: selectedList });
    if (type == "book") self.setState({ selectedBooks: selectedList });
  }
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

  componentDidMount() {
    this.loadOptions();
    this.loadPage();
  }
  render() {
    return (
      <React.Fragment>
        <div className="drtl">
          <button
            onClick={this.handleClick}
            className="btn btn-secondary px-2 islight mb-2"
          >
            ایجاد صفحه جدید +
          </button>
          <div
            className={
              this.state.createPage === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-2 mb-2"
            }
          >
            <form className="col-md-6 requires-validation" action="">
              <div class="form-group">
                <label for="nameInput">نام</label>
                <input
                  type="text"
                  required
                  class="form-control was-validated"
                  name=""
                  id="nameInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب کتاب ها</label>
                <Multiselect
                  placeholder=""
                  options={this.state.bookOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "book")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "book")
                  }
                  selectedValues={
                    this.state.updatePage != null
                      ? this.state.updatePage.pageBooks
                      : []
                  }
                  displayValue="name"
                />
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب نویسندگان</label>
                <Multiselect
                  placeholder=""
                  options={this.state.writerOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "writer")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "writer")
                  }
                  selectedValues={
                    this.state.updatePage != null
                      ? this.state.updatePage.pageWriters
                      : []
                  }
                  displayValue="name"
                />
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب مترجمان</label>
                <Multiselect
                  placeholder=""
                  options={this.state.translatorOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(
                      selectedList,
                      selectedItem,
                      this,
                      "translator"
                    )
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(
                      selectedList,
                      selectedItem,
                      this,
                      "translator"
                    )
                  }
                  selectedValues={
                    this.state.updatePage != null
                      ? this.state.updatePage.pageTranslators
                      : []
                  }
                  displayValue="name"
                />
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب انتشارات</label>
                <Multiselect
                  placeholder=""
                  options={this.state.publisherOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "publisher")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "publisher")
                  }
                  selectedValues={
                    this.state.updatePage != null
                      ? this.state.updatePage.pagePublishers
                      : []
                  }
                  displayValue="name"
                />
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب موضوعات</label>
                <Multiselect
                  placeholder=""
                  options={this.state.categoryOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "category")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "category")
                  }
                  selectedValues={
                    this.state.updatePage != null
                      ? this.state.updatePage.pageCategory
                      : []
                  }
                  displayValue="name"
                />
              </div>
              <button
                type="button"
                onClick={
                  this.state.updatePage == null
                    ? this.handleCreatePage
                    : () => this.updateData(this.state.updatePage.page.id)
                }
                className="btn btn-success"
              >
                ارسال
              </button>
            </form>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست صفحه ها</p>
            <div className="drtl">
              {this.state.pages.length != 0 ? (
                <PageManangementTable
                  loadUpdateData={this.loadUpdateData}
                  removeItem={this.removeItem}
                  data={this.state.pages}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageManagement;
