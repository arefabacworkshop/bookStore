import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./BooksManagementTable.css";
import { Link } from "react-router-dom";
class BooksManagementTable extends React.Component {
  componentDidMount() {
    $("#articletable").DataTable({
      ordering: true,
      searching: true,
      responsive: true,
      lengthChange: false,
      language: {
        emptyTable: "هیچ مقاله ای برای مشاهده نیست",
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
            <th scope="col">عنوان</th>
            <th scope="col">شابک</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.bookNo}</td>
                <td>
                  <a
                    onClick={() => this.props.handleImages(data.id)}
                    className="badge bg-info link-unstyled"
                    href="#"
                  >
                    مدیریت تصاویر
                  </a>
                  &nbsp;
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

export default BooksManagementTable;
