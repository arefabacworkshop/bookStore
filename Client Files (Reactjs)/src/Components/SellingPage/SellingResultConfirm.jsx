import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { ApiName } from "../ApiName";
import { toast } from "react-toastify";
import zarinpal from "../../Assets/img/zarinpal.png";
class SellingResultConfirm extends React.Component {
  state = {
    address: {},
    books: [],
    cartList: [],
    bookIds: [],
    totalPrice: 0,
    postPrice: 0,
    isDone: false,
  };
  loadCart = () => {
    var cart = JSON.parse(localStorage.shopingcart);
    this.setState({ cartList: cart });
  };
  loadBooks = () => {
    var data = localStorage.shopingcart;

    var config = {
      method: "post",
      url: ApiName + "/books/listofbooks",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          books: response.data.books,
          totalPrice: response.data.totalPrice,
          postPrice: response.data.postPrice,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUser = () => {
    var token = localStorage.ValidationToken;
    var config = {
      method: "get",
      url: ApiName + "/address/" + localStorage.addressId,
      headers: {
        Authorization: token,
      },
    };

    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ address: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("سرور با مشکل روبرو شده است");
      });
  };
  handleOrderCreate = () => {
    if (JSON.parse(localStorage.shopingcart).length == 0) {
      toast.error("لطفا کتابی برای خرید انتخاب کنید");
      return;
    }
    var data = localStorage.shopingcart;

    var config = {
      method: "post",
      url: ApiName + "/order?addressId=" + localStorage.addressId,
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("سفارش ساخته شد.");
        console.log(response);
        localStorage.removeItem("shopingcart");
        window.location.href = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadUser();
    this.loadCart();
    this.loadBooks();
  }
  render() {
    if (this.state.isdone) return <Redirect to="/index" />;
    return (
      <React.Fragment>
        <div class="buy-product container isreg">
          <div class="container steps text-dark mt-3 rounded shadow">
            <div class="row">
              <div class="step-1 col-md-4">
                <div class=" step-1-circle mx-auto">1</div>
                <p>اعتبار سنجی</p>
              </div>
              <div class="  step-2 col-md-4 ">
                <div class="  step-2-circle mx-auto">2</div>
                <p>اطلاعات پستی</p>
              </div>
              <div class="step-3 col-md-4">
                <div class=" bg-info step-3-circle mx-auto ">3</div>
                <p>تایید نهایی</p>
              </div>
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="card mt-3 dir-rtl text-right shadow">
            <div id="confirmheader" class="card-header">
              تایید اطلاعات
            </div>
            <div
              id="DivToPrint"
              class="confirmbody card-body container card-customization"
            >
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <p class="isbold">اطلاعات محصول</p>
                  <table class="table table-borderless table-striped table-responsive-sm">
                    <thead>
                      <tr>
                        <th>نام محصول</th>
                        <th>نویسنده</th>
                        <th>ناشر</th>
                        <th>تعداد</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.books.map((x) => (
                        <tr>
                          <td>{x.book.name}</td>
                          <td>{x.writers.map((y) => y.name + " ")}</td>
                          <td>{x.publishers.map((y) => y.name + " ")}</td>
                          <td>{x.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p class="isbold">اطلاعات پستی</p>
                  <table class="table table-stripped table-bordered mb-3">
                    <thead className="isreg bg-light">
                      <tr>
                        <th scope="col">عنوان</th>
                        <th scope="col">مقدار</th>
                      </tr>
                    </thead>
                    <tbody className="isreg">
                      <tr>
                        <td>نام</td>
                        <td>{this.state.address.receiverName}</td>
                      </tr>
                      <tr>
                        <td>تلفن همراه</td>
                        <td>{this.state.address.phoneNumber}</td>
                      </tr>
                      <tr>
                        <td>آدرس پستی</td>
                        <td>{this.state.address.address}</td>
                      </tr>
                      <tr>
                        <td>شهر</td>
                        <td>{this.state.address.city}</td>
                      </tr>
                      <tr>
                        <td>استان</td>
                        <td>{this.state.address.state}</td>
                      </tr>
                      <tr>
                        <td>کد پستی</td>
                        <td>{this.state.address.zipcode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6 col-sm-12 pe-5 border-end">
                  <p className="isbold mt-5">درگاه پرداخت</p>
                  <a target="_blank" href="https://www.zarinpal.com/">
                    <img
                      width={100}
                      height={100}
                      src={zarinpal}
                      alt=""
                      className="border border-warning p-2 rounded mb-4"
                    />
                  </a>
                  <div className="col-md-8 col-sm-12">
                    <table class="mb-4 table table-borderless table-bordered mt-3">
                      <thead className="bg-light">
                        <tr>
                          <th>عنوان</th>
                          <th>مقدار</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>هزینه کل کتاب ها</td>
                          <td>
                            {this.state.totalPrice.toLocaleString("ar-EG")} ریال
                          </td>
                        </tr>
                        <tr>
                          <td>هزینه پست</td>
                          <td>
                            {this.state.postPrice.toLocaleString("ar-EG")} ریال
                          </td>
                        </tr>
                        <tr>
                          <td>مبلغ قابل پرداخت</td>
                          <td>
                            {(
                              this.state.totalPrice + this.state.postPrice
                            ).toLocaleString("ar-EG")}{" "}
                            ریال
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Link to="/sellresult/postDetails">
                <button type="button" class="btn btn-outline-info mt-3">
                  برگشت
                </button>
              </Link>
              <button
                onClick={this.handleOrderCreate}
                type="button"
                class="btn btn-success mt-3 float-start"
              >
                تایید و پرداخت
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellingResultConfirm;
