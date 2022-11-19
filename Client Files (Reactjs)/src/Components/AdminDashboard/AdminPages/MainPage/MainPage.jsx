import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { ApiName } from "../../../ApiName";
import { toast } from "react-toastify";
class MainPage extends React.Component {
  state = {
    details: {},
  };
  loadDetails = () => {
    var config = {
      method: "get",
      url: ApiName + "/admin/mainPageDetails",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ details: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در اتصال به سرور پیش آمده است");
      });
  };
  componentDidMount() {
    this.loadDetails();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mb-3 drtl">
          <div className="col-md-4 col-sm-12 mb-2">
            <div className="container drtl rounded py-3 bg-white shadow-sm text-center border border-warning">
              <p className="isbold">سفارش های در انتظار تایید </p>
              {this.state.details.unconfirmedOrdersCount}
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <div className="container drtl rounded py-3 bg-white shadow-sm text-center border border-info">
              <p className="isbold">سفارش در انتظار پردازش </p>
              {this.state.details.processingOrdersCount}
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <div className="container drtl rounded py-3 bg-white shadow-sm text-center border border-success">
              <p className="isbold">سفارش های ارسال شده</p>
              {this.state.details.sentOrdersCount}
            </div>
          </div>
        </div>
        <div className="container drtl rounded bg-white shadow-sm py-3 islight mb-3">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  <span className="isreg text-dark">جزئیات انبار</span>
                </th>
                <th scope="col">مقادیر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">تعداد کل کتاب ها </td>
                <td>{this.state.details.allBooksCount}</td>
              </tr>
              <tr>
                <td className="text-success" scope="row">
                  کتاب های دارای موجودی در انبار
                </td>
                <td>{this.state.details.existingBooksCount}</td>
              </tr>
              <tr>
                <td className="text-danger" scope="row">
                  کتاب هایی که موجودی آنها به اتمام رسیده
                </td>
                <td>{this.state.details.unexistingBooksCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container drtl rounded bg-white shadow-sm py-3 islight mb-3">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  <span className="isreg text-dark">جزئیات نظرات</span>
                </th>
                <th scope="col">مقادیر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">تعداد کل نظرات</td>
                <td>{this.state.details.commentCount}</td>
              </tr>
              <tr>
                <td className="text-success" scope="row">
                  نظرات تایید شده
                </td>
                <td>{this.state.details.verifiedCommentCount}</td>
              </tr>
              <tr>
                <td className="text-danger" scope="row">
                  نظرات در انتظار تایید
                </td>
                <td>{this.state.details.unVerifiedCommentCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
