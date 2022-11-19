import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./CommentManagementTable.css";
class CommentManagementTable extends React.Component {
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
            <th scope="col">شماره ثبت کاربر</th>
            <th scope="col">متن نظر</th>
            <th scope="col">نام کتاب</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.userId}</td>
                <td>{data.text}</td>
                <td>{data.book.name}</td>
                <td>
                  <button
                    onClick={() => this.props.confirmComment(data.id)}
                    type="button"
                    className={
                      data.commentStateId == 1
                        ? "btn badge bg-secondary link-unstyled"
                        : "btn badge bg-success link-unstyled"
                    }
                    href="#"
                  >
                    تایید
                  </button>
                  &nbsp;
                  <button
                    onClick={() => this.props.removeItem(data.id)}
                    type="button"
                    className="btn badge bg-danger link-unstyled"
                    href="#"
                  >
                    حذف
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

export default CommentManagementTable;
