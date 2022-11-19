import React, { Component } from "react";
import { Switch, Route } from "react-router";
import "./AdminDashboard.css";
import BooksManagement from "./AdminPages/BooksManagement/BooksManagement";
import MainPage from "./AdminPages/MainPage/MainPage";
import PublisherManagement from "./AdminPages/PublishersManagement/PublishersManagement";
import TranslatorsManagement from "./AdminPages/TranslatorsManagement/TranslatorsManagement";
import WritersManagement from "./AdminPages/WritersManagement/WritersManagement";
import CategoriesManagement from "./AdminPages/CategoriesManagement/CategoriesManagement";
import CarouselManagement from "./AdminPages/MainPageManagement/CarouselManagement/CarouselManagement";
import AdvertisementManagement from "./AdminPages/MainPageManagement/AdvertisementManagement/AdvertisementManagement";
import ShelfManagement from "./AdminPages/MainPageManagement/ShelfManagement/ShelfManagement";
import UserManagement from "./AdminPages/UserManagement/UserManagement";
import PageManagement from "./AdminPages/PageManagement/PageManagement";
import CommentManagement from "./AdminPages/CommentManagement/CommentManagement";
import OrdersManagement from "./AdminPages/OrderManagement/OrdersManagement";
import UnconfirmedOrdersManagement from "./AdminPages/OrderManagement/UnconfirmedOrders";
import ProcessingOrders from "./AdminPages/OrderManagement/ProccessingOrders";
import SentOrders from "./AdminPages/OrderManagement/SentOrders";
import SettingsManagement from "./AdminPages/Settings/SettingsManagement";
class DashboardContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/index/Adminpanel/dashboard">
            <MainPage />
          </Route>
          <Route exact path="/index/Adminpanel/BooksManagement">
            <BooksManagement />
          </Route>
          <Route exact path="/index/Adminpanel/PublishersManagement">
            <PublisherManagement />
          </Route>
          <Route exact path="/index/Adminpanel/translatorsManagement">
            <TranslatorsManagement />
          </Route>
          <Route exact path="/index/Adminpanel/writersManagement">
            <WritersManagement />
          </Route>
          <Route exact path="/index/Adminpanel/categoriesManagement">
            <CategoriesManagement />
          </Route>
          <Route exact path="/index/Adminpanel/CarouselManagement">
            <CarouselManagement />
          </Route>
          <Route exact path="/index/Adminpanel/AdvertisementManagement">
            <AdvertisementManagement />
          </Route>
          <Route exact path="/index/Adminpanel/ShelfManagement">
            <ShelfManagement />
          </Route>
          <Route exact path="/index/Adminpanel/UserManagement">
            <UserManagement />
          </Route>
          <Route exact path="/index/Adminpanel/PageManagement">
            <PageManagement />
          </Route>
          <Route exact path="/index/Adminpanel/CommentManagement">
            <CommentManagement />
          </Route>
          <Route exact path="/index/Adminpanel/OrdersManagement">
            <OrdersManagement />
          </Route>
          <Route exact path="/index/Adminpanel/UnconfirmedOrdersManagement">
            <UnconfirmedOrdersManagement />
          </Route>
          <Route exact path="/index/Adminpanel/processingOrders">
            <ProcessingOrders />
          </Route>
          <Route exact path="/index/Adminpanel/sentOrders">
            <SentOrders />
          </Route>
          <Route exact path="/index/Adminpanel/settings">
            <SettingsManagement />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default DashboardContent;
