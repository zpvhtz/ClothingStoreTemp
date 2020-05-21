import React, { Component } from "react";
import OrderDetailItem from "./order-detail-item/OrderDetailItem";

class OrderDetail extends Component {
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
        <OrderDetailItem
          key={idx}
          index={idx}
          colorId={order.colorId}
          productId={order.productId}
          sizeId={order.sizeId}
          quantity={order.quantity}
          price={order.price}
        ></OrderDetailItem>
      ));

      return details;
    }
  };

  componentWillMount = () => {
    this.getOrderDetails();
  };

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id={"modal" + this.props.orderId}
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
