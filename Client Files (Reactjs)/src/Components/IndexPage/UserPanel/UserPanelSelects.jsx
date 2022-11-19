import React, { Component } from "react";
import "./UserPanel.css";
import { Switch, Route } from "react-router-dom";
import MyProfile from "./MyProfile";
class UserPanelSelects extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="index/userpanel" component={MyProfile} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default UserPanelSelects;
