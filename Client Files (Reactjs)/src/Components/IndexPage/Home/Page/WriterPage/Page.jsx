import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Page extends React.Component {
  render() {
    return (
      <div className="row drtl ">
        <div className=" col-md-3 col-sm-12">
          <div className="container shadow-sm rounded bg-white p-3 mb-2 isreg">
            <div class="form-group">
              <label className="isreg" for="search">
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
          <div className="container shadow-sm rounded bg-white p-3 mb-2 isreg">
            <p className="isreg">موضوعات</p>
            <ul className="list-unstyled py-1 writers-list rounded border">
              {this.props.categories.map((x) => {
                return (
                  <li>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          name=""
                          id=""
                          onChange={(e) =>
                            this.props.handleChecks(e, "category", x.id)
                          }
                          value="checkedValue"
                        />
                        {x.name}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="container shadow-sm rounded bg-white p-3 mb-2 isreg">
            <p className="isreg">انتشارات</p>
            <ul className="list-unstyled py-1 writers-list rounded border">
              {this.props.publishers.map((x) => (
                <li>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id=""
                        onChange={(e) =>
                          this.props.handleChecks(e, "publisher", x.id)
                        }
                        value="checkedValue"
                      />
                      {x.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="container shadow-sm rounded bg-white p-3 mb-2 isreg">
            <p className="isreg">مترجم</p>
            <ul className="list-unstyled py-1 writers-list rounded border">
              {this.props.translators.map((x) => (
                <li>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        name=""
                        id=""
                        onChange={(e) =>
                          this.props.handleChecks(e, "translator", x.id)
                        }
                        value="checkedValue"
                      />
                      {x.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" col-md-9 col-sm-12">
          {this.props.books.map((x) => (
            <div className="container shadow rounded bg-white p-3 mb-2">
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <Link to={"/index/booksinfo/" + x.book.id}>
                    <div className="container text-center mt-2">
                      <img
                        src={x.book.imageLocation}
                        width="240px"
                        height="240px"
                        alt=""
                        className=""
                      />
                    </div>
                  </Link>
                </div>
                <div className="col-md-8 col-sm-12">
                  <div className="container py-4">
                    <Link to={"/index/booksinfo/" + x.book.id}>
                      <p className="text-dark isbold my-0">{x.book.name}</p>
                    </Link>

                    <p className="my-0 isreg small text-muted">
                      <span>
                        {x.writers.map((x) => (
                          <span>{x.name}&nbsp;</span>
                        ))}
                      </span>{" "}
                      ،
                      <span>
                        {x.translators.map((x) => (
                          <span>{x.name}&nbsp;</span>
                        ))}
                      </span>
                    </p>
                    <hr />
                    <p className="isbold">
                      ناشر:
                      <span className="isreg">
                        {x.publishers.map((x) => (
                          <span>{x.name}&nbsp;</span>
                        ))}
                      </span>
                    </p>
                    <br />
                    <p className="isbold text-info">
                      {x.book.offPrice != null ? (
                        <del className="small text-muted isreg">
                          {x.book.offPrice} ریال
                        </del>
                      ) : (
                        ""
                      )}
                      &nbsp; {x.book.price} ریال
                    </p>
                    <br />

                    <Link to={"/index/booksinfo/" + x.book.id}>
                      <button
                        type="button"
                        className=" isreg btn btn-info border  text-light"
                      >
                        اضافه کردن به سبد خرید +
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Page);
