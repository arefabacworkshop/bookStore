import "./AdvertisementManagement.css";
import React, { Component } from "react";
import AdvertisementManagementTable from "./AdvertisementManagementTable";
import { ApiName } from "../../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class AdvertisementManagement extends React.Component {
  state = {
    createAdvertisement: false,
    updateDetails: [],
    tableData: [],
  };
  updateData = () => {
    var data = JSON.stringify({
      id: this.state.updateDetails.id,
      link: $("#linkInput").val(),
    });

    var config = {
      method: "patch",
      url: ApiName + "/advertisement",
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        toast.success("نویسنده با موفقیت ویرایش شد.ٌ");
        self.loadData();
        self.setState({ updateDetails: null });
        $("#linkInput").val("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/advertisement/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          createAdvertisement: true,
          updateDetails: response.data,
        });
        $("#linkInput").val(response.data.link);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/advertisement/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        if (self.state.tableData.length == 1) window.location.reload(false);
        else {
          toast.success("با موفقیت حذف شد.");
          self.loadData();
        }
      })
      .catch(function (error) {
        toast.error("مشکلی در حذف آیتم به وجود آمد.");
      });
  };
  loadData = () => {
    var config = {
      method: "get",
      url: ApiName + "/Advertisement",
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
  validateForms = () => {
    const forms = document.querySelectorAll(".requires-validation");
    var self = this;
    self.setState({ isValid: true });
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        self.setState({ isValid: false });
      }
    });
    if (this.state.isValid) return true;
    else return false;
  };
  handleAdvertisementUpload = () => {
    var form = new FormData();
    var input = document.getElementById("imageInput").files[0];
    if (input == null) toast.warning("لطفا یک تصویر برای کتاب مشخص کنید");
    if (!this.validateForms()) return;
    form.append("file", input, input.name);
    form.append("link", $("#linkInput").val());
    var self = this;
    var settings = {
      url: ApiName + "/advertisement",
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };

    $.ajax(settings).done(function (response) {
      toast.success("تصویر با موفقیت ثبت شد.");
      self.loadData();
    });
  };
  handleClick = () => {
    var newCreateAdvertisement = !this.state.createAdvertisement;
    $("#linkInput").val("");
    this.setState({
      createAdvertisement: newCreateAdvertisement,
      updateDetails: null,
    });
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div>
        <div className="drtl">
          <button
            onClick={this.handleClick}
            className="btn btn-secondary px-2 islight mb-2"
          >
            اضافه کردن تبلیغات جدید +
          </button>
          <div
            className={
              this.state.createAdvertisement === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن تبلیغات</p>
            ) : (
              <p className="isreg my-0"> ویرایش تبلیغات</p>
            )}

            <div class="form-group my-2 mt-4 col-md-3">
              <form action="" className="requires-validation">
                <div class="form-group">
                  <label for="">تصویر</label>
                  <input
                    type="file"
                    class="form-control-file"
                    required
                    name=""
                    id="imageInput"
                    placeholder=""
                    aria-describedby="fileHelpId"
                    disabled={this.state.updateDetails == null ? false : true}
                  />
                </div>
                <div class="form-group my-2 ">
                  <label for="CarouselName">لینک تصویر</label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id="linkInput"
                    aria-describedby="helpId"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={
                      this.state.updateDetails == null
                        ? this.handleAdvertisementUpload
                        : this.updateData
                    }
                  >
                    تایید
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست تبلیغات</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <AdvertisementManagementTable
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

export default AdvertisementManagement;
