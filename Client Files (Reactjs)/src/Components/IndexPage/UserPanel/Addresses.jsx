import React, { Component } from "react";
import { FcPhone } from "react-icons/fc";
import { FaEnvelope } from "react-icons/fa";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import axios from "axios";
import { ApiName } from "../../ApiName";
import { toast } from "react-toastify";
import $ from "jquery";
class Addresses extends Component {
  state = {
    addresses: [],
    showPost: false,
    updateData: null,
  };
  getAddress = () => {
    var config = {
      method: "get",
      url: ApiName + "/address",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ addresses: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handlePost = () => {
    if (!this.validateForms()) return;
    var data = JSON.stringify({
      address: $("#addressInput").val(),
      zipcode: $("#zipcode").val(),
      state: $("#state").val(),
      city: $("#city").val(),
      phoneNumber: $("#phoneNumber").val(),
      recieverName: $("#receiverName").val(),
    });
    var config = {
      method: "post",
      url: ApiName + "/address",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("آدرس با موفقیت اضافه شد.");
        self.setState({ updateData: null, showPost: false });
        self.getAddress();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleDelete = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/address/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.getAddress();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleUpdateDataGet = (id) => {
    // getting the details of the address that i want to update
    var config = {
      method: "get",
      url: ApiName + "/address/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#addressInput").val(response.data.address);
        $("#zipcode").val(response.data.zipcode);
        $("#state").val(response.data.state);
        $("#city").val(response.data.city);
        $("#phoneNumber").val(response.data.phoneNumber);
        $("#receiverName").val(response.data.receiverName);
        self.setState({ updateData: response.data, showPost: true });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handlePatch = () => {
    //validate the data
    if (!this.validateForms()) return;
    //patch details of the inputs
    console.log("patch");
  };
  showPostHandle = () => {
    $("#addressInput").val("");
    $("#zipcode").val("");
    $("#state").val("");
    $("#city").val("");
    $("#phoneNumber").val("");
    $("#receiverName").val("");
    this.setState({ showPost: !this.state.showPost, updateData: null });
  };
  validateForms = () => {
    const forms = document.querySelectorAll(".requires-validation");
    var isValid = true;

    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        isValid = false;
      }
    });
    return isValid;
  };
  componentDidMount() {
    this.getAddress();
  }
  render() {
    return (
      <div>
        <div
          className={
            this.state.showPost
              ? "container bg-white more-rounded mb-2 shadow-sm py-3 drtl"
              : "d-none"
          }
        >
          {this.state.updateData == null ? (
            <p className="isreg">اضافه کردن آدرس</p>
          ) : (
            <p className="isreg">ویرایش آدرس</p>
          )}
          <form className="col-md-6 islight requires-validation">
            <div class="form-group">
              <label for="">نام دریافت کننده</label>
              <input
                required
                type="text"
                class="form-control"
                name=""
                id="receiverName"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">استان</label>
              <input
                required
                type="text"
                class="form-control"
                name=""
                id="state"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">شهر</label>
              <input
                required
                type="text"
                class="form-control"
                name=""
                id="city"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">کد پستی</label>
              <input
                required
                type="text"
                class="form-control"
                name=""
                id="zipcode"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">شماره تلفن دریافت کننده</label>
              <input
                required
                type="text"
                class="form-control"
                name=""
                id="phoneNumber"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="">آدرس</label>
              <textarea
                required
                class="form-control"
                name=""
                id="addressInput"
                rows="3"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={
                this.state.updateData != null
                  ? this.handlePatch
                  : this.handlePost
              }
              className="btn btn-info my-3"
            >
              تایید
            </button>
          </form>
        </div>
        <div className="container bg-white shadow-sm more-rounded mb-2 py-3 drtl">
          <p className="isbold py-4 border-bottom">
            آدرس ها
            <button
              type="button"
              onClick={this.showPostHandle}
              className="btn isreg btn-outline-warning float-start"
            >
              اضافه کردن آدرس جدید +
            </button>
          </p>
          <div className="row">
            {this.state.addresses.map((x) => (
              <div className="col-md-6">
                <div className="container more-rounded border py-2 my-1">
                  <p className="isreg text-dark mt-3">{x.address}</p>
                  <p className="islight text-muted">
                    <BsFillPinMapFill style={{ fill: "orange" }} />
                    &nbsp; {x.state}
                  </p>
                  <p className="islight text-muted">
                    <MdLocationCity style={{ fill: "gray" }} />
                    &nbsp; {x.city}
                  </p>
                  <p className="islight text-muted">
                    <FaEnvelope style={{ fill: "teal" }} />
                    &nbsp; {x.zipcode}
                  </p>
                  <p className="islight text-muted">
                    <FcPhone />
                    &nbsp; {x.phoneNumber}
                  </p>
                  <p className="dltr py-0 my-0">
                    <a
                      href="#"
                      onClick={() => this.handleUpdateDataGet(x.id)}
                      className="link-warning isreg "
                    >
                      ویرایش
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                      href="#"
                      onClick={() => this.handleDelete(x.id)}
                      className="link-danger isreg "
                    >
                      حذف
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Addresses;
