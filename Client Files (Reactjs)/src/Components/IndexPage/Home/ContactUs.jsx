import { replace } from "lodash";
import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiName } from "../../ApiName";
class ContactUs extends Component {
  state = { data: null };
  getSettings = () => {
    var config = {
      method: "get",
      url: ApiName + "/settings",
      headers: {
        "Content-Type": "application/json",
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        console.log(response.data);
        self.setState({
          data: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمده است.");
      });
  };
  componentDidMount() {
    this.getSettings();
  }
  render() {
    return (
      <div className="container contactUs rounded shadow-sm py-3 bg-white drtl">
        <p className="isreg">تماس با ما</p>
        <pre
          className="islight drtl"
          style={{ minHeight: "100%", overflow: "hidden", fontSize: "1rem" }}
        >
          {this.state.data != null ? this.state.data.contactUs.value : ""}
        </pre>
      </div>
    );
  }
}

export default ContactUs;
