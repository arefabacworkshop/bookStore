import React, { Component } from "react";
import bookimg from "../../../../Assets/img/Bookimg.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Shelf from "../Shelf";
import { toast } from "react-toastify";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import $ from "jquery";
import ImageGallery from "react-image-gallery";
import "./Booksinfo.css";
import "react-image-gallery/styles/css/image-gallery.css";
class BooksInfo extends React.Component {
  state = {
    bookHearted: false,
    heartDetail: null,
    Authorized: false,
    book: 1,
    comments: [],
    publishers: [],
    translators: [],
    writers: [],
    categories: [],
    buyCount: 1,
    bookImages: [],
  };
  componentDidMount() {
    this.getBookInfo(this.props.match.params.id);
    this.getComments(this.props.match.params.id);
    this.loadBookImages(this.props.match.params.id);
  }
  getBookImages = (id) => {
    var images;
    var config = {
      method: "get",
      url: ApiName + "/books/bookimage/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        images = response.data.bookImages;
      })
      .catch(function (error) {
        console.log(error);
      });
    return images;
  };
  loadBookImages = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/books/bookimage/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ bookImages: response.data.bookImages });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getComments = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/comment/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ comments: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleHearted = () => {
    var self = this;
    if (this.state.bookHearted) {
      var config = {
        method: "delete",
        url: ApiName + "/like/" + self.state.book.id,
        headers: {
          Authorization: localStorage.ValidationToken,
        },
      };

      axios(config)
        .then(function (response) {
          self.setState({ bookHearted: !self.state.bookHearted });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var config = {
        method: "post",
        url: ApiName + "/like/" + self.state.book.id,
        headers: {
          Authorization: localStorage.ValidationToken,
        },
      };

      axios(config)
        .then(function (response) {
          self.setState({ bookHearted: !self.state.bookHearted });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  getHeartInfo = () => {
    var self = this;
    var config = {
      method: "get",
      url: ApiName + "/like/" + self.state.book.id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };

    axios(config)
      .then(function (response) {
        self.setState({ bookHearted: true });
      })
      .catch(function (error) {
        self.setState({ bookHearted: false });
      });
  };
  getBookInfo = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/books/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };

    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          book: response.data.book,
          publishers: response.data.publishers,
          translators: response.data.translators,
          writers: response.data.writers,
          categories: response.data.categories,
        });
        self.getHeartInfo();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  sendComment = () => {
    var data = JSON.stringify({
      bookId: this.props.match.params.id,
      text: $("#commentInput").val(),
    });

    var config = {
      method: "post",
      url: ApiName + "/comment",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success(
          " نظر شما با موفقیت ارسال شد و پس از تایید در این صفحه قابل مشاهده خواهد بود"
        );
      })
      .catch(function (error) {
        toast.error("ابتدا وارد شوید بعد نظر خود را ثبت کنید.");
      });
  };
  render() {
    var images = [];
    var result = [];
    if (this.state.bookImages.length != 0) {
      images = [
        { imageLocation: this.state.book.imageLocation },
        ...this.state.bookImages,
      ];

      for (var i = 0; i < images.length; i++) {
        result.push({
          original: ApiName + "/images/books/" + images[i].imageLocation,
          thumbnail: ApiName + "/images/books/" + images[i].imageLocation,
          fullscreen: ApiName + "/images/books/" + images[i].imageLocation,
          thumbnailWidth: "55px",
          thumbnailHeight: "45px",
          thumbnailClass: "image-thumb",
          originalClass: "fixed-book-img",
          sizes: "width : 200px",
        });
      }
    }

    if (this.props.match.params.id == null) return <Redirect to="/index" />;
    else
      return (
        <div>
          <div className="container pageBreadCrumb"></div>
          <div className="mb-3 container shadow-sm bg-white py-3 rounded text-right drtl">
            <div className="row">
              <div className="col-md-3 col-sm-12 pt-2 py-5">
                <div
                  style={{ width: "200px", height: "200px" }}
                  className="container pb-5 mt-0 mb-4 dltr"
                >
                  {this.state.bookImages.length <= 1 ? (
                    <img
                      src={
                        ApiName +
                        "/images/books/" +
                        this.state.book.imageLocation
                      }
                      alt=""
                      className="img-fluid"
                    />
                  ) : (
                    ""
                  )}
                  {this.state.bookImages.length > 1 ? (
                    <ImageGallery
                      showPlayButton={false}
                      autoPlay={false}
                      items={result}
                      showNav={false}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    this.state.bookImages.length > 1 ? "py-3  " : "d-none"
                  }
                ></div>
              </div>

              <div className="col-md-9 col-sm-12 pt-2 py-5 px-0 mx-0">
                <div className="container islight">
                  <p className="my-0 mt-2">{this.state.book.name}</p>
                  <p className=" my-0 badge bg-success">
                    {this.state.book != 1
                      ? this.state.book.price.toLocaleString("ar-EG")
                      : ""}{" "}
                    ریال
                  </p>
                  &nbsp;
                  <br />
                  {this.state.book.offPrice != null ? (
                    <p className=" my-0 badge text-danger">
                      <del>
                        {this.state.book != 1
                          ? this.state.book.offPrice.toLocaleString("ar-EG")
                          : ""}
                      </del>{" "}
                      ریال
                    </p>
                  ) : (
                    ""
                  )}
                  <div class="form-group my-2 col-md-2">
                    <label for="">تعداد:</label>
                    <input
                      type="number"
                      class="form-control"
                      name=""
                      id="buyCount"
                      aria-describedby="helpId"
                      placeholder=""
                      defaultValue={1}
                      min={this.state.book.countInStorage === 0 ? 0 : 1}
                      max={this.state.book.countInStorage}
                    />
                    <small id="helpId" class="form-text text-muted">
                      موجودی فعلی انبار: &nbsp;
                      {this.state.book.countInStorage}
                    </small>
                  </div>
                  <button
                    onClick={() => {
                      var buyCount = $("#buyCount").val();
                      if (
                        buyCount <= this.state.book.countInStorage &&
                        buyCount != null &&
                        buyCount != 0 &&
                        buyCount != ""
                      )
                        return this.props.AddToCart(
                          this.state.book.id,
                          buyCount
                        );
                      else
                        toast.error(
                          "این تعداد از محصول در انبار موجود نمی باشد."
                        );
                    }}
                    className="btn btn-success"
                  >
                    اضافه کردن به سبد خرید +
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={this.handleHearted}
                    className="btn btn-warning"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    type="button"
                    title={
                      this.state.bookHearted
                        ? "به لیست علاثه مندی ها اضافه شد"
                        : "از لیست علاثه مندی ها حذف شد"
                    }
                  >
                    {this.state.bookHearted ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 rounded container shadow-sm drtl bg-white py-3">
            <nav>
              <div
                class="isreg text-info nav nav-tabs"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link text-dark active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  توضیحات
                </button>
                <button
                  class="text-dark nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  مشخصات کتاب
                </button>
                <button
                  class="nav-link text-dark"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  نظرات کاربران
                </button>
              </div>
            </nav>
            <div class="islight tab-content py-3 px-3" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                {this.state.book.describtion}
              </div>
              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <p className="isbold">مشخصات فیزیکی</p>
                <div className="col-md-4 text-right">
                  <table class="table table-borderless table-striped">
                    <thead>
                      <th className="w-25"></th>
                      <th className=""></th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="isreg" scope="row">
                          قطع کتاب
                        </td>
                        <td>{this.state.book.bookSize}</td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          نوع صفحه
                        </td>
                        <td>{this.state.book.pageType}</td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          نوع جلد
                        </td>
                        <td>{this.state.book.coverType}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="isbold">مشخصات فنی</p>
                  <table class="table table-borderless table-striped">
                    <thead>
                      <th className="w-25"></th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="isreg" scope="row">
                          نویسنده
                        </td>
                        <td>
                          {this.state.writers.map((x) => {
                            if (
                              this.state.writers.length > 1 &&
                              this.state.writers.indexOf(x) + 1 <
                                this.state.writers.length
                            )
                              return x.name + " , ";
                            else return x.name;
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          مترجم
                        </td>
                        <td>
                          {this.state.translators.map((x) => {
                            if (
                              this.state.translators.length > 1 &&
                              this.state.translators.indexOf(x) + 1 <
                                this.state.translators.length
                            )
                              return x.name + " , ";
                            else return x.name;
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          ناشر
                        </td>
                        <td>
                          {this.state.publishers.map((x) => {
                            if (
                              this.state.publishers.length > 1 &&
                              this.state.publishers.indexOf(x) + 1 <
                                this.state.publishers.length
                            )
                              return x.name + " , ";
                            else return x.name;
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          نوبت چاپ
                        </td>
                        <td>{this.state.book.nobateChap}</td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          تاریخ چاپ
                        </td>
                        <td>{this.state.book.publishDate}</td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          موضوع
                        </td>
                        <td>
                          {this.state.categories.map((x) => {
                            if (
                              this.state.categories.length > 1 &&
                              this.state.categories.indexOf(x) + 1 <
                                this.state.categories.length
                            )
                              return x.name + " , ";
                            else return x.name;
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="isreg" scope="row">
                          شابک
                        </td>
                        <td>{this.state.book.bookNo}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <form action="">
                  <div class="form-group mb-3">
                    <label className="mb-2" for="">
                      لطفا نظر خود را بنویسید
                    </label>
                    <textarea
                      class="form-control"
                      name=""
                      id="commentInput"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    onClick={this.sendComment}
                    className="btn btn-success"
                    type="button"
                  >
                    ارسال نظر
                  </button>
                </form>
              </div>
            </div>
          </div>
          {this.state.comments.map((x) => (
            <div class="card drtl mb-2 shadow-sm">
              <div class="card-header isreg">{x.name}</div>
              <div class="card-body">
                <p class="card-text islight">{x.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
  }
}

export default withRouter(BooksInfo);
