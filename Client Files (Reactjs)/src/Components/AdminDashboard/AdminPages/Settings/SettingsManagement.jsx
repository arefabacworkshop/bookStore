import React, { Component } from "react";
import "./Settings.css";
import axios from "axios";
import $ from "jquery";
import { ApiName } from "../../../ApiName";
import { toast } from "react-toastify";

class SettingsManagement extends Component {
  state = {};
  loadSettings = () => {
    var config = {
      method: "get",
      url: ApiName + "/settings",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };

    axios(config)
      .then(function (response) {
        $("#pageDataCount").val(response.data.pageDataCount.value);
        $("#etemad").val(response.data.etemad.value);
        $("#samandehi").val(response.data.samandehi.value);
        $("#merchantId").val(response.data.merchantId.value);
        $("#postPrice").val(response.data.postPrice.value);
        $("#aboutUs").val(response.data.aboutUs.value);
        $("#contactUs").val(response.data.contactUs.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  updateSettings = () => {
    var data = {
      pageDataCount: $("#pageDataCount").val(),
      etemad: $("#etemad").val(),
      samandehi: $("#samandehi").val(),
      merchantId: $("#merchantId").val(),
      postPrice: $("#postPrice").val(),
      aboutUs: $("#aboutUs").val(),
      contactUs: $("#contactUs").val(),
    };
    var config = {
      method: "patch",
      url: ApiName + "/settings",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        $("#pageDataCount").val(response.data.pageDataCount.value);
        $("#etemad").val(response.data.etemad.value);
        $("#samandehi").val(response.data.samandehi.value);
        $("#merchantId").val(response.data.merchantId.value);
        $("#postPrice").val(response.data.postPrice.value);
        $("#aboutUs").val(response.data.aboutUs.value);
        $("#contactUs").val(response.data.contactUs.value);
        toast.success("تنظیمات با موفقیت بروزرسانی شد");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.loadSettings();
  }
  render() {
    return (
      <div className="container bg-white rounded shadow-sm py-3 drtl isreg">
        <p className="isbold">تنظیمات</p>
        <form className="col-md-6 mb-3" action="">
          <div class="form-group">
            <label for="">تعداد اطلاعات نمایش داده شده در هر صفحه</label>
            <input
              type="text"
              class="form-control"
              name=""
              id="pageDataCount"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="">لینک نماد اعتماد الکترونیک</label>
            <input
              type="text"
              class="form-control"
              name=""
              id="etemad"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="">لینک ساماندهی</label>
            <input
              type="text"
              class="form-control"
              name=""
              id="samandehi"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>

          <div class="form-group">
            <label for="">کد فروشنده درگاه پرداخت زرین پال</label>
            <input
              type="text"
              class="form-control"
              name=""
              id="merchantId"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="">مبلغ ارسال پستی</label>
            <input
              type="text"
              class="form-control"
              name=""
              id="postPrice"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="">متن درباره ما</label>
            <textarea
              class="form-control"
              name=""
              id="aboutUs"
              rows="4"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="">متن ارتباط با ما</label>
            <textarea
              class="form-control"
              name=""
              id="contactUs"
              rows="4"
            ></textarea>
          </div>
        </form>
        <div className="form-group text-center mt-4 px-5 py-2">
          <button
            id="btnSettings"
            onClick={this.updateSettings}
            type="button"
            className="btn btn-success"
          >
            ثبت
          </button>
        </div>
      </div>
    );
  }
}

export default SettingsManagement;
