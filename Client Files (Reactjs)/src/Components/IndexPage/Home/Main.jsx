import { logDOM } from "@testing-library/react";
import React, { Component } from "react";
import car1 from "../../../Assets/img/car1.jpg";
import car2 from "../../../Assets/img/car2.jpg";
import car3 from "../../../Assets/img/car3.jpg";
import Navbar from "./Navbar";
import reliablility from "../../../Assets/img/reliability.png";
import iran from "../../../Assets/img/iran.png";
import shipped from "../../../Assets/img/shipped.png";
import "./Home.css";
import Shelf from "./Shelf";
import Footer from "./Footer";
import PageAdverts from "./PageAdverts";
import $ from "jquery/dist/jquery";
import { ApiName } from "../../ApiName";
import SpecialShelf from "./SpecialShelf";
class Main extends React.Component {
  renderLastOnes = (adverts, shelves) => {
    var biggerLength = adverts.length;
    if (shelves.length > biggerLength) biggerLength = shelves.length;
    var result;
    for (var i = 0; i < biggerLength; i++) {
      result.push(
        <div>
          {i < adverts.length ? <PageAdverts data={adverts[i]} /> : ""}
          {i < shelves.length ? <Shelf data={shelves[i]} /> : ""}
        </div>
      );
    }
    return result;
  };
  renderCarouselButtons = (length) => {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={i}
          className={i == 0 ? "active" : ""}
          aria-current={i == 0 ? "true" : "false"}
          aria-label={"Slide " + (i + 1)}
        ></button>
      );
    }
    return result;
  };
  render() {
    const { adverts, shelves, carousels } = this.props;
    var biggerLength = adverts.length;
    if (shelves.length > biggerLength) biggerLength = shelves.length;
    var stuff = [];
    for (var i = 0; i < biggerLength; i++) {
      stuff.push(
        <div>
          {i < adverts.length ? <PageAdverts data={adverts[i]} /> : ""}
          {i < shelves.length ? <Shelf data={shelves[i]} /> : ""}
        </div>
      );
    }
    var buttons = this.renderCarouselButtons(carousels.length);
    return (
      <div>
        {carousels != null ? (
          <div
            id="carouselExampleIndicators"
            class="carousel slide rounded shadow mb-3"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">{buttons.map((x) => x)}</div>
            <div class="carousel-inner rounded shadow">
              {carousels.map((x) => (
                <div
                  class={
                    carousels.indexOf(x) == 0
                      ? "carousel-item active"
                      : "carousel-item"
                  }
                >
                  <a href={x.link != null ? x.link : "#"}>
                    <img
                      src={ApiName + "/images/carousel/" + x.imageLocation}
                      class="d-block w-100"
                      alt="..."
                    />
                  </a>
                </div>
              ))}
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          ""
        )}
        {/* end of carousel */}
        <div className="container bg-white rounded shadow p-2 mb-2 isbold">
          <div className="row">
            <div className="col-md-4">
              <div className="container text-right">
                <div className="row">
                  <div className="col-md-8">
                    <p className="drtl text-right mt-3  ">
                      تحویل به تمام نقاط ایران
                    </p>
                  </div>
                  <div className="col-md-4">
                    <img src={iran} alt="" className="trustbar-img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <p className="drtl text-right mt-3  ">
                      تحویل در محل به صورت پستی
                    </p>
                  </div>
                  <div className="col-md-4">
                    <img src={shipped} alt="" className="trustbar-img mt-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 isreg">
                    <p className="drtl text-right mt-3  isbold">خرید مطمعن</p>
                  </div>
                  <div className="col-md-4">
                    <img src={reliablility} alt="" className="trustbar-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ads Bar End */}
        <SpecialShelf />
        <script src={$} />
        {stuff.map((x) => x)}
      </div>
    );
  }
}

export default Main;
