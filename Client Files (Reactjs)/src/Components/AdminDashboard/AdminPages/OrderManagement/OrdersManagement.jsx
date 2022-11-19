import "./OrdersManagement.css";
import React, { Component } from "react";
import OrdersManagementTable from "./OrdersManagementTable";
import { ApiName } from "../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class OrdersManagement extends React.Component {
  state = {
    createPublisher: false,
    updateDetails: null,
    tableData: [],
  };

  loadData = () => {
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
        self.setState({ tableData: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };

  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div>
        <div className="drtl">
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست کل سفارشات</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <OrdersManagementTable
                  loadUpdateData={this.loadUpdateData}
                  removeItem={this.removeItem}
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

export default OrdersManagement;
