import React, { Component } from "react";
import LikedManagementTable from "./LikedManagementTable";
import axios from "axios";
import $ from "jquery";
import { ApiName } from "../../ApiName";
import { toast } from "react-toastify";
class LikedProducts extends React.Component {
  state = {
    likedBooks: [],
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/like",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ likedBooks: response.data });
      })
      .catch(function (error) {
        self.setState({ likedBooks: [] });
      });
  };
  deleteIt(id) {
    var config = {
      method: "delete",
      url: ApiName + "/like/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("با موفقیت حذف شد");
        window.location.reload(false);
        self.loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div className="container bg-white rounded drtl py-3 islight">
        <p className="islight text-right h5 pb-3">لیست علاقه مندی ها</p>
        <p
          className={
            this.state.likedBooks.length == 0 ? "isreg text-center" : "d-none"
          }
        >
          هیچ آیتمی در لیست علاقه مندی ها موجود نیست
        </p>
        {this.state.likedBooks.length != 0 ? (
          <LikedManagementTable
            deleteIt={this.deleteIt}
            data={this.state.likedBooks}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default LikedProducts;
