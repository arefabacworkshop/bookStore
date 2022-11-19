import React, { Component } from "react";
import "./AdvancedSearch.css";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
import bookImg from "../../../../Assets/img/product-image.jpg";
import { Link, withRouter } from "react-router-dom";
class AdvancedSearch extends Component {
  state = {
    publishers: [],
    writers: [],
    translators: [],
    categories: [],
    pageCount: 9,
    pageNo: 0,
    books: [],
  };
  handleSearch = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      name: $("#nameInput").val(),
      bookNo: $("#bookNoInput").val(),
      publisherId: $("#publisherInput").val(),
      writerId: $("#writerInput").val(),
      translatorId: $("#translatorInput").val(),
      categoryId: $("#categoryId").val(),
      publishDate: $("#publishDateInput").val(),
      pageNo: this.state.pageNo,
    });

    var config = {
      method: "post",
      url: ApiName + "/search",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var This = this;
    axios(config)
      .then(function (response) {
        This.setState({ books: response.data });
      })
      .catch(function (error) {
        This.setState({ books: [] });
        toast.error("کتابی با این مشخصات پیدا نشد.");
      });
  };
  componentDidMount() {
    this.getSearchDetails();
  }

  getSearchDetails = () => {
    var config = {
      method: "get",
      url: ApiName + "/search",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          publishers: response.data.publishers,
          writers: response.data.writers,
          translators: response.data.translators,
          categories: response.data.categories,
        });
      })
      .catch(function (error) {
        toast.error("کتابی با این مشخصات پیدا نشد.");
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container bg-white drtl rounded shadow-sm py-2 mb-2">
          <p className="isreg">جستجوی پیشرفته</p>
          <form className="advancedSearchForm isreg mx-auto" action="">
            <div class="form-group">
              <label for="nameInput">نام</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="nameInput"
                aria-describedby="helpId"
                placeholder=""
                defaultValue={
                  this.props.match.params.name != "null"
                    ? this.props.match.params.name
                    : ""
                }
              />
            </div>
            <div class="form-group">
              <label for="writerInput">نویسنده</label>
              <select class="form-control" name="" id="writerInput">
                <option value={null}></option>
                {this.state.writers.map((w) => {
                  return <option value={w.id}>{w.name}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="translatorInput">مترجم</label>
              <select class="form-control" name="" id="translatorInput">
                <option value={null}></option>
                {this.state.translators.map((t) => {
                  return <option value={t.id}>{t.name}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="publisherInput">ناشر</label>
              <select class="form-control" name="" id="publisherInput">
                <option value={null}></option>
                {this.state.publishers.map((p) => {
                  return <option value={p.id}>{p.name}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="publisherInput">موضوعات</label>
              <select class="form-control" name="" id="categoryId">
                <option value={null}></option>
                {this.state.categories.map((p) => {
                  return <option value={p.id}>{p.name}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="bookNoInput">شابک</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="bookNoInput"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="publishDateInput">سال انتشار</label>
              <input
                type="text"
                class="form-control"
                name=""
                id="publishDateInput"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group text-center">
              <button
                onClick={this.handleSearch}
                className="btn btn-success mt-3"
              >
                جستجو
              </button>
            </div>
          </form>
        </div>
        <div
          className={this.state.books.length == 0 ? "d-none" : " rounded py-3"}
        >
          <div className="row">
            {this.state.books.map((x) => {
              return (
                <div className="col-md-3 mb-2 ">
                  <div className="text-dark container bg-white shadow-sm text-center py-3 border rounded height-fixed">
                    <Link to={"/index/booksInfo/" + x.id}>
                      <div className="container">
                        <img
                          src={
                            x.imageLocation != null
                              ? ApiName + "/images/books/" + x.imageLocation
                              : ""
                          }
                          alt="تصویر کتاب"
                          className="mx-auto slidercard"
                        />
                      </div>
                      <div className="drtl mt-2 mb-0">
                        <p className="islight mb-1 text-dark">{x.name}</p>
                        <p className="isreg mb-1 text-dark">
                          {x.price != null
                            ? x.price.toLocaleString("ar-EG")
                            : ""}
                          <span> ریال</span>
                        </p>
                        <del
                          className={
                            x.offPrice != null ? "islight text-dark" : "d-none"
                          }
                        >
                          {x.offPrice != null
                            ? x.offPrice.toLocaleString("ar-EG")
                            : ""}
                        </del>

                        <small className="islight link-dark mb-1 text-end">
                          قطع :{x.bookSize}
                        </small>
                        <br />
                        <small className="islight link-dark my-0 text-end">
                          نوع جلد :{x.coverType}
                        </small>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(AdvancedSearch);
