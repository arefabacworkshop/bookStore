import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { ApiName } from "../ApiName";
import { toast } from "react-toastify";
class SellingResultPostDetails extends React.Component {
  state = {
    user: {},
    isValid: true,
    nextPage: false,
    postDetails: [],
    addresses: [],
    createAddress: false,
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
    if (this.state.createAddress) {
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
          localStorage.addressId = response.data.id;
          self.setState({ nextPage: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      if (localStorage.addressId == null) {
        toast.error("لطفا یک آدرس انتخاب کنید یا اضافه کنید.");
        return;
      } else {
        this.setState({ nextPage: true });
      }
    }
  };
  handleChange = (e, id) => {
    if (e.target.checked) {
      localStorage.addressId = id;
    }
  };
  handleInputs = (e) => {
    if (e.target.checked) {
      this.setState({ createAddress: true });
    } else {
      this.setState({ createAddress: false });
    }
  };
  goNextPage = () => {};
  componentDidMount() {
    this.getAddress();
  }
  render() {
    if (this.state.nextPage)
      return <Redirect to="/sellresult/confirm"></Redirect>;
    return (
      <React.Fragment>
        <div class="buy-product container isreg">
          <div class="container steps text-dark mt-3 rounded shadow">
            <div class="row">
              <div class="step-1 col-md-4">
                <div class=" step-1-circle mx-auto">1</div>
                <p>اعتبار سنجی</p>
              </div>
              <div class="  step-2 col-md-4 ">
                <div class="bg-info step-2-circle mx-auto">2</div>
                <p>اطلاعات پستی</p>
              </div>
              <div class="step-3 col-md-4">
                <div class="  step-3-circle mx-auto ">3</div>
                <p>تایید نهایی</p>
              </div>
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                style={{ width: "66.6%" }}
                aria-valuenow="66.6"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="card mt-3 drtl text-right shadow">
            <div id="postheader" class="card-header">
              اطلاعات پستی
            </div>
            <div id="postbody" class=" card-body container card-customization">
              <div className="">
                <div className="row">
                  <div className=" col-md-6  overflow-auto my-3 drtl">
                    <p className="isbold">انتخاب آدرس</p>
                    <form className="postDetailsSelect" action="">
                      {this.state.addresses.map((x) => (
                        <div className="container rounded border rounded py-3 my-2 row ms-1 me-1">
                          <div className="col-md-1 flexit">
                            <div class="form-check item-center">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  name="address"
                                  id=""
                                  onChange={(e) => this.handleChange(e, x.id)}
                                  type="radio"
                                  value="checkedValue"
                                  aria-label="Text for screen reader"
                                />
                              </label>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <p className="isreg my-2">
                              {x.receiverName} , {x.state} , {x.city} ,{" "}
                              {x.address} , {x.zipcode}
                            </p>
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                  <div className="col-md-6 border-end my-3">
                    <p className="isbold">اضافه کردن آدرس جدید</p>
                    <form className="islight requires-validation">
                      <div class="form-check form-check-inline mb-3 me-0">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(e) => this.handleInputs(e)}
                            value="checkedValue"
                          />
                          اضافه کردن آدرس
                        </label>
                      </div>
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
                          disabled={!this.state.createAddress}
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
                          disabled={!this.state.createAddress}
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
                          disabled={!this.state.createAddress}
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
                          disabled={!this.state.createAddress}
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
                          disabled={!this.state.createAddress}
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
                          disabled={!this.state.createAddress}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="container">
                  <Link to="/index">
                    <button class="btn btn-outline-info">برگشت</button>
                  </Link>
                  <button
                    onClick={this.handlePost}
                    id="btnForm"
                    type="button"
                    class="btn btn-info float-start"
                  >
                    تایید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellingResultPostDetails;
