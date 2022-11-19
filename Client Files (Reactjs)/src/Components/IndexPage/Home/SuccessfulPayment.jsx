import React, { Component } from "react";
import "./BadPayment.css";
import { MdCheckCircle } from "react-icons/md";
class SuccessfulPayment extends Component {
  state = {};
  handleRedirect = () => {
    window.location.href = "/index";
  };
  render() {
    return (
      <div className="container">
        <div className="py-5"></div>
        <div className="container bg-white rounded mt-5 added-height py-5 shadow text-center">
          <MdCheckCircle
            style={{
              width: "100px",
              height: "100px",
              fill: "green",
              marginTop: "100px",
            }}
          />
          <br />
          <br />
          <p className="isbold">خرید شما با موفقیت انجام شد</p>
          <br />
          <button
            onClick={this.handleRedirect}
            type="button"
            className="btn btn-info isreg"
          >
            انتقال به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }
}

export default SuccessfulPayment;
