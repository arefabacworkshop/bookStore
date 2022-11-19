import React, { Component } from "react";
import { Link } from "react-router-dom";
import etemad from "../../../Assets/img/etemad.png";
import samandehi from "../../../Assets/img/samandehi.png";
import zarinpal from "../../../Assets/img/1.png";
import { ApiName } from "../../ApiName";
import axios from "axios";
class Footer extends React.Component {
  state = {
    samandehi: "",
    eNamad: "",
  };
  getLinks = () => {
    var config = {
      method: "get",
      url: ApiName + "/settings",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          eNamad: response.data.etemad.value,
          samandehi: response.data.samandehi.value,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getLinks();
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid bg-dark ">
          <div className="container drtl text-center p-3 pb-5 islight">
            <div className="row">
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <p class="text-light text-md-end text-sm-center pe-md-4  text-gold isreg">
                  لینک های مفید
                </p>
                <div className="row">
                  <ul class=" mb-0 col-md-6">
                    <li>
                      <Link to="/signup" class="islight link-light">
                        عضویت
                      </Link>
                    </li>
                    <li>
                      <Link to="/index" class="islight link-light">
                        صفحه اصلی
                      </Link>
                    </li>
                    <li>
                      <Link to="/index/userpanel" class="islight link-light">
                        پنل کاربری
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/index/userpanel/myorders"
                        class="islight link-light"
                      >
                        سفارشات
                      </Link>
                    </li>
                  </ul>
                  <ul class="mb-0 col-md-6">
                    <li>
                      <Link to="/login" class="islight link-light">
                        ورود اعضا
                      </Link>
                    </li>
                    <li>
                      <Link to="/index/aboutUs" class="islight link-light">
                        درباره ما
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/index/advancedsearch"
                        class="islight link-light"
                      >
                        جستجوی پیشرفته
                      </Link>
                    </li>
                    <li>
                      <Link to="/index/contactUs" class="islight link-light">
                        تماس با ما
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase col-md-3">Links</h5>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0"></div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <a target="_blank" href="https://www.zarinpal.com/">
                      <img
                        width={50}
                        height={50}
                        src={zarinpal}
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <div
                    className={
                      this.state.eNamad != ""
                        ? "col-md-4 text-center"
                        : "d-none"
                    }
                  >
                    <a
                      target="_blank"
                      href={this.state.eNamad != "" ? this.state.eNamad : "#"}
                    >
                      <img
                        width={100}
                        height={100}
                        src={etemad}
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <div
                    className={
                      this.state.samandehi != ""
                        ? "col-md-4 text-center"
                        : "d-none"
                    }
                  >
                    <a
                      target="_blank"
                      href={
                        this.state.samandehi != "" ? this.state.samandehi : "#"
                      }
                    >
                      <img
                        width={100}
                        height={100}
                        src={samandehi}
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-light bg-lightdark islight p-2 container-fluid">
          تمامی حقوق متعلق به این وبسایت می باشد
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
