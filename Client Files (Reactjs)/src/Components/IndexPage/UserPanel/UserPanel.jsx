import React, { Component } from "react";
import "./UserPanel.css";
import { Link, Switch, Route } from "react-router-dom";
import UserPanelSelects from "./UserPanelSelects";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import MyOrders from "./MyOrders";
import GiftCard from "./GiftCard";
import ContactSupport from "./ContanctSupport";
import MyMessages from "./MyMessages";
import LikedProducts from "./LikedProducts";
import axios from "axios";
import { ApiName } from "../../ApiName";
import { toast } from "react-toastify";
import Addresses from "./Addresses";
class UserPanel extends React.Component {
  state = {
    user: {},
    date: Date,
  };
  loadUser = () => {
    var config = {
      method: "get",
      url: ApiName + "/user",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ user: response.data.user, date: response.data.date });
      })
      .catch(function (error) {
        toast.error("مشکلی در ارتباط با سرور به وجود آمد.");
        console.log(error);
      });
  };
  updateUserinfo = (data) => {
    this.setState({ user: data });
  };
  componentDidMount() {
    this.loadUser();
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <Switch>
            <Route exact path="/index/userpanel">
              <MyProfile user={this.state.user} date={this.state.date} />
            </Route>
            <Route path="/index/userpanel/editprofile">
              <EditProfile
                updateUserInfo={this.updateUserinfo}
                user={this.state.user}
              />
            </Route>
            <Route
              exact
              path="/index/userpanel/MyOrders"
              component={MyOrders}
            />
            {/* <Route
              exact
              path="/index/userpanel/GiftCard"
              component={GiftCard}
            /> */}
            <Route
              exact
              path="/index/userpanel/ContactSupport"
              component={ContactSupport}
            />
            <Route
              exact
              path="/index/userpanel/MyMessages"
              component={MyMessages}
            />
            <Route
              exact
              path="/index/userpanel/LikedProducts"
              component={LikedProducts}
            />
            <Route
              exact
              path="/index/userpanel/Addresses"
              component={Addresses}
            />
          </Switch>
        </div>
        <div className="col-md-3 col-sm-12">
          <div className="container more-rounded p-3 bg-white shadow-sm">
            <div className="container text-center drtl">
              <div className="user-panel-img mt-4 bg-info mx-auto h4 item-center text-center isreg text-white p-3">
                {this.state.user != null
                  ? String(this.state.user.name).charAt()
                  : ""}
              </div>
              <p className="isreg text-dark mt-3">{this.state.user.name}</p>
              <ul className="user-panel-list list-unstyled text-center islight pb-3 my-5 max-width">
                <li className="userPanel-items py-2 rounded max-width">
                  <Link className="" to="/index/userpanel">
                    پروفایل من
                  </Link>
                </li>
                <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/editprofile">ویرایش پروفایل</Link>
                </li>
                <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/MyOrders"> سفارشات من</Link>
                </li>
                {/* <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/GiftCard"> کارت هدیه</Link>
                </li> */}
                {/* <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/ContactSupport">
                    {" "}
                    ارتباط با پشتیبانی
                  </Link>
                </li>
                <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/MyMessages"> پیام های من</Link>
                </li> */}
                <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/LikedProducts">
                    {" "}
                    لیست علاقه مندی ها
                  </Link>
                </li>
                <li className="userPanel-items py-2 rounded">
                  <Link to="/index/userpanel/Addresses"> آدرس ها</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPanel;
