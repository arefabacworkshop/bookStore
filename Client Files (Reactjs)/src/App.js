import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Components/IndexPage/Home/Home";
import Login from "./Components/IndexPage/Login/Login";
import SignUp from "./Components/IndexPage/SignUp/SignUp";
import ForgotPassword from "./Components/IndexPage/ForgotPassword/ForgotPassword";
import AdminDashboard from "./Components/AdminDashboard/AdminDashborad";
import "font-awesome/css/font-awesome.min.css";
import SellingPageMain from "./Components/SellingPage/SellingPageMain";
import BadPayment from "./Components/IndexPage/Home/BadPayment";
import SuccessfulPayment from "./Components/IndexPage/Home/SuccessfulPayment";
function App() {
  return (
    <React.Fragment>
      <script src={require("jquery/dist/jquery")} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/index" />;
          }}
        />
        <Route path="/index">
          <Home />
        </Route>
        <Route path="/badPayment">
          <BadPayment />
        </Route>
        <Route path="/successfulPayment">
          <SuccessfulPayment />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/sellResult">
          <SellingPageMain />
        </Route>
        <Route>
          <Redirect to="/index" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
