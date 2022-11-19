import React, { Component } from "react";
class MyMessages extends React.Component {
  render() {
    return (
      <div className="container drtl py-3 islight">
        <p className="islight text-right h5 pb-3">پیام های من</p>
        <p className="py-2 text-center">شما در حال حاظر هیچ پیامی ندارید</p>
      </div>
    );
  }
}

export default MyMessages;
