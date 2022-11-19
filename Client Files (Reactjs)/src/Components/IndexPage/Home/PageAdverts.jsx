import React, { Component } from "react";
import { ApiName } from "../../ApiName";
class PageAdverts extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <a href={data != null && data.link != null ? data.link : "#"}>
          <img
            src={ApiName + "/images/adds/" + data.imageLocation}
            alt=""
            className="img-wide rounded shadow rounded mb-2"
          />
        </a>
      </div>
    );
  }
}

export default PageAdverts;
