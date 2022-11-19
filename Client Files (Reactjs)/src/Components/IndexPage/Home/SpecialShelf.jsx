import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ApiName } from "../../ApiName";
import Slider from "react-slick";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class SpecialShelf extends Component {
  state = { data: null, showShelf: false, orderType: 1 };
  loadData = (orderType) => {
    if (orderType == "mostSales") this.setState({ orderType: 1 });
    if (orderType == "mostLiked") this.setState({ orderType: 2 });
    var config = {
      method: "get",
      url: ApiName + "/shelf/specialShelf?orderType=" + orderType,
      headers: {
        "Content-Type": "application/json",
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          data: response.data,
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadData("mostSales");
  }
  render() {
    var data = this.state.data;
    var settings = {
      dots: true,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
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
      <div className="rounded shadow bg-dark py-3 mt-0 pt-0 mb-2 drtl pb-0">
        <div className="row">
          <p className=" col-md-4 container isreg text-light py-3 my-2 pb-3 text-sm-center text-xs-center inline-block pe-5">
            پرفروش ترین و محبوب ترین کتاب های اخیر
          </p>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-12 py-sm-3 flexit">
                  <button
                    style={{ borderRadius: "25px", width: "150px" }}
                    className={
                      this.state.orderType == 1
                        ? "btn btn-light isreg  mx-sm-auto"
                        : "btn btn-secondary isreg  mx-sm-auto"
                    }
                    onClick={() => this.loadData("mostSales")}
                  >
                    پرفروش ترین ها
                  </button>
                </div>

                <div className="col-md-6 col-sm-12 flexit py-sm-3">
                  <button
                    style={{ borderRadius: "25px", width: "150px" }}
                    type="button"
                    className={
                      this.state.orderType == 2
                        ? "btn btn-light isreg  mx-sm-auto"
                        : "btn btn-secondary isreg  mx-sm-auto"
                    }
                    onClick={() => this.loadData("mostLiked")}
                  >
                    محبوب ترین ها
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="specialShelf"
          className="rounded-bottom bg-white py-5 mx-0 mb-0 px-5"
        >
          <Slider id="shelfItself" {...settings}>
            {data != null
              ? data.map((x) => (
                  <div className="container ">
                    <Link to={"/index/booksinfo/" + x.id}>
                      <div className="container ">
                        <img
                          src={ApiName + "/images/books/" + x.imageLocation}
                          alt=""
                          className="mx-auto shadow slidercard"
                        />
                      </div>
                    </Link>
                    <div className="drtl mt-2 mb-0">
                      <p className="islight mb-1 text-center">{x.name}</p>
                      <p className="isbold mb-1 price-colour text-center flexit">
                        {x.price.toLocaleString("ar-EG")}
                        <span> ریال</span>
                      </p>
                      {x.offPrice != null ? (
                        <del className="islight mx-auto d-block text-center">
                          {x.offPrice.toLocaleString("ar-EG")}
                        </del>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))
              : ""}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SpecialShelf;
