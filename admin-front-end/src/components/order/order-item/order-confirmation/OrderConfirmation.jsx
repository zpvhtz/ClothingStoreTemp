import React, { Component } from "react";
import OrderConfirmationItem from "./order-confirmation-item/OrderConfirmationItem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class OrderConfirmation extends Component {
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
        <OrderConfirmationItem
          key={idx}
          index={idx}
          colorId={order.colorId}
          productId={order.productId}
          sizeId={order.sizeId}
          quantity={order.quantity}
          price={order.price}
        ></OrderConfirmationItem>
      ));

      return details;
    }
  };

  dateValidation = () => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + month + "-" + day;

    window.$("#dtDelivery").val(today);
    window.$("#dtDelivery").attr("min", today);
  };

  confirm = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Bạn có chắc chắn đơn hàng đã vận chuyển thành công?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1cc88a",
      cancelButtonColor: "#858796",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Huỷ"
    }).then(result => {
      if (result.value) {
        fetch("https://localhost:44376/api/admin/order/confirmOrder", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("authenticatedTokenAdmin").toString()
          },
          body: JSON.stringify({
            orderId: this.props.orderId
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
                  "<p style='font-size: 15px'>Xác nhận đơn hàng thành công</p>"
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
      }
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
        id={"confirmationModal" + this.props.orderId}
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
                className="btn btn-success"
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

export default OrderConfirmation;
