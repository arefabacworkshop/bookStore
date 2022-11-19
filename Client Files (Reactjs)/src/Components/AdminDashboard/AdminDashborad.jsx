import React, { Component } from "react";
import DashboardLinks from "./DashboardLinks";
import DashboardContent from "./DashboardContent";
class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="row drtl">
        <div className="col-md-3 col-sm-12">
          <div className="container rounded bg-white shadow-sm py-2 mb-3">
            <DashboardLinks />
          </div>
        </div>
        <div className="col-md-9 col-sm-12 dltr">
          <DashboardContent />
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
