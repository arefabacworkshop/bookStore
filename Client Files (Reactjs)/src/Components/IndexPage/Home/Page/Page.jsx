import React, { Component } from "react";
import "./Page.css";
import likeimg from "../../../../Assets/img/like.png";
import unlikeimg from "../../../../Assets/img/unlike.png";
import bookimg from "../../../../Assets/img/Bookimg.png";
import { ApiName } from "../../../ApiName";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

class Page extends React.Component {
  render() {
    return (
      <div className="row drtl ">
        <div className=" col-md-3 col-sm-12">
          <div className="container shadow-sm more-rounded bg-white p-3 mb-2 islight">
            <div class="form-group">
              <label className="islight" for="search">
                جستجو
              </label>
              <input
                type="text"
                onChange={this.props.handleNameChange}
                class="form-control islight"
                name="search"
                id="searchinpage"
                aria-describedby="helpId"
                placeholder="عنوان ..."
              />
            </div>
          </div>
          <div className="container shadow-sm more-rounded bg-white py-3 mb-2 islight">
            <p className="islight">نویسنده</p>
            <ul className="mx-0 px-0 list-unstyled py-1 writers-list more-rounded overflow-auto scrollbar">
              {this.props.writers.map((x) => {
                return (
                  <li>
                    <label class="custom-control custom-checkbox pe-1">
                      <input
                        onChange={(e) =>
                          this.props.handleChecks(e, "writer", x.id)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        value="checkedValue"
                        class="form-check-input"
                      />
                      <span class="custom-control-indicator me-2 ">
                        {x.name}
                      </span>
                      <span class="custom-control-description"></span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="container shadow-sm more-rounded bg-white py-3 mb-2 islight">
            <p className="islight">انتشارات</p>
            <ul className="mx-0 px-0 list-unstyled py-1 writers-list more-rounded overflow-auto scrollbar">
              {this.props.publishers.map((x) => (
                <li>
                  <label class="custom-control custom-checkbox pe-1">
                    <input
                      onChange={(e) =>
                        this.props.handleChecks(e, "publisher", x.id)
                      }
                      type="checkbox"
                      name=""
                      id=""
                      value="checkedValue"
                      class="form-check-input"
                    />
                    <span class="custom-control-indicator me-2 ">{x.name}</span>
                    <span class="custom-control-description"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="container shadow-sm more-rounded bg-white py-3 mb-2 islight">
            <p className="islight">مترجم</p>
            <ul className="mx-0 px-0 list-unstyled py-1 writers-list more-rounded overflow-auto scrollbar">
              {this.props.translators.map((x) => (
                <li>
                  <label class="custom-control custom-checkbox text-dark pe-1">
                    <input
                      onChange={(e) =>
                        this.props.handleChecks(e, "translator", x.id)
                      }
                      type="checkbox"
                      name=""
                      id=""
                      value="checkedValue"
                      class="form-check-input"
                    />
                    <span class="custom-control-indicator me-2 ">{x.name}</span>
                    <span class="custom-control-description"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={this.props.handleConfirm}
            className="btn isreg btn-info px-3"
          >
            اعمال
          </button>
        </div>
        <div className="max-height col-md-9 col-sm-12 drtl overflow-auto">
          <div className="row">
            {this.props.books.map((x) => (
              <div className="col-xl-3 col-lg-4 col-md-6 mb-3 col-sm-12">
                <div
                  style={{ minHeight: "370px" }}
                  className="container bg-white rounded pt-3 pb-2 shadow-sm text-right"
                >
                  <div className="text-center">
                    <Link
                      className="link-dark"
                      to={"/index/booksinfo/" + x.book.id}
                    >
                      <img
                        width={110}
                        height={160}
                        src={ApiName + "/images/books/" + x.book.imageLocation}
                        alt=""
                        className="shadow-sm"
                      />
                      <p
                        maxLength="55"
                        className="my-1 small isreg text-center"
                      >
                        {x.book.name.slice(0, 45) +
                          (x.book.name.length > 45 ? "..." : "")}
                      </p>
                    </Link>
                  </div>

                  <small className="isreg" style={{ color: "#214485" }}>
                    قیمت : {x.book.price.toLocaleString("ar-EG")}&nbsp;ریال
                  </small>
                  {x.book.offPrice != null ? <br /> : ""}
                  <small
                    className={x.book.offPrice != null ? "isreg" : "d-none"}
                    style={{ color: "#214485" }}
                  >
                    قیمت قبلی :{" "}
                    <del className="text-danger">
                      {x.book.offPrice != null
                        ? x.book.offPrice.toLocaleString("ar-EG")
                        : ""}
                      &nbsp;ریال
                    </del>
                  </small>
                  <br />
                  <small className="isreg">
                    ناشر:&nbsp;
                    {x.publishers[0].name}
                  </small>
                  <br />
                  <small className="isreg">
                    قطع:&nbsp;
                    {x.book.bookSize}
                  </small>
                  <br />
                  <small className="isreg">
                    نوع جلد:&nbsp;
                    {x.book.coverType}
                  </small>
                </div>
              </div>
            ))}
            <InfiniteScroll
              pageStart={1}
              loadMore={this.props.loadMore}
              hasMore={this.props.hasMore}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            ></InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
