import "./CarouselManagement.css";
import React, { Component } from "react";
import CarouselManagementTable from "./CarouselManagementTable";
import { ApiName } from "../../../../ApiName";
import axios from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
class CarouselManagement extends React.Component {
  state = {
    createCarousel: false,
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
      url: ApiName + "/carousel",
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
      url: ApiName + "/carousel/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          createCarousel: true,
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
      url: ApiName + "/carousel/" + id,
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
      url: ApiName + "/carousel",
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
  handleCarouselUpload = () => {
    var form = new FormData();
    var input = document.getElementById("imageInput").files[0];
    if (input == null) toast.warning("لطفا یک تصویر برای کتاب مشخص کنید");
    if (!this.validateForms()) return;
    form.append("file", input, input.name);
    form.append("link", $("#linkInput").val());
    var self = this;
    var settings = {
      url: ApiName + "/carousel",
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
    var newCreateCarousel = !this.state.createCarousel;
    $("#linkInput").val("");
    this.setState({
      createCarousel: newCreateCarousel,
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
            اضافه کردن تصویر چرخشی جدید +
          </button>
          <div
            className={
              this.state.createCarousel === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-3 mb-2"
            }
          >
            {this.state.updateDetails == null ? (
              <p className="isreg">اضافه کردن تصویر چرخشی</p>
            ) : (
              <p className="isreg my-0"> ویرایش تصویر چرخشی</p>
            )}
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
              <div class="form-group my-2 mt-4 col-md-3">
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
                      ? this.handleCarouselUpload
                      : this.updateData
                  }
                >
                  تایید
                </button>
              </div>
            </form>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست تصویر چرخشی</p>
            <div className="drtl">
              {this.state.tableData.length == 0 ? (
                ""
              ) : (
                <CarouselManagementTable
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

export default CarouselManagement;
