import React, { Component } from "react";
class GiftCard extends React.Component {
  render() {
    return (
      <div className="container drtl py-3 islight">
        <p className="islight text-right h5 pb-3">کارت هدیه</p>
        <p className="py-2 text-center">کارت هدیه موجود نمی باشد</p>
      </div>
    );
  }
}

export default GiftCard;
