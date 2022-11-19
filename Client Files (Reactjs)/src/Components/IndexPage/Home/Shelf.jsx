import React, { Component } from "react";
import $ from "jquery/dist/jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pimg from "../../../Assets/img/product-image.jpg";
import { Link } from "react-router-dom";
import { ApiName } from "../../ApiName";
class Shelf extends React.Component {
  componentDidMount() {
    // $(".owl-carousel").owlCarousel();
  }

  render() {
    var settings = {
      dots: true,
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
    const { data } = this.props;
    return (
      <div className="rounded contianer-fluid mb-3 p-2 bg-white  drtl isreg shadow">
        <div className="p-2" style={{ borderRight: "4px solid #214485" }}>
          <p>{data.shelf.name}</p>
        </div>
        <div className="contianer p-5 text-dark text-center">
          <Slider {...settings}>
            {data.books.map((x) => (
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
                  <p className="islight mb-1">{x.name}</p>
                  <p className="isbold mb-1 price-colour">
                    {x.price.toLocaleString("ar-EG")}
                    <span> ریال</span>
                  </p>
                  {x.offPrice != null ? (
                    <del className="islight">
                      {x.offPrice.toLocaleString("ar-EG")}
                    </del>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Shelf;
