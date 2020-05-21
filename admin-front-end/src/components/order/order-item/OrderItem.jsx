import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import Download from "./download/Download";

class OrderItem extends Component {
  state = {
    redirect: false,
    orderdetail: []
  };

  getOrderDetails = () => {
    const options = {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(
      `https://localhost:44376/api/admin/orderdetail/getCustomerOrderDetails?orderId=${this.props.orderId}`,
      options
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          orderdetail: res
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  renderDeliveryDate = () => {
    let tempDate = new Date(this.props.deliveryDate);

    let dd =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let mm =
      tempDate.getMonth() + 1 < 10
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    let yyyy = tempDate.getFullYear();

    let fullDate = `${dd}-${mm}-${yyyy}`;
    return fullDate;
  };

  renderCreatedDate = () => {
    let tempDate = new Date(this.props.createdDate);

    let dd =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let mm =
      tempDate.getMonth() + 1 < 10
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    let yyyy = tempDate.getFullYear();

    let fullDate = `${dd}-${mm}-${yyyy}`;
    return fullDate;
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/target" />;
    }
  };

  componentWillMount = () => {
    this.getOrderDetails();
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.orderId}</td>
          <td>{this.props.customerName}</td>
          <td>{this.props.deliveryName}</td>
          <td>{this.props.contactPhone}</td>
          <td>{this.props.deliveryEmail}</td>
          <td>{this.props.deliveryAddress}</td>
          <td>
            <NumberFormat
              value={this.props.deliveryPrice}
              displayType={"text"}
              thousandSeparator={true}
            />
            ₫
          </td>
          <td>
            <NumberFormat
              value={this.props.totalPrice}
              displayType={"text"}
              thousandSeparator={true}
            />
            ₫
          </td>
          <td>{this.renderCreatedDate()}</td>
          <td>{this.renderDeliveryDate()}</td>
          <td>{this.props.statusName}</td>
          <td>
            {this.props.statusName === "Chưa thanh toán" ? (
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target={"#deliveryModal" + this.props.orderId}
              >
                {" "}
                Giao hàng{" "}
              </button>
            ) : (
              ""
            )}
            {this.props.statusName === "Chưa thanh toán" ? <p> </p> : ""}
            {this.props.statusName === "Đang giao" ? (
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target={"#confirmationModal" + this.props.orderId}
              >
                {" "}
                Xác nhận{" "}
              </button>
            ) : (
              ""
            )}
            {this.props.statusName === "Đang giao" ? <p> </p> : ""}
            {this.props.statusName === "Đang giao" ? (
              <button
                className="btn btn-warning"
                data-toggle="modal"
                data-target={"#editModal" + this.props.orderId}
              >
                {" "}
                Sửa{" "}
              </button>
            ) : (
              ""
            )}
            {this.props.statusName === "Đang giao" ? <p> </p> : ""}
            {this.props.statusName === "Chưa thanh toán" ? (
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target={"#cancelModal" + this.props.orderId}
              >
                {" "}
                Huỷ{" "}
              </button>
            ) : (
              ""
            )}
            {this.props.statusName === "Chưa thanh toán" ? <p> </p> : ""}
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target={"#modal" + this.props.orderId}
            >
              {" "}
              Chi tiết{" "}
            </button>
            <p> </p>
            <Download
              orderId={this.props.orderId}
              deliveryName={this.props.deliveryName}
              deliveryPhone={this.props.deliveryPhone}
              deliveryAddress={this.props.deliveryAddress}
              deliveryEmail={this.props.deliveryEmail}
              contactPhone={this.props.contactPhone}
              createdDate={this.props.createdDate}
              deliveryDate={this.props.deliveryDate}
              deliveryPrice={this.props.deliveryPrice}
              totalPrice={this.props.totalPrice}
              orderDetail={this.state.orderdetail}
            ></Download>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default OrderItem;
