import "./BooksManagement.css";
import React, { Component, useState } from "react";
import BooksManangementTable from "./BooksManangementTable";
import axios from "axios";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { ApiName } from "../../../ApiName";
import $ from "jquery";
import BookImageTable from "./BookImageTable";
import { TimeScale } from "chart.js";
class BooksManagement extends React.Component {
  state = {
    createBook: false,
    selectedWriters: [],
    selectedTranslators: [],
    selectedPublishers: [],
    selectedCategories: [],
    updateBook: {},
    writerOptions: [],
    publisherOptions: [],
    translatorOptions: [],
    categoryOptions: [],
    isValid: true,
    books: [],
    bookImage: null,
    bookImages: [],
    showImages: false,
  };
  removeBookImage = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/books/bookimage/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.handleImages(self.state.bookImage.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  createBookImage = (id) => {
    var bodyFormData = new FormData();
    var input = document.getElementById("bookImagesInput").files[0];
    if (input == null || input.length == 0) return;
    bodyFormData.append("image", input, input.name);
    var self = this;
    axios({
      method: "post",
      url: ApiName + "/books/bookimage/" + id,
      data: bodyFormData,
      headers: {
        Authorization: localStorage.ValidationToken,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        self.setState({ bookImages: response.data });
        toast.success("تصویر به کتاب اضافه شد");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  handleImages = (bookId) => {
    var config = {
      method: "get",
      url: ApiName + "/books/bookimage/" + bookId,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          bookImage: response.data.book,
          bookImages: response.data.bookImages,
          showImages: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  updateData = () => {
    var form = new FormData();

    var input = document.getElementById("fileInput").files[0];
    if (isNaN($("#priceInput").val())) {
      toast.error("لطفا در فیلد قیمت فقط عدد وارد کنید");
      return;
    }
    if (isNaN($("#offPriceInput").val())) {
      toast.error("لطفا در فیلد قیمت تخفیف فقط عدد وارد کنید");
      return;
    }
    if (isNaN($("#countInStorageInput").val())) {
      toast.error("لطفا در فیلد موجودی انبار فقط عدد وارد کنید");
      return;
    }

    if (
      this.state.selectedCategories.length == 0 &&
      this.state.updateBook.categories.length == 0
    ) {
      toast.error("لطفا حداقل یک موضوع را برای کتاب انتخاب کنید");
      return;
    }
    if (
      this.state.selectedWriters.length == 0 &&
      this.state.updateBook.writers.length == 0
    ) {
      toast.error("لطفا حداقل یک نویسنده را برای کتاب انتخاب کنید");
      return;
    }
    if (
      this.state.selectedPublishers.length == 0 &&
      this.state.updateBook.publishers.length == 0
    ) {
      toast.error("لطفا حداقل یک انتشارات را برای کتاب انتخاب کنید");
      return;
    }
    if (
      this.state.selectedTranslators.length == 0 &&
      this.state.updateBook.translators.length == 0
    ) {
      toast.error("لطفا حداقل یک مترجم را برای کتاب انتخاب کنید");
      return;
    }
    if (input != null && input.fineName != null)
      form.append("file", input, input.name);
    form.append("id", this.state.updateBook.book.id);
    form.append("name", $("#nameInput").val());
    form.append("bookNo", $("#bookNoInput").val());
    form.append("size", $("#sizeInput").val());
    form.append("pageType", $("#pageTypeInput").val());
    form.append("countInStorage", $("#countInStorageInput").val());
    form.append("price", $("#priceInput").val());
    form.append("offPrice", $("#offPriceInput").val());
    form.append("nobatechap", $("#nobatechapInput").val());
    form.append("publishDate", $("#publishDateInput").val());
    form.append("coverType", $("#coverTypeInput").val());
    form.append("describtion", $("#describeInput").val());
    form.append(
      "listOfWriters",
      JSON.stringify(
        this.state.selectedWriters.length != 0
          ? this.state.selectedWriters
          : this.state.updateBook.writers
      )
    );
    form.append(
      "listOfTranslators",
      JSON.stringify(
        this.state.selectedTranslators.length != 0
          ? this.state.selectedTranslators
          : this.state.updateBook.translators
      )
    );
    form.append(
      "listOfPublishers",
      JSON.stringify(
        this.state.selectedPublishers.length != 0
          ? this.state.selectedPublishers
          : this.state.updateBook.publishers
      )
    );
    form.append(
      "listOfCategories",
      JSON.stringify(
        this.state.selectedCategories.length != 0
          ? this.state.selectedCategories
          : this.state.updateBook.categories
      )
    );

    var settings = {
      url: ApiName + "/books",
      method: "PATCH",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    $.ajax(settings).done(function (response) {
      $("#fileInput").val(null);
      $("#nameInput").val("");
      $("#bookNoInput").val("");
      $("#sizeInput").val("");
      $("#pageTypeInput").val("");
      $("#countInStorageInput").val("");
      $("#priceInput").val("");
      $("#offPriceInput").val("");
      $("#nobatechapInput").val("");
      $("#publishDateInput").val("");
      $("#coverTypeInput").val("");
      $("#describeInput").val("");
      self.setState({
        updateBook: null,
        selectedPublishers: [],
        selectedCategories: [],
        selectedTranslators: [],
        selectedWriters: [],
      });
      toast.success("کتاب با موفقیت ثبت شد.");
      self.loadBooks();
    });
  };
  loadUpdateData = (id) => {
    var config = {
      method: "get",
      url: ApiName + "/books/" + id,
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        $("#nameInput").val(response.data.book.name);
        $("#bookNoInput").val(response.data.book.bookNo);
        $("#sizeInput").val(response.data.book.bookSize);
        $("#pageTypeInput").val(response.data.book.pageType);
        $("#countInStorageInput").val(response.data.book.countInStorage);
        $("#priceInput").val(response.data.book.price);
        $("#offPriceInput").val(response.data.book.offPrice);
        $("#nobatechapInput").val(response.data.book.nobateChap);
        $("#publishDateInput").val(response.data.book.publishDate);
        $("#coverTypeInput").val(response.data.book.coverType);
        $("#describeInput").val(response.data.book.describtion);
        self.setState({
          createBook: true,
          updateBook: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  removeItem = (id) => {
    var config = {
      method: "delete",
      url: ApiName + "/books/" + id,
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        if (self.state.books.length == 1) window.location.reload(false);
        else {
          toast.success("با موفقیت حذف شد.");
          self.loadBooks();
        }
      })
      .catch(function (error) {
        toast.error("مشکلی در حذف آیتم به وجود آمد.");
      });
  };
  loadOptions = () => {
    //publisher
    var config = {
      method: "get",
      url: ApiName + "/publisher",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ publisherOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //writer
    var config = {
      method: "get",
      url: ApiName + "/writer",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ writerOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //translator
    var config = {
      method: "get",
      url: ApiName + "/translator",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ translatorOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
    //category
    var config = {
      method: "get",
      url: ApiName + "/category",
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ categoryOptions: response.data });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("مشکلی در ارتباط با سرور به وجود آمد");
      });
  };
  handleClick = () => {
    $("#fileInput").val(null);
    $("#nameInput").val("");
    $("#bookNoInput").val("");
    $("#sizeInput").val("");
    $("#pageTypeInput").val("");
    $("#countInStorageInput").val("");
    $("#priceInput").val("");
    $("#offPriceInput").val("");
    $("#nobatechapInput").val("");
    $("#publishDateInput").val("");
    $("#coverTypeInput").val("");
    $("#describeInput").val("");
    this.setState({
      updateBook: null,
      selectedPublishers: [],
      selectedCategories: [],
      selectedTranslators: [],
      selectedWriters: [],
    });
    var newCreateBook = !this.state.createBook;
    this.setState({ createBook: newCreateBook });
  };
  loadBooks = () => {
    var config = {
      method: "get",
      url: ApiName + "/books",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ books: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleShowImage = () => {
    this.setState({
      showImages: !this.state.showImages,
      bookImages: [],
      bookImage: null,
    });
  };
  handleCreateBook = () => {
    var form = new FormData();

    var input = document.getElementById("fileInput").files[0];
    if (input == null) {
      toast.warning("لطفا یک تصویر برای کتاب مشخص کنید");
      return;
    }
    if (isNaN($("#priceInput").val())) {
      toast.error("لطفا در فیلد قیمت فقط عدد وارد کنید");
      return;
    }
    if (isNaN($("#offPriceInput").val())) {
      toast.error("لطفا در فیلد قیمت تخفیف فقط عدد وارد کنید");
      return;
    }
    if (isNaN($("#countInStorageInput").val())) {
      toast.error("لطفا در فیلد موجودی انبار فقط عدد وارد کنید");
      return;
    }
    if (!this.validateForms()) return;

    if (this.state.selectedCategories.length == 0) {
      toast.error("لطفا حداقل یک موضوع را برای کتاب انتخاب کنید");
      return;
    }
    if (this.state.selectedWriters.length == 0) {
      toast.error("لطفا حداقل یک نویسنده را برای کتاب انتخاب کنید");
      return;
    }
    if (this.state.selectedPublishers.length == 0) {
      toast.error("لطفا حداقل یک انتشارات را برای کتاب انتخاب کنید");
      return;
    }
    if (this.state.selectedTranslators.length == 0) {
      toast.error("لطفا حداقل یک مترجم را برای کتاب انتخاب کنید");
      return;
    }

    // for (let i = 0; i < this.state.selectedWriters.length; i++) {
    //   listOfWriters.append(
    //     "arr[" + i + "].name",
    //     this.state.selectedWriters[i].name
    //   );
    //   listOfWriters.append(
    //     "arr[" + i + "].id",
    //     this.state.selectedWriters[i].id
    //   );
    // }
    // for (let i = 0; i < this.state.selectedTranslators.length; i++) {
    //   listOfTranslators.append(
    //     "arr[" + i + "].name",
    //     this.state.selectedTranslators[i].name
    //   );
    //   listOfTranslators.append(
    //     "arr[" + i + "].id",
    //     this.state.selectedTranslators[i].id
    //   );
    // }
    // for (let i = 0; i < this.state.selectedPublishers.length; i++) {
    //   listOfPublishers.append(
    //     "arr[" + i + "].name",
    //     this.state.selectedPublishers[i].name
    //   );
    //   listOfPublishers.append(
    //     "arr[" + i + "].id",
    //     this.state.selectedPublishers[i].id
    //   );
    // }
    // for (let i = 0; i < this.state.selectedCategories.length; i++) {
    //   listOfCategories.append(
    //     "arr[" + i + "].name",
    //     this.state.selectedCategories[i].name
    //   );
    //   listOfCategories.append(
    //     "arr[" + i + "].id",
    //     this.state.selectedCategories[i].id
    //   );
    // }
    form.append("file", input, input.name);
    form.append("name", $("#nameInput").val());
    form.append("bookNo", $("#bookNoInput").val());
    form.append("size", $("#sizeInput").val());
    form.append("pageType", $("#pageTypeInput").val());
    form.append("countInStorage", $("#countInStorageInput").val());
    form.append("price", $("#priceInput").val());
    form.append("offPrice", $("#offPriceInput").val());
    form.append("nobatechap", $("#nobatechapInput").val());
    form.append("publishDate", $("#publishDateInput").val());
    form.append("coverType", $("#coverTypeInput").val());
    form.append("describtion", $("#describeInput").val());
    form.append("listOfWriters", JSON.stringify(this.state.selectedWriters));
    form.append(
      "listOfTranslators",
      JSON.stringify(this.state.selectedTranslators)
    );
    form.append(
      "listOfPublishers",
      JSON.stringify(this.state.selectedPublishers)
    );
    form.append(
      "listOfCategories",
      JSON.stringify(this.state.selectedCategories)
    );

    var settings = {
      url: ApiName + "/books",
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
    var self = this;
    $.ajax(settings).done(function (response) {
      $("#fileInput").val(null);
      $("#nameInput").val("");
      $("#bookNoInput").val("");
      $("#sizeInput").val("");
      $("#pageTypeInput").val("");
      $("#countInStorageInput").val("");
      $("#priceInput").val("");
      $("#offPriceInput").val("");
      $("#nobatechapInput").val("");
      $("#publishDateInput").val("");
      $("#coverTypeInput").val("");
      $("#describeInput").val("");
      toast.success("کتاب با موفقیت ثبت شد.");
      self.loadBooks();
    });
  };
  onSelect(selectedList, selectedItem, self, type) {
    if (type == "writer") self.setState({ selectedWriters: selectedList });
    if (type == "category") self.setState({ selectedCategories: selectedList });
    if (type == "translator")
      self.setState({ selectedTranslators: selectedList });
    if (type == "publisher")
      self.setState({ selectedPublishers: selectedList });
  }
  onRemove(selectedList, removedItem, self, type) {
    if (type == "writer") self.setState({ selectedWriters: selectedList });
    if (type == "category") self.setState({ selectedCategories: selectedList });
    if (type == "translator")
      self.setState({ selectedTranslators: selectedList });
    if (type == "publisher")
      self.setState({ selectedPublishers: selectedList });
  }
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

  componentDidMount() {
    this.loadOptions();
    this.loadBooks();
  }
  render() {
    return (
      <React.Fragment>
        <div className="drtl">
          <button
            onClick={this.handleClick}
            className="btn btn-secondary px-2 islight mb-2"
          >
            ایجاد کتاب جدید +
          </button>
          <div
            className={
              this.state.showImages
                ? "container rounded bg-white shadow-sm py-5 text-dark isreg drtl mb-2"
                : "d-none"
            }
          >
            <p className="isreg">مدیریت تصاویر</p>
            <p className="islight">
              نام کتاب :{" "}
              {this.state.bookImage != null ? this.state.bookImage.name : ""}
            </p>
            <form className="col-md-6 col-sm-12" action="">
              <div class="form-group">
                <label for="">بارگذاری تصویر کتاب</label>
                <input
                  type="file"
                  class="form-control"
                  name=""
                  id="bookImagesInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => this.createBookImage(this.state.bookImage.id)}
                  className="btn btn-info mt-2"
                >
                  آپلود
                </button>
              </div>
            </form>
            {this.state.bookImages.length != 0 ? (
              <div>
                <p className="isreg">لیست تصاویر کتاب</p>
                <BookImageTable
                  removeItem={this.removeBookImage}
                  data={
                    this.state.bookImages != null ? this.state.bookImages : []
                  }
                />
              </div>
            ) : (
              ""
            )}
            <div className="py-4">
              <button
                onClick={this.handleShowImage}
                className="btn btn-secondary mt-2 float-start"
              >
                بستن
              </button>
            </div>
          </div>
          <div
            className={
              this.state.createBook === false
                ? "d-none"
                : "container rounded bg-white text-dark islight shadow-sm py-2 mb-2"
            }
          >
            <form className="col-md-6 requires-validation" action="">
              <div class="form-group">
                <label for="nameInput">نام</label>
                <input
                  type="text"
                  required
                  class="form-control was-validated"
                  name=""
                  id="nameInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>

              <div class="form-group my-3">
                <label for="fileInput"> تصویر کتاب&nbsp;</label>
                <input
                  type="file"
                  required
                  class="form-control-file"
                  name=""
                  id="fileInput"
                  placeholder=""
                  aria-describedby="fileHelpId"
                />
              </div>
              <div class="form-group">
                <label for="bookNoInput">شابک</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="bookNoInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="sizeInput">سایز کتاب</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="sizeInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="pageTypeInput">نوع کاغذ</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="pageTypeInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="pageTypeInput"> قیمت به ریال</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="priceInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="pageTypeInput">
                  قیمت تخفیف خورده به ریال (اختیاری)
                </label>
                <input
                  type="text"
                  class="form-control"
                  name=""
                  id="offPriceInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="countInStorageInput">تعداد در انبار</label>
                <input
                  type="text"
                  class="form-control"
                  name=""
                  id="countInStorageInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="coverTypeInput">نوع جلد</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="coverTypeInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="nobatechapInput">نوبت چاپ</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="nobatechapInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="publishDateInput">سال انتشار</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  name=""
                  id="publishDateInput"
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="">توضیحات کتاب</label>
                <textarea
                  class="form-control"
                  name=""
                  id="describeInput"
                  required
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب نویسندگان</label>
                <Multiselect
                  placeholder=""
                  options={this.state.writerOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "writer")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "writer")
                  }
                  selectedValues={
                    this.state.updateBook != null
                      ? this.state.updateBook.writers
                      : []
                  }
                  displayValue="name"
                />
                <div class="invalid-feedback">
                  لطفا حداقل یک نویسنده انتخاب کنید
                </div>
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب مترجمان</label>
                <Multiselect
                  placeholder=""
                  options={this.state.translatorOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(
                      selectedList,
                      selectedItem,
                      this,
                      "translator"
                    )
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(
                      selectedList,
                      selectedItem,
                      this,
                      "translator"
                    )
                  }
                  selectedValues={
                    this.state.updateBook != null
                      ? this.state.updateBook.translators
                      : []
                  }
                  displayValue="name"
                />
                <div class="invalid-feedback">
                  لطفا حداقل یک مترجم انتخاب کنید
                </div>
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب انتشارات</label>
                <Multiselect
                  placeholder=""
                  options={this.state.publisherOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "publisher")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "publisher")
                  }
                  selectedValues={
                    this.state.updateBook != null
                      ? this.state.updateBook.publishers
                      : []
                  }
                  displayValue="name"
                />
                <div class="invalid-feedback">
                  لطفا حداقل یک انتشارات انتخاب کنید
                </div>
              </div>
              <div class="form-group my-3">
                <label for="">انتخاب موضوعات</label>
                <Multiselect
                  placeholder=""
                  options={this.state.categoryOptions}
                  onSelect={(selectedList, selectedItem) =>
                    this.onSelect(selectedList, selectedItem, this, "category")
                  }
                  onRemove={(selectedList, selectedItem) =>
                    this.onRemove(selectedList, selectedItem, this, "category")
                  }
                  selectedValues={
                    this.state.updateBook != null
                      ? this.state.updateBook.categories
                      : []
                  }
                  displayValue="name"
                />
                <div class="invalid-feedback">
                  لطفا حداقل یک انتشارات موضوع کنید
                </div>
              </div>
              <button
                type="button"
                onClick={
                  this.state.updateBook == null
                    ? this.handleCreateBook
                    : this.updateData
                }
                className="btn btn-success"
              >
                ارسال
              </button>
            </form>
          </div>
          <div className="container rounded bg-white text-dark islight shadow-sm py-2 mb-2 ">
            <p className="isbold text-secondary">لیست کتاب ها</p>
            <div className="drtl">
              {this.state.books.length != 0 ? (
                <BooksManangementTable
                  loadUpdateData={this.loadUpdateData}
                  removeItem={this.removeItem}
                  handleImages={this.handleImages}
                  data={this.state.books}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BooksManagement;
