import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./UserManagementTable.css";
class UserManagementTable extends React.Component {
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
        emptyTable: "هیچ مترجمی موجود نیست",
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
            <th scope="col">شماره ثبت</th>
            <th scope="col">نام</th>
            <th scope="col">نام کاربری</th>
            <th scope="col">شهر</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.userName}</td>
                <td>{data.city}</td>
                <td>
                  <a
                    onClick={() => this.props.loadUpdateData(data.id)}
                    className="badge bg-warning link-unstyled"
                    href="#"
                  >
                    ویرایش
                  </a>
                  &nbsp;
                  <a
                    onClick={() => this.props.removeItem(data.id)}
                    className="badge bg-danger link-unstyled"
                    href="#"
                  >
                    حذف
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default UserManagementTable;