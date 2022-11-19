import React, { Component } from "react";
import $ from "jquery";
import dt from "datatables.net-bs4";
class OrderTable extends Component {
  updateTable = () => {
    $("#articletable").DataTable({
      ordering: true,
      searching: false,
      responsive: true,
      lengthChange: false,
      fnDrawCallback: function (oSettings) {
        if (oSettings._iDisplayLength > oSettings.fnRecordsDisplay()) {
          $(oSettings.nTableWrapper).find(".dataTables_paginate").hide();
        } else {
          $(oSettings.nTableWrapper).find(".dataTables_paginate").show();
        }
      },
      language: {
        emptyTable: "شما هیچ سفارشی ثبت شده ای ندارید",
        infoEmpty: "",
      },
      oLanguage: {
        sSearch: "جستجو",
        sInfo: "نمایش _START_ تا _END_ از _TOTAL_ ردیف",
        oPaginate: {
          sNext: "بعدی",
          sPrevious: "قبلی",
        },
      },
    });
  };
  componentDidMount() {
    this.updateTable();
  }
  render() {
    const datas = this.props.data;
    return (
      <table
        id="articletable"
        className="table table-bordered  drtl text-dark"
        data-order='[[1,"asc"]]'
        data-page-length="4"
      >
        <thead className="bg-light">
          <tr>
            <th scope="col">کد سفارش</th>
            <th scope="col">محتویات</th>
            <th scope="col">قیمت</th>
            <th scope="col">عملیات</th>
            <th scope="col">توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.order.id}#</td>
                <td>
                  <ul className="list-unstyled">
                    {data.orderDetails.map((x) => (
                      <li className="inline-block">
                        {x.book.name}
                        {data.orderDetails.indexOf(x) > 0 ? " , " : ""}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{data.order.totalPrice.toLocaleString("ar-EG")} ریال</td>
                <td>
                  <a
                    className={
                      data.order.orderStateId == 1
                        ? "badge bg-danger"
                        : "d-none"
                    }
                    href="#"
                    onClick={() => this.props.removeOrder(data.order.id)}
                  >
                    لغو سفارش
                  </a>
                  <p
                    className={
                      data.order.orderStateId == 1 ? "d-none" : "isreg"
                    }
                  >
                    {data.order.orderState.name}
                  </p>
                  &nbsp;
                  <a
                    className={
                      data.order.orderStateId == 1
                        ? "badge bg-success"
                        : "d-none"
                    }
                    href="#"
                    onClick={() => this.props.payThePrice(data.order.id)}
                  >
                    پرداخت
                  </a>
                </td>
                <td>{data.order.describe}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default OrderTable;
