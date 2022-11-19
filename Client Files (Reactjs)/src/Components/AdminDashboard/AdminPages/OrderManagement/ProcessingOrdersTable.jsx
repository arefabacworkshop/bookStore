import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./OrdersManagementTable.css";
class ProccessingOrdersTable extends React.Component {
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
            <th scope="col">مبلغ پرداختی</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.user.id}</td>
                <td>{data.user.name}</td>
                <td>{data.totalPrice.toLocaleString("ar-EG")} ریال</td>
                <td>
                  <button
                    onClick={() => this.props.showData(data.id)}
                    type="button"
                    className="btn badge bg-secondary"
                  >
                    مشاهده
                  </button>
                  &nbsp;
                  <button
                    onClick={() => this.props.openModal(data.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    type="button"
                    className="btn badge bg-success"
                  >
                    تایید
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ProccessingOrdersTable;
