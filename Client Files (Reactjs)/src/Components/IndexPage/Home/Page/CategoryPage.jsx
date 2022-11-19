import React, { Component, useState } from "react";
import "./Page.css";
import Page from "./Page";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { withRouter, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiName } from "../../../ApiName";
import { FaThemeisle } from "react-icons/fa";
import _ from "lodash";
class CategoryPage extends React.Component {
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
    orderType: 1,
    pageCount: 1,
    currentPage: 0,
    hasMore: false,
    loading: true,
  };
  changeOrderType = (e) => {
    this.setState({ orderType: e.target.value });
  };
  changeIsExist = (e) => {
    if (e.target.checked) this.setState({ isExist: true });
    else this.setState({ isExist: false });
  };
  handleNameChange = (e) => {
    if (e.target.value == "") this.setState({ name: null });
    else this.setState({ name: e.target.value });
  };
  loadMore = () => {
    if (this.state.loading) return;
    else {
      console.log("loadMore");
      if (this.state.currentPage >= this.state.pageCount) {
        this.setState({ hasMore: false });
        return;
      }
      this.setState({ loading: true });
      this.updateBooks();
    }
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
    } else if (type == "writer") {
      if (event.target.checked) {
        var temppub = this.state.selectedWriters;
        temppub.push(id);
        this.setState({ selectedWriters: temppub });
      } else {
        var temppub = this.state.selectedWriters;
        temppub.splice(temppub.indexOf(id), 1);
        this.setState({ selectedWriters: temppub });
      }
    }
  };
  loadPageDetail = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/page/category/" + id,
      headers: {
        "Content-Type": "application/json",
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          publishers: response.data.listOfPublishers,
          writers: response.data.listOfWriters,
          translators: response.data.listOfTranslators,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمده است.");
      });
  };
  handleConfirm = () => {
    this.setState({ currentPage: 0 });

    this.loadMore();
  };
  updateBooks = () => {
    var data = JSON.stringify({
      id: this.props.match.params.id,
      type: "category",
      writersId: this.state.selectedWriters,
      publishersId: this.state.selectedPublishers,
      translatorsId: this.state.selectedTranslators,
      categoriesId: this.state.selectedCategories,
      isExist: this.state.isExist,
      name: this.state.name,
      order: this.state.orderType,
      pageNum: this.state.currentPage + 1,
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
        console.log(response.data);
        if (response.data.currentPage != 1) {
          self.setState({
            books: [...self.state.books, ...response.data.result],
            pageCount: response.data.pageDataCount,
            loading: false,
            renew: false,
            currentPage: response.data.currentPage,
          });
        } else {
          self.setState({
            books: response.data.result,
            pageCount: response.data.pageDataCount,
            loading: false,
            renew: false,
            currentPage: response.data.currentPage,
          });
        }
        if (response.data.pageDataCount == 1) {
          self.setState({ hasMore: false });
        } else {
          self.setState({ hasMore: true });
        }
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ books: [], loading: false });
      });
  };
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  componentDidMount() {
    this.loadPageDetail(this.props.match.params.id);
    this.updateBooks();
  }
  render() {
    return (
      <React.Fragment>
        {/* <ul className="breadCrumbList isreg text-secondary mb-2">
          <li>خانه</li>
          <li className=" small">{"/"}</li>
          <li>جستجو</li>
          <li className=" small">{"/"}</li>
          <li>{this.state.pageTitle}</li>
        </ul> */}
        <div className="container bg-white more-rounded shadow mb-2 p-2 isreg drtl">
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
                  onClick={this.changeIsExist}
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
          writers={this.state.writers}
          translators={this.state.translators}
          handleChecks={this.handleCheckmarks}
          loadMore={this.loadMore}
          books={this.state.books}
          handleNameChange={this.handleNameChange}
          handleConfirm={this.handleConfirm}
          hasMore={this.state.hasMore}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(CategoryPage);
