import "./OrdersManagement.css";
import React, { Component } from "react";
import UnconfirmedOrdersManagementTable from "./UnconfirmedOrdersTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class UnconfirmedOrdersManagement extends React.Component {
  state = {
    orderData: null,
    showData: false,
    tableData: [],
  };
  handleConfirm = (id) => {
    var config = {
      method: "patch",
      url: ApiName + "/order/confirmOrder/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        if (self.state.tableData.length > 1) self.loadData();
        else window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  showData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/order/unconfirmedOrders/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ orderData: response.data, showData: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/order/unconfirmedOrders",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };

    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };
  hideData = () => {
    this.setState({ orderData: null, showData: false });
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div>
        <div
          className={
            this.state.showData
              ? "container py-3 mb-2 shadow-sm bg-white drtl"
              : "d-none"
          }
        >
          <p className="isbold">لیست کالا ها</p>
          <div className="col-md-8">
            <table class="table table-borderless table-striped isreg ">
              <thead>
                <tr>
                  <th>نام کتاب</th>
                  <th>تعداد</th>
                  <th>قیمت واحد</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderData != null
                  ? this.state.orderData.orderDetails.map((x) => (
                      <tr>
                        <td scope="row">{x.book.name}</td>
                        <td>{x.count}</td>
                        <td>{x.book.price.toLocaleString("ar-EG")}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
          <p className="isbold">اطلاعات سفارش</p>
          <div className="col-md-6 isreg">
            <p scope="row">
              شماره ثبت سفارش : &nbsp;
              {this.state.orderData != null
                ? this.state.orderData.order.id
                : ""}
            </p>

            <p scope="row">
              شماره ثبت کاربر : &nbsp;
              {this.state.orderData != null
                ? this.state.orderData.order.user.id
                : ""}
            </p>

            <p className="text-success" scope="row">
              مبلغ پرداختی (با احتساب هزینه پست) : &nbsp;
              {this.state.orderData != null
                ? this.state.orderData.order.totalPrice.toLocaleString("ar-EG")
                : ""}
              &nbsp;ریال
            </p>

            <p scope="row">
              کد پیگیری پرداخت : &nbsp;
              {this.state.orderData != null
                ? this.state.orderData.order.paymentConfirmNumber
                : ""}
            </p>
          </div>
          <p className="isbold">اطلاعات پستی</p>
          <p className="isreg">
            نام دریافت کننده :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.receiverName
              : ""}
          </p>
          <p className="isreg">
            شماره تماس :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.phoneNumber
              : ""}
          </p>
          <p className="isreg">
            استان :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.state
              : ""}
          </p>
          <p className="isreg">
            شهر :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.city
              : ""}
          </p>
          <p className="isreg">
            آدرس :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.address
              : ""}
          </p>
          <p className="isreg">
            کد پستی :{" "}
            {this.state.orderData != null
              ? this.state.orderData.order.zipCode
              : ""}
          </p>
          <button
            onClick={this.hideData}
            className="btn btn-secondary py-2 px-2 mt-3 isreg"
          >
            بستن
          </button>
        </div>
        <div className="drtl">
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست سفارشات تایید نشده</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <UnconfirmedOrdersManagementTable
                  showData={this.showData}
                  handleConfirm={this.handleConfirm}
                  data={this.state.tableData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UnconfirmedOrdersManagement;
