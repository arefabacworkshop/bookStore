import React, { Component } from "react";
import bookimg from "../../../../Assets/img/Bookimg.png";
import "./ShoppingCart.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ApiName } from "../../../ApiName";
import { toast } from "react-toastify";
class ShoppingCart extends Component {
  state = { goodsId: [], goods: [], totalPrice: 0 };
  loadGoods = () => {
    var goodsId = localStorage.shopingcart;
    this.setState({ goodsId: goodsId });
  };
  i = 0;
  getGoods = (goodsId) => {
    var data = goodsId;
    console.log(data);
    var config = {
      method: "post",
      url: ApiName + "/shoppingcart",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var self = this;
    axios(config)
      .then(function (response) {
        self.setState({
          goods: response.data.books,
          totalPrice: response.data.totalPrice,
        });
      })
      .catch(function (error) {
        toast.error("ارتباط با سرور با اشکال مواجه شد.");
        self.setState({ goods: [] });
      });
  };
  componentDidMount() {
    if (localStorage.shopingcart != null) {
      console.log(localStorage.shopingcart);
      this.getGoods(localStorage.shopingcart);
    }
  }
  handleRemove = (item) => {
    var cart = JSON.parse(localStorage.shopingcart);
    var index = cart.indexOf(item);
    cart.splice(index, 1);
    localStorage.shopingcart = JSON.stringify(cart);
    var currentGoods = this.state.goods;
    var itemToRemove = currentGoods.find((x) => x.id === item.id);
    currentGoods.splice(itemToRemove, 1);
    this.setState({ goods: currentGoods });
    this.props.removeFromCart();
  };
  render() {
    var i = this.i;
    return (
      <div className="row drtl isreg">
        <div className="col-md-8 col-sm-12">
          <div className="container bg-white rounded shadow-sm mb-2 mt-2 py-2">
            <p className="isbold pt-2">سبد خرید</p>
            <p
              className={
                this.state.goods.length == 0
                  ? "isreg text-center py-5"
                  : "d-none"
              }
            >
              کالایی در سبد موجود نمی باشد.
            </p>
            <table
              class={
                this.state.goods.length != 0
                  ? "table table-responsive-sm table-responsive-xs table-bordered"
                  : "d-none"
              }
            >
              <thead className="bg-light">
                <tr>
                  <th></th>
                  <th className="pe-2">تصویر محصول</th>
                  <th className="pe-2">نام محصول</th>
                  <th className="pe-2">تعداد</th>
                  <th className="pe-2">قیمت محصول</th>
                </tr>
              </thead>
              <tbody>
                {this.state.goods.map((x) => {
                  i = i + 1;
                  return (
                    <tr>
                      <td scope="row" className="text-center item-center ">
                        <span
                          onClick={() =>
                            this.handleRemove(
                              JSON.parse(localStorage.shopingcart)[i - 1]
                            )
                          }
                          className="badge bg-dark text-light mt-5 islight"
                        >
                          X
                        </span>
                      </td>
                      <td className="cartimg align-middle">
                        <img
                          height="120px"
                          className="rounded"
                          src={ApiName + "/images/books/" + x.imageLocation}
                          alt=""
                        />
                      </td>
                      <td className="align-middle">{x.name}</td>
                      <td className="align-middle">
                        <div class="form-group">
                          <input
                            type="number"
                            className="form-control input-lg bigger-width"
                            name=""
                            id="buyCount"
                            aria-describedby="helpId"
                            placeholder=""
                            min={x.countInStorage == 0 ? 0 : 1}
                            max={x.countInStorage == 0 ? 0 : x.countInStorage}
                            onChange={(e) => {
                              var cart = JSON.parse(localStorage.shopingcart);
                              var currentBook = cart.find((y) => y.id == x.id);
                              var index = cart.indexOf(currentBook);
                              var obj = cart[index];
                              obj.count = e.target.value;
                              cart[index] = obj;
                              localStorage.shopingcart = JSON.stringify(cart);
                            }}
                            defaultValue={
                              JSON.parse(localStorage.shopingcart)[i - 1].count
                            }
                          />

                          <small className="islight">
                            موجودی انبار : {x.countInStorage}
                          </small>
                        </div>
                      </td>
                      <td className="align-middle price-colour">
                        {x.price.toLocaleString("ar-EG")} ریال
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="container bg-white rounded shadow-sm mb-2 mt-2 text-center py-5">
            <p className="isreg">مبلغ قابل پرداخت</p>
            <p className="isbold price-colour">
              {this.state.totalPrice.toLocaleString("ar-EG")} ریال
            </p>
            <Link
              to={this.state.goods.length != 0 ? "/sellresult/login" : "/index"}
            >
              <button type="button" className="py-2 px-5 mb-2 btn btn-success">
                پرداخت
              </button>
            </Link>
            <br />
            <button
              onClick={() => this.getGoods(localStorage.shopingcart)}
              type="button"
              className="btn btn-info"
            >
              محاسبه مجدد قیمت
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
