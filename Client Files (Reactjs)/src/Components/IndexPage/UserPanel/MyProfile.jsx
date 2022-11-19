import React, { Component } from "react";
import { Link } from "react-router-dom";
import ConfirmedOrders from "../../../Assets/img/online-shopping.png";
import packageimg from "../../../Assets/img/package.png";
import deliveryimg from "../../../Assets/img/delivery.png";
import Slider from "react-slick";
import { ApiName } from "../../ApiName";
import axios from "axios";
import $ from "jquery";
class MyProfile extends React.Component {
  state = {
    data: null,
  };
  loadBooks = () => {
    var config = {
      method: "get",
      url: ApiName + "/user",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadBooks();
  }
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="drtl">
        <div class="alert alert-light islight shadow-sm" role="alert">
          برای امنیت بیشتر حساب کاربری خود از رمز عبور مطمعن استفاده کنید.
          &nbsp;
          <Link className="alert-link" to={"/index/userpanel/editprofile"}>
            تغییر کلمه عبور
          </Link>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="container more-rounded shadow-sm bg-white py-4 isreg">
              <div className="row">
                <div className="col-md-3 text-center mb-2">
                  <img width={60} height={60} src={ConfirmedOrders} alt="" />
                </div>
                <div className="col-md-9 py-3 pe-4 isbold">
                  {this.state.data != null
                    ? this.state.data.unconfirmedOrdersCount
                    : ""}{" "}
                  سفارش
                  <br />
                  <small className="isreg pe-1 pt-2">تایید نشده</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="container more-rounded shadow-sm bg-white py-4 isreg ">
              <div className="row">
                <div className="col-md-3 pt-2 text-center mb-2">
                  <img width={60} height={60} src={packageimg} alt="" />
                </div>
                <div className="col-md-9 py-3 pe-4 isbold">
                  {this.state.data != null
                    ? this.state.data.processingOrdersCount
                    : ""}{" "}
                  سفارش
                  <br />
                  <small className="isreg pe-1 pt-2">در حال پردازش</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="container more-rounded shadow-sm bg-white py-4 isreg">
              <div className="row">
                <div className="col-md-3 pt-2 text-center mb-2">
                  <img width={60} height={60} src={deliveryimg} alt="" />
                </div>
                <div className="col-md-9 py-3 pe-4 isbold">
                  {this.state.data != null
                    ? this.state.data.sentOrdersCount
                    : ""}{" "}
                  سفارش
                  <br />
                  <small className="isreg pe-1 pt-2">ارسال شده</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.data != null && this.state.data.books != null ? (
          <div className="container more-rounded shadow-sm py-3 bg-white ">
            <p className="isreg">لیست آخرین خرید های شما</p>
            <div className="px-5 py-4">
              <Slider {...settings}>
                {this.state.data.books.map((x) => (
                  <div className="container">
                    <Link to={"/index/booksinfo/" + x.id}>
                      <div className="container text-center">
                        <img
                          src={ApiName + "/images/books/" + x.imageLocation}
                          alt=""
                          className="mx-auto slidercard shadow-lg"
                        />
                      </div>
                    </Link>
                    <div className="drtl mt-2 mb-0 text-center">
                      <p className="islight mb-1 text-center">{x.name}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MyProfile;
