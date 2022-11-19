import { logDOM } from "@testing-library/react";
import React, { Component } from "react";
import car1 from "../../../Assets/img/car1.jpg";
import car2 from "../../../Assets/img/car2.jpg";
import car3 from "../../../Assets/img/car3.jpg";
import Navbar from "./Navbar";
import reliablility from "../../../Assets/img/reliability.png";
import iran from "../../../Assets/img/iran.png";
import shipped from "../../../Assets/img/shipped.png";
import "./Home.css";
import Shelf from "./Shelf";
import Footer from "./Footer";
import PageAdverts from "./PageAdverts";
import $ from "jquery/dist/jquery";
import { Redirect, Route, Switch } from "react-router";
import Main from "./Main";
import Writers from "./Writes/Writers";
import CategoryPage from "./Page/CategoryPage";
import UserPanel from "../UserPanel/UserPanel";
import AdminDashboard from "../../AdminDashboard/AdminDashborad";
import BooksInfo from "./BooksInfo/BooksInfo";
import { FaThemeisle } from "react-icons/fa";
import { toast } from "react-toastify";
import ShoppingCart from "./ShopingCart/ShoppingCart";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import WriterPage from "./Page/WriterPage/WriterPage";
import axios from "axios";
import { ApiName } from "../../ApiName";
import CustomPage from "./Page/CustomPage/CustomPage";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
class Home extends React.Component {
  state = {
    GoodsInBasketCount: 0,
    checkAuth: false,
    user: null,
    categories: [],
    carousels: [],
    shelves: [],
    adverts: [],
  };
  loadAdverts = () => {
    var config = {
      method: "get",
      url: ApiName + "/advertisement",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ adverts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadShelves = () => {
    var config = {
      method: "get",
      url: ApiName + "/shelf",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ shelves: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  loadCarousels = () => {
    var config = {
      method: "get",
      url: ApiName + "/carousel",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ carousels: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  logout = () => {
    localStorage.clear();
    window.location.href = "/index";
  };
  loadCategories = () => {
    var config = {
      method: "get",
      url: ApiName + "/category",
      headers: {},
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ categories: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  authorize = () => {
    var config = {
      method: "get",
      url: ApiName + "/auth/validation",
      headers: {
        Authorization: localStorage.ValidationToken,
      },
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({ checkAuth: true, user: response.data });
      })
      .catch(function (error) {
        self.setState({ user: null, checkAuth: false });
      });
  };
  AddToCart = (id, count) => {
    var currentCart = localStorage.shopingcart;
    if (currentCart != null) currentCart = JSON.parse(currentCart);
    else var currentCart = [];
    var target = currentCart.find((x) => x.id === id);
    if (target != null)
      toast.info(
        "در حال حاضر محصول در سبد خرید موجود می باشد.برای تغییر تعداد خرید به سبد مراجعه کنید"
      );
    else {
      target = {
        id: id,
        count: count,
      };
      currentCart.push(target);
      this.setState({ GoodsInBasketCount: this.state.GoodsInBasketCount + 1 });
    }

    localStorage.shopingcart = JSON.stringify(currentCart);
  };
  loadCart = () => {
    cart = localStorage.shopingcart;
    if (cart != null) {
      var cart = JSON.parse(cart);
      this.setState({ GoodsInBasketCount: cart.length });
    }
  };
  removeFromCart = () => {
    if (this.state.GoodsInBasketCount != 0)
      this.setState({ GoodsInBasketCount: this.state.GoodsInBasketCount - 1 });
  };
  componentDidMount() {
    this.loadCart();
    this.authorize();
    this.loadCategories();
    this.loadCarousels();
    this.loadAdverts();
    this.loadShelves();
  }
  render() {
    return (
      <div>
        <div className="container-fluid bg-set content-wrapper py-2 pb-4">
          {/* <div className="pt-2"></div> */}
          <div className="container">
            {/* Nav */}
            <Navbar
              categories={this.state.categories}
              user={this.state.user}
              Authorized={this.state.checkAuth}
              GoodsInBasket={this.state.GoodsInBasketCount}
              logout={this.logout}
            />
            {/* carousel */}
            <Switch>
              <Route exact path="/index">
                <Main
                  carousels={this.state.carousels}
                  shelves={this.state.shelves}
                  adverts={this.state.adverts}
                />
              </Route>
              <Route path="/index/writers">
                <Writers />
              </Route>
              <Route path="/index/categorypage/:id">
                <CategoryPage />
              </Route>
              <Route path="/index/custompage/:id">
                <CustomPage />
              </Route>
              <Route path="/index/userpanel">
                <UserPanel />
              </Route>
              <Route path="/index/AdminPanel">
                <AdminDashboard />
              </Route>
              <Route path="/index/BooksInfo/:id?">
                <BooksInfo AddToCart={this.AddToCart} />
              </Route>
              <Route path="/index/shoppingcart">
                <ShoppingCart removeFromCart={this.removeFromCart} />
              </Route>
              <Route path="/index/advancedsearch/:name">
                <AdvancedSearch />
              </Route>
              <Route path="/index/writerpage/:id">
                <WriterPage />
              </Route>
              <Route path="/index/aboutUs">
                <AboutUs />
              </Route>
              <Route path="/index/contactUs">
                <ContactUs />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
