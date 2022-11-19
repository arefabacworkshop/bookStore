import React, { Component } from "react";
import logoimg from "../../../Assets/img/logo.png";
import basket from "../../../Assets/img/shopping-basket.png";
import loginimg from "../../../Assets/img/login.png";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import $ from "jquery";
class Navbar extends React.Component {
  handleDropdown = () => {
    var setDropDown = !this.state.dropdown;
    this.setState({ dropdown: setDropDown });
  };
  state = { searchInput: "" };
  searchInputChanged = (e) => {
    this.setState({ searchInput: e.target.value });
  };
  render() {
    const { logout, user, Authorized, categories } = this.props;
    return (
      <div>
        <div className="upper-nav p-3 shadow bg-white mb-2 rounded container drtl">
          <div className="row">
            <div className=" mt-2 col-md-3 col-sm-12  ">
              <div className="container logoimg text-right">
                <Link to="/index">
                  <img
                    src={logoimg}
                    className=""
                    alt=""
                    height="70px"
                    width="70px"
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-12  mt-3 container">
              <div className="container">
                <div class="form-group text-center item-center">
                  <input
                    type="text"
                    class="form-control mt-2 isreg text-right"
                    name="search"
                    id="searchInput"
                    defaultValue={this.state.searchInput}
                    onChange={this.searchInputChanged}
                    aria-describedby="helpId"
                    placeholder="جستجو"
                  ></input>
                </div>
                <p className="dltr">
                  <Link
                    to={
                      $("#searchButton").attr("disabled")
                        ? "#"
                        : "/index/advancedsearch/" + $("#searchInput").val()
                    }
                  >
                    <button
                      className="isreg btn btn-warning advanced-search badge"
                      href="#"
                      id="searchButton"
                      disabled={this.state.searchInput == "" ? true : false}
                    >
                      جستجو
                    </button>
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 reg-and-shop px-5 text-center">
              <div className="container  p-3 dropdown">
                <div
                  id="UserPanelDropdown"
                  role={Authorized ? "button" : ""}
                  data-bs-toggle={Authorized ? "dropdown" : ""}
                  aria-expanded="false"
                  className="container   "
                >
                  <img src={loginimg} alt="" className="mt-2 uppernav-img" />
                  {Authorized ? (
                    <div>
                      <p className="mb-0 mt-1 text-dark islight ">
                        {user.name}
                      </p>
                      <p className="mb-0 islight text-dark ">خوش آمدید </p>
                    </div>
                  ) : (
                    <p>
                      <Link
                        to="/login"
                        className="mb-0 mt-1 text-dark islight "
                      >
                        ورود/ثبت نام{" "}
                      </Link>
                    </p>
                  )}
                </div>
                {Authorized ? (
                  <ul class="dropdown-menu" aria-labelledby="UserPanelDropdown">
                    {user.roleId == 1 ? (
                      <li>
                        <Link
                          class="dropdown-item islight text-dark"
                          to="/index/adminpanel/dashboard"
                        >
                          ورود به پنل مدیریت
                        </Link>
                      </li>
                    ) : user.roleId == 3 ? (
                      <li>
                        <Link
                          class="dropdown-item islight text-dark"
                          to="/index/adminpanel"
                        >
                          ورود به پنل کارشناس
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link
                          class="dropdown-item islight text-dark"
                          to="/index/userpanel"
                        >
                          ورود به پنل کاربر
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        onClick={logout}
                        class="islight dropdown-item text-dark"
                        href="#"
                      >
                        خروج از حساب کاربری
                      </a>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {/* LowerNav */}
        {/* <nav className=" drtl container bg-growth islight  shadow rounded mb-2">
          <ul className="navlinks-list">
            <li id="home-navlink" className="isbold">
              خانه
            </li>
            <li>
              <a className="navlinks" href="#">
                فهرست ناشران
              </a>
            </li>
            <li>
              <a className="navlinks" href="#">
                پرفروش ترین ها{" "}
              </a>
            </li>
            <li>
              <div onClick={this.handleDropdown} class="dropdown">
                <a href="#">دسته بندی موضوعی</a>
                <ul
                  class={
                    this.state.dropdown
                      ? "shadow rounded mt-3 text-dark dropdown-content d-block"
                      : "shadow rounded mt-3 text-dark dropdown-content d-none"
                  }
                >
                  <li>
                    <a href="">تاریخی</a>
                  </li>
                  <li>
                    <a href="">علمی</a>
                  </li>
                  <li>
                    <a href="">تربیتی</a>
                  </li>
                  <li>
                    <a href="">آموزشی</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="ml-auto"></li>
          </ul>
        </nav> */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-navyblue drtl shadow-sm isreg mb-2 rounded">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" to="/index">
                    خانه
                  </Link>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="text-gold nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    دسته بندی موضوعی
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    {categories.map((x) => (
                      <li className="link-dark text-dark">
                        <a
                          class="link-dark dropdown-item "
                          href={"/index/categorypage/" + x.id}
                        >
                          <span className="link-dark mx-0 px-0">{x.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link text-gold"
                    to="/index/advancedSearch/null"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    جستجوی پیشرفته
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link text-gold"
                    to="/index/aboutUs"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    درباره ما
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link text-gold"
                    to="/index/contactUs"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>
            <form class="d-flex me-auto text-light">
              <Link to="/index/shoppingcart">
                <button type="button" className="btn btn btn-outline-light">
                  سبد خرید <FaShoppingCart />
                  &nbsp;
                  <span
                    class={
                      this.props.GoodsInBasket != 0
                        ? "badge bg-danger"
                        : "d-none"
                    }
                  >
                    {this.props.GoodsInBasket}
                  </span>
                </button>
              </Link>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
