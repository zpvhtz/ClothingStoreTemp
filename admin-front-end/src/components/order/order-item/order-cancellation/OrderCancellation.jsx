import React, { Component } from "react";
import OrderCancellationItem from './order-cancellation-item/OrderCancellationItem'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class OrderCancellation extends Component {
    state = {
        orderDetails: []
    }

    getOrderDetails = () => {
        fetch(`https://localhost:44376/api/admin/orderdetail/getAllByOrderId?orderId=${this.props.orderId}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                orderDetails: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    renderOrderDetails = () => {
        if(this.state.orderDetails.length !== 0) {
            const details = this.state.orderDetails.map((order, idx) => 
                <OrderCancellationItem key={idx} index={idx} colorId={order.colorId} productId={order.productId} sizeId={order.sizeId} quantity={order.quantity} price={order.price}></OrderCancellationItem>
            );

            return details;
        }
    }

    confirm = () => {
        Swal.fire({
            title: 'Thông báo',
            text: "Bạn có chắc chắn muốn huỷ đơn hàng?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74a3b',
            cancelButtonColor: '#858796',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.value) {
                fetch('https://localhost:44376/api/admin/order/cancelOrder', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
                    },
                    body: JSON.stringify({
                        orderId: this.props.orderId
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res === true) {
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            icon: 'success',
                            html: "<p style='font-size: 15px'>Đơn hàng đã được huỷ</p>"
                        }).then((res) => {
                        window.location.href = "/order-page"; 
                        });
                    } else {
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Lỗi</p>"
                        })
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
            }
        })
    }

    componentWillMount = () => {
        this.getOrderDetails();
    }

    render() {
        return (
        <div
            className="modal fade bd-example-modal-lg"
            id={"cancelModal" + this.props.orderId}
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
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                            <tbody>
                                {this.renderOrderDetails()}   
                            </tbody>
                        </table>                 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.confirm}> Huỷ </button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"> Đóng </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default OrderCancellation;
