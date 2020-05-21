import React, { Component } from "react";
import OrderItem from "./order-item/OrderItem";
import OrderDetail from "./order-item/order-detail/OrderDetail";
import OrderDelivery from "./order-item/order-delivery/OrderDelivery";
import OrderConfirmation from "./order-item/order-confirmation/OrderConfirmation";
import OrderEdit from "./order-item/order-edit/OrderEdit";
import OrderCancellation from "./order-item/order-cancellation/OrderCancellation";
import "./dataTables.bootstrap4.min.css";
import "./Order.css";

class Order extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //     listProduct: [],
  //     isLoaded: false
  //     };
  // }
  state = {
    Orders: [],
    isLoaded: false
  };

  getOrders = () => {
    const options = {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(`https://localhost:44376/api/admin/order/getAdminOrders`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          Orders: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    // if (this.state.isLoaded === false) {
    //   this.PushToServerPage();
    // }

    const scriptBootstrapDatatable = document.createElement("script");
    const scriptDemoDatatable = document.createElement("script");

    scriptBootstrapDatatable.src =
      "/vendor/datatables/dataTables.bootstrap4.min.js";
    scriptDemoDatatable.src = "/js/demo/datatables-demo.js";

    document.body.appendChild(scriptBootstrapDatatable);
    // document.body.appendChild(scriptDemoDatatable);

    setTimeout(function() {
      document.body.appendChild(scriptDemoDatatable);
    }, 3000);
  };

  componentWillMount = () => {
    this.getOrders();
  };

  render() {
    return (
      <div className="container-fluid">
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách đơn hàng
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>Id</th>
                    <th>Người đặt</th>
                    <th>Người nhận</th>
                    <th>Điện thoại liên lạc</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Phí giao</th>
                    <th>Tổng tiền</th>
                    <th>Ngày tạo</th>
                    <th>Ngày giao</th>
                    <th>Tình trạng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Orders.map((order, idx) => (
                    <OrderItem
                      key={idx}
                      orderId={order.orderId}
                      customerId={order.customerId}
                      customerName={order.customerName}
                      contactPhone={order.contactPhone}
                      deliveryName={order.deliveryName}
                      deliveryEmail={order.deliveryEmail}
                      deliveryAddress={order.deliveryAddress}
                      deliveryPrice={order.deliveryPrice}
                      totalPrice={order.totalPrice}
                      createdDate={order.createdDate}
                      deliveryDate={order.deliveryDate}
                      statusId={order.statusId}
                      statusName={order.statusName}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Người đặt</th>
                    <th>Người nhận</th>
                    <th>Điện thoại liên lạc</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Phí giao</th>
                    <th>Tổng tiền</th>
                    <th>Ngày tạo</th>
                    <th>Ngày giao</th>
                    <th>Tình trạng</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div>
          {this.state.Orders.map((order, idx) => (
            <OrderDetail key={idx} orderId={order.orderId}></OrderDetail>
          ))}
          {this.state.Orders.map((order, idx) => (
            <OrderDelivery key={idx} orderId={order.orderId}></OrderDelivery>
          ))}
          {this.state.Orders.map((order, idx) => (
            <OrderConfirmation
              key={idx}
              orderId={order.orderId}
            ></OrderConfirmation>
          ))}
          {this.state.Orders.map((order, idx) => (
            <OrderEdit key={idx} orderId={order.orderId}></OrderEdit>
          ))}
          {this.state.Orders.map((order, idx) => (
            <OrderCancellation
              key={idx}
              orderId={order.orderId}
            ></OrderCancellation>
          ))}
        </div>
      </div>
    );
  }
}

export default Order;
