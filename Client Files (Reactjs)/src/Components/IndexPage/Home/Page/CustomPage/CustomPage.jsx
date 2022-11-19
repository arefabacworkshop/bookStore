import React, { Component, useState } from "react";
import "./Page.css";
import Page from "./Page";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { withRouter, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiName } from "../../../../ApiName";
import { FaThemeisle } from "react-icons/fa";
import $ from "jquery";
import _ from "lodash";
class CustomPage extends React.Component {
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
    pageCount: 1,
    currentPage: 0,
    hasMore: false,
    loading: true,
    orderType: 1,
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
  handleConfirm = () => {
    this.setState({ currentPage: 0 });

    this.loadMore();
  };
  changeOrderType = (e) => {
    this.setState({ orderType: e.target.value });
  };
  changeIsExist = (e) => {
    if (e.target.checked) {
      this.setState({ isExist: true });
    } else this.setState({ isExist: false });
  };
  handleNameChange = (e) => {
    if (e.target.value == "") this.setState({ name: null });
    else this.setState({ name: e.target.value });
  };
  handlePageChange = (data) => {
    var selected = data.selected;
    this.setState({ currentPage: selected });
  };
  getCurrentBooks = (books, currentPage, pageCount) => {
    var lastIndex = currentPage * 10;
    var startIndex = lastIndex - 10;
    var result;
    if (lastIndex != 0) {
      if (books.length < lastIndex) lastIndex = books.length;
      console.log(startIndex, lastIndex);
      result = _.slice(books, startIndex, lastIndex);
      console.log(result);
    } else result = books;

    return result;
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
    }
  };
  loadPageDetail = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/page/" + id,
      headers: {
        "Content-Type": "application/json",
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          publishers: response.data.pagePublishers,
          writers: response.data.pageWriters,
          translators: response.data.pageTranslators,
          categories: response.data.pageCategory,
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
      type: "custom",
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
  componentDidMount() {
    this.loadPageDetail(this.props.match.params.id);
    this.updateBooks();
  }
  render() {
    return (
      <React.Fragment>
        <div className="container bg-white more-rounded shadow mb-2 p-2 isreg drtl">
          <div className="row">
            <div className="col-md-4 isreg col-sm-12 text-center flexit">
              <p className="mx-2 my-2 tartib-name ">ترتیب بر اساس:</p>
              <select
                onChange={this.changeOrderType}
                class="form-select islight select-tartib"
                aria-label="Default select example"
              >
                <option id="orderInput" value={1} selected>
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
                  id="isExistInput"
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
          categories={this.state.categories}
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

export default withRouter(CustomPage);
