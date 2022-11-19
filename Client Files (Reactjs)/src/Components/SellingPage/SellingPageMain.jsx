import React, { Component } from "react";
import { Switch, Route, useLocation, withRouter } from "react-router-dom";
import SellingResultLogin from "./SellingResultLogin";
import SellingResultPostDetails from "./SellingResultPostDetails";
import SellingResultConfirm from "./SellingResultConfirm";
import "./SellingPage.css";
class SellingPageMain extends React.Component {
  state = {
    page: null,
  };
  pageChangedToLogin = () => {
    this.setState({ page: "login" });
  };
  pageChangedToPostDetails = () => {
    this.setState({ page: "postDetails" });
  };
  pageChangedToConfirm = () => {
    this.setState({ page: "confirm" });
  };
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/sellResult/login">
            <SellingResultLogin onPageChange={this.pageChangedToLogin} />
          </Route>
          <Route path="/sellResult/PostDetails">
            <SellingResultPostDetails
              onPageChange={this.pageChangedToPostDetails}
            />
          </Route>
          <Route path="/sellResult/Confirm">
            <SellingResultConfirm onPageChange={this.pageChangedToConfirm} />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(SellingPageMain);
