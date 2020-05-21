import React, { Component } from "react";
import OrderEditItem from "./order-edit-item/OrderEditItem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class OrderEdit extends Component {
  state = {
    orderDetails: [],
    orderInformation: []
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

  getOrderInformation = () => {
    const options = {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(
      `https://localhost:44376/api/admin/order/getOrderById?id=${this.props.orderId}`,
      options
    )
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            orderInformation: res
          },
          () => {
            this.renderDeliveryDate();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderOrderDetails = () => {
    if (this.state.orderDetails.length !== 0) {
      const details = this.state.orderDetails.map((order, idx) => (
        <OrderEditItem
          key={idx}
          index={idx}
          colorId={order.colorId}
          productId={order.productId}
          sizeId={order.sizeId}
          quantity={order.quantity}
          price={order.price}
        ></OrderEditItem>
      ));

      return details;
    }
  };

  renderDeliveryDate = () => {
    if (this.state.orderInformation.deliveryDate !== undefined) {
      let value = new Date(this.state.orderInformation.deliveryDate);
      let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
      let month =
        value.getMonth() + 1 < 10
          ? "0" + (value.getMonth() + 1)
          : value.getMonth() + 1;
      let year = value.getFullYear();

      let fullDate = `${year}-${month}-${date}`;
      window.$("#dtExpectationDelivery" + this.props.orderId).val(fullDate);
    }
  };

  dateValidation = () => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;

    window.$("#dtNewExpectationDelivery" + this.props.orderId).val(today);
    window
      .$("#dtNewExpectationDelivery" + this.props.orderId)
      .attr("min", today);
  };

  confirm = () => {
    fetch("https://localhost:44376/api/admin/order/editDeliveryDate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      },
      body: JSON.stringify({
        orderId: this.props.orderId,
        deliveryDate: window
          .$("#dtNewExpectationDelivery" + this.props.orderId)
          .val()
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
            html: "<p style='font-size: 15px'>Sửa ngày giao hàng thành công</p>"
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
    this.getOrderInformation();
  };

  componentDidMount = () => {
    this.dateValidation();
  };

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id={"editModal" + this.props.orderId}
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
                      Ngày giao hàng dự kiến{" "}
                      {this.state.orderInformation.deliveryDate}
                    </span>
                  </div>
                  <input
                    type="date"
                    id={"dtExpectationDelivery" + this.props.orderId}
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    ref="deliveryDate"
                    readOnly
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Ngày giao hàng dự kiến mới
                    </span>
                  </div>
                  <input
                    type="date"
                    id={"dtNewExpectationDelivery" + this.props.orderId}
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    ref="deliveryDate"
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

export default OrderEdit;
