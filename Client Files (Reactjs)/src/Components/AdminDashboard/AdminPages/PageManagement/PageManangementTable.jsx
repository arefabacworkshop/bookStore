import React, { Component } from "react";
import "datatables.net-bs4";
import $ from "jquery";
import "./PageManagementTable.css";
import { Link } from "react-router-dom";
import { ApiName } from "../../../ApiName";
class PageManagementTable extends React.Component {
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
    var address = window.location.href
      .replace(window.location.pathname, "")
      .includes("#")
      ? window.location.href
          .replace(window.location.pathname, "")
          .replace("#", "")
      : window.location.href.replace(window.location.pathname, "");
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
            <th scope="col">لینک</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                  <a href={address + "/index/custompage/" + data.id}>
                    {address + "/index/custompage/" + data.id}
                  </a>
                </td>
                <td>
                  <Link
                    className="badge bg-info link-unstyled"
                    to={"/index/custompage/" + data.id}
                  >
                    مشاهده
                  </Link>
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

export default PageManagementTable;
