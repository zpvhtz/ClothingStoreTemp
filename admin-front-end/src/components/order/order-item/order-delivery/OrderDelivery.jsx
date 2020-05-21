import React, { Component } from "react";
import OrderDeliveryItem from "./order-delivery-item/OrderDeliveryItem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class OrderDelivery extends Component {
  state = {
    orderDetails: []
  };

  getOrderDetails = () => {
    const options = {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(
      `https://localhost:44376/api/admin/orderdetail/getAllByOrderId?orderId=${this.props.orderId}`,
      options
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          orderDetails: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderOrderDetails = () => {
    if (this.state.orderDetails.length !== 0) {
      const details = this.state.orderDetails.map((order, idx) => (
        <OrderDeliveryItem
          key={idx}
          index={idx}
          colorId={order.colorId}
          productId={order.productId}
          sizeId={order.sizeId}
          quantity={order.quantity}
          price={order.price}
        ></OrderDeliveryItem>
      ));

      return details;
    }
  };

  dateValidation = () => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;

    window.$("#dtDelivery" + this.props.orderId).val(today);
    window.$("#dtDelivery" + this.props.orderId).attr("min", today);
  };

  confirm = () => {
    fetch("https://localhost:44376/api/admin/order/confirmDeliveryDate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      },
      body: JSON.stringify({
        orderId: this.props.orderId,
        deliveryDate: window.$("#dtDelivery" + this.props.orderId).val()
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res === true) {
          MySwal.fire({
            title: "Thông báo",
            width: 300,
            padding: "2em",
            icon: "success",
            html:
              "<p style='font-size: 15px'>Xác nhận ngày giao hàng thành công</p>"
          }).then(res => {
            window.location.href = "/order-page";
          });
        } else {
          MySwal.fire({
            title: "Thông báo",
            width: 300,
            padding: "2em",
            html:
              "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Lỗi</p>"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillMount = () => {
    this.getOrderDetails();
  };

  componentDidMount = () => {
    this.dateValidation();
  };

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id={"deliveryModal" + this.props.orderId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Đơn hàng: {this.props.orderId}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th></th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Size</th>
                    <th scope="col">Màu</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>{this.renderOrderDetails()}</tbody>
              </table>
              <div className="container">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Ngày giao hàng dự kiến
                    </span>
                  </div>
                  <input
                    type="date"
                    id={"dtDelivery" + this.props.orderId}
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    ref={"deliveryDate" + this.props.orderId}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.confirm}
              >
                {" "}
                Xác nhận{" "}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {" "}
                Đóng{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDelivery;
