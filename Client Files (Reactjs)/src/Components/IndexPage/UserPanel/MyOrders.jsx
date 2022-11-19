import React, { Component } from "react";
import { ApiName } from "../../ApiName";
import OrderTable from "./OrderTable";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "jquery";

class MyOrders extends React.Component {
  state = {
    data: [],
  };
  loadTableData = () => {
    var config = {
      method: "get",
      url: ApiName + "/order",
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
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
        console.log(error);
      });
  };
  removeOrder = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/order/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.loadTableData();
      })
      .catch(function (error) {
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
        console.log(error);
      });
  };
  payThePrice = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/order/paytheprice/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        window.location.href = response.data;
      })
      .catch(function (error) {
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadTableData();
  }
  render() {
    return (
      <div className="container bg-white rounded drtl py-3 islight">
        <p className="islight text-right h5 pb-3">سفارشات من</p>
        {/*<p className="py-2 text-center">سفارشی موجود نمی باشد</p> */}
        <div className="dltr">
          {this.state.data.length > 0 ? (
            <OrderTable
              payThePrice={this.payThePrice}
              removeOrder={this.removeOrder}
              data={this.state.data}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default MyOrders;
