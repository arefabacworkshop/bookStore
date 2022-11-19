import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import $ from "jquery";
import axios from "axios";
import { ApiName } from "../ApiName";
class DashboardLinks extends React.Component {
  state = {
    data: null,
  };
  validateUser = () => {
    var config = {
      method: "get",
      url: ApiName + "/user/0",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        console.log(response.data);
        self.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.validateUser();
    $("#mainsell").click(() => {
      $("#subsell").toggle();
    });
    $("#mainPage").click(() => {
      $("#subPage").toggle();
    });
    $("#mainsell2").click(() => {
      $("#subsell2").toggle();
    });
    $("#mainPage2").click(() => {
      $("#subPage2").toggle();
    });
  }

  render() {
    return (
      <div>
        <ul
          className={
            this.state.data != null && this.state.data.user.roleId == 1
              ? "listofitems isreg text-dark"
              : "d-none"
          }
        >
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/dashboard">داشبورد</Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/BooksManagement">مدیریت کتاب ها</Link>
          </li>
          <li className="mainItem rounded">
            <Link id="mainPage" to="#">
              مدیریت صفحه اصلی
            </Link>
          </li>
          <li
            id="subPage"
            style={{ display: "none" }}
            className="subitem rounded bordered"
          >
            <ul>
              <li>
                <Link to="/index/Adminpanel/CarouselManagement">
                  مدیریت تصاویر چرخشی
                </Link>
              </li>
              <li>
                <Link to="/index/Adminpanel/AdvertisementManagement">
                  مدیریت تبلیغات ها
                </Link>
              </li>
              <li>
                <Link to="/index/Adminpanel/ShelfManagement">
                  مدیریت قفسه ها
                </Link>
              </li>
            </ul>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/categoriesManagement">
              مدیریت موضوعات
            </Link>
          </li>

          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/writersManagement">
              مدیریت نویسنده ها
            </Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/PublishersManagement">
              مدیریت انتشارات
            </Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/translatorsManagement">
              مدیریت مترجمان
            </Link>
          </li>

          <li className="mainItem rounded">
            <Link id="mainsell2" to="#">
              مدیریت فروش
            </Link>
          </li>
          <li
            id="subsell2"
            style={{ display: "none" }}
            className="subitem rounded bordered"
          >
            <ul>
              <li>
                <Link to="/index/Adminpanel/OrdersManagement">
                  لیست کل سفارشات
                </Link>
              </li>
              <li>
                <Link to="/index/Adminpanel/UnconfirmedOrdersManagement">
                  لیست تایید نشده ها
                </Link>
              </li>
              <li>
                <Link to="/index/Adminpanel/processingOrders">لیست پردازش</Link>
              </li>
              <li>
                <Link to="/index/Adminpanel/sentOrders">لبست ارسال شده</Link>
              </li>
            </ul>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/UserManagement">مدیریت کاربران</Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/PageManagement">مدیریت صفحات</Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/CommentManagement">مدیریت نظرات</Link>
          </li>
          <li className="mainItem rounded">
            <Link to="/index/Adminpanel/settings">مدیریت تنظیمات</Link>
          </li>
        </ul>
        {/* customeAdminDashboard */}
        <ul
          className={
            this.state.data != null && this.state.data.user.roleId == 3
              ? "listofitems isreg text-dark"
              : "d-none"
          }
        >
          <li
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.dashboard
                ? "mainItem rounded"
                : "d-none"
            }
          >
            <Link to="/index/Adminpanel/dashboard">داشبورد</Link>
          </li>

          <div
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.mainPageManagement
                ? ""
                : "d-none"
            }
          >
            <li className="mainItem rounded">
              <Link id="mainPage2" to="#">
                مدیریت صفحه اصلی
              </Link>
            </li>
            <li
              id="subPage2"
              style={{ display: "none" }}
              className="subitem rounded bordered"
            >
              <ul>
                <li>
                  <Link to="/index/Adminpanel/CarouselManagement">
                    مدیریت تصاویر چرخشی
                  </Link>
                </li>
                <li>
                  <Link to="/index/Adminpanel/AdvertisementManagement">
                    مدیریت تبلیغات ها
                  </Link>
                </li>
                <li>
                  <Link to="/index/Adminpanel/ShelfManagement">
                    مدیریت قفسه ها
                  </Link>
                </li>
              </ul>
            </li>
          </div>
          <div
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.bookManagement
                ? ""
                : "d-none"
            }
          >
            <li className="mainItem rounded">
              <Link to="/index/Adminpanel/BooksManagement">مدیریت کتاب ها</Link>
            </li>
            <li className="mainItem rounded">
              <Link to="/index/Adminpanel/categoriesManagement">
                مدیریت موضوعات
              </Link>
            </li>

            <li className="mainItem rounded">
              <Link to="/index/Adminpanel/writersManagement">
                مدیریت نویسنده ها
              </Link>
            </li>
            <li className="mainItem rounded">
              <Link to="/index/Adminpanel/PublishersManagement">
                مدیریت انتشارات
              </Link>
            </li>
            <li className="mainItem rounded">
              <Link to="/index/Adminpanel/translatorsManagement">
                مدیریت مترجمان
              </Link>
            </li>
          </div>

          <div
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.salesManagement
                ? ""
                : "d-none"
            }
          >
            <li className="mainItem rounded">
              <Link id="mainsell" to="#">
                مدیریت فروش
              </Link>
            </li>
            <li
              id="subsell"
              style={{ display: "none" }}
              className="subitem rounded bordered"
            >
              <ul>
                <li>
                  <Link to="/index/Adminpanel/OrdersManagement">
                    لیست کل سفارشات
                  </Link>
                </li>
                <li>
                  <Link to="/index/Adminpanel/UnconfirmedOrdersManagement">
                    لیست تایید نشده ها
                  </Link>
                </li>
                <li>
                  <Link to="/index/Adminpanel/processingOrders">
                    لیست پردازش
                  </Link>
                </li>
                <li>
                  <Link to="/index/Adminpanel/sentOrders">لبست ارسال شده</Link>
                </li>
              </ul>
            </li>
          </div>
          <li
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.userManagement
                ? "mainItem rounded"
                : "d-none"
            }
          >
            <Link to="/index/Adminpanel/UserManagement">مدیریت کاربران</Link>
          </li>
          <li
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.customePageManagement
                ? "mainItem rounded"
                : "d-none"
            }
          >
            <Link to="/index/Adminpanel/PageManagement">مدیریت صفحات</Link>
          </li>
          <li
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.commentManagement
                ? "mainItem rounded"
                : "d-none"
            }
          >
            <Link to="/index/Adminpanel/CommentManagement">مدیریت نظرات</Link>
          </li>
          <li
            className={
              this.state.data != null &&
              this.state.data.user.roleId == 3 &&
              this.state.data.userAccess.settings
                ? "mainItem rounded"
                : "d-none"
            }
          >
            <Link to="/index/Adminpanel/settings">مدیریت تنظیمات</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DashboardLinks;
