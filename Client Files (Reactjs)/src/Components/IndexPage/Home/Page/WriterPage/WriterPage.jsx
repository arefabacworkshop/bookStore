import React, { Component, useState } from "react";
import "../Page.css";
import Page from "./Page";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { withRouter, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiName } from "../../../../ApiName";
import { FaThemeisle } from "react-icons/fa";
class WriterPage extends React.Component {
  state = {
    pageTitle: null,
    data: null,
    categories: [],
    publishers: [],
    writers: [],
    name: null,
    translators: [],
    selectedPublishers: [],
    selectedTranslators: [],
    selectedWriters: [],
    selectedCategories: [],
    books: [],
    isExist: null,
    orderType: 1,
  };
  changeOrderType = (e) => {
    this.setState({ orderType: e.target.value });
    this.updateBooks();
  };
  changeIsExist = (e) => {
    this.setState({ isExist: e.target.checked });
    this.updateBooks();
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
    this.updateBooks();
  };
  handleCheckmarks = (event, type, id) => {
    if (type == "publisher") {
      if (event.target.checked) {
        var temppub = this.state.selectedPublishers;
        temppub.push(id);
        this.setState({ selectedPublishers: temppub });
      } else {
        var temppub = this.state.selectedPublishers;
        temppub.splice(temppub.indexOf(id), 1);
        this.setState({ selectedPublishers: temppub });
      }
    } else if (type == "translator") {
      if (event.target.checked) {
        var temppub = this.state.selectedTranslators;
        temppub.push(id);
        this.setState({ selectedTranslators: temppub });
      } else {
        var temppub = this.state.selectedTranslators;
        temppub.splice(temppub.indexOf(id), 1);
        this.setState({ selectedTranslators: temppub });
      }
    } else if (type == "category") {
      if (event.target.checked) {
        var temppub = this.state.selectedCategories;
        temppub.push(id);
        this.setState({ selectedCategories: temppub });
      } else {
        var temppub = this.state.selectedCategories;
        temppub.splice(temppub.indexOf(id), 1);
        this.setState({ selectedCategories: temppub });
      }
      this.updateBooks();
    }
  };
  loadPageDetail = (id) => {
    var config = {
      method: "get",
      url: "https://localhost:44301/page/writer/" + id,
      headers: {
        "Content-Type": "application/json",
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          publishers: response.data.listofPublishers,
          translators: response.data.listofTranslators,
          categories: response.data.listofCategories,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمده است.");
      });
  };
  updateBooks = () => {
    var data = JSON.stringify({
      id: this.props.match.params.id,
      type: "writer",
      writersId: this.selectedWriters,
      publishersId: this.state.selectedPublishers,
      translatorsId: this.state.selectedTranslators,
      categoriesId: this.state.selectedCategories,
      isExist: this.state.isExist,
      name: this.state.name,
      order: this.state.orderType,
    });

    var config = {
      method: "post",
      url: ApiName + "/page/search",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ books: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };
  componentDidMount() {
    this.loadPageDetail(this.props.match.params.id);
    this.updateBooks();
  }
  render() {
    return (
      <React.Fragment>
        <ul className="breadCrumbList isreg text-secondary mb-2">
          <li>خانه</li>
          <li className=" small">{"/"}</li>
          <li>جستجو</li>
          <li className=" small">{"/"}</li>
          <li>{this.state.pageTitle}</li>
        </ul>
        <div className="container bg-white rounded shadow mb-2 p-2 isreg drtl">
          <div className="row">
            <div className="col-md-4 isreg col-sm-12 text-center flexit">
              <p className="mx-2 my-2 tartib-name ">ترتیب بر اساس:</p>
              <select
                onChange={this.changeOrderType}
                class="form-select islight select-tartib"
                aria-label="Default select example"
              >
                <option value={1} selected>
                  پرفروش ترین
                </option>
                <option value={2}>قیمت : کم به زیاد</option>
                <option value={3}>قیمت : زیاد به کم</option>
              </select>
            </div>

            <div className="col-md-2 col-sm-12 flexit">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  موجود بودن{" "}
                </label>
              </div>
            </div>
          </div>
        </div>
        <Page
          publishers={this.state.publishers}
          categories={this.state.categories}
          translators={this.state.translators}
          handleChecks={this.handleCheckmarks}
          books={this.state.books}
          handleNameChange={this.handleNameChange}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(WriterPage);
