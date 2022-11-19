import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./OrdersManagementTable.css";
class OrdersManagementTable extends React.Component {
  componentDidMount() {
    $("#articletable").DataTable({
      ordering: true,
      searching: true,
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
        emptyTable: "هیچ انتشاراتی موجود نیست",
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
  }
  render() {
    const headers = [];
    const datas = this.props.data;
    return (
      <table
        id="articletable"
        className={
          datas === []
            ? "d-none"
            : "mt-2 table table-striped table-bordered text-dark islight"
        }
        data-order='[[1,"asc"]]'
        data-page-length="5"
      >
        <thead className="bg-light">
          <tr>
            <th scope="col"> شماره ثبت سفارش</th>
            <th scope="col">شماره ثبت کاربر</th>
            <th scope="col">نام کاربر</th>
            <th scope="col">لیست کالا</th>
            <th scope="col">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.order.id}</td>
                <td>{data.order.user.id}</td>
                <td>{data.order.user.name}</td>
                <td>
                  <ul>
                    {data.orderDetails.map((x) => (
                      <li>{x.book.name}</li>
                    ))}
                  </ul>
                </td>
                <td>{data.order.orderState.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default OrdersManagementTable;
