import React from 'react';
import NumberFormat from "react-number-format";
import './Main.css'
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// eslint-disable-next-line no-unused-vars
const MySwal = withReactContent(Swal)
// eslint-disable-next-line no-unused-vars
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})
class Main extends React.Component{
    state = {
        token:'',
        isLoggedIn: false,
        information:[],
        orderdetail:[],
        order: []
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation();
            });
        } else {
            window.location.href = "/";
        }
    }

    getUserInformation = () => {
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                information: res
            }, () => {
                this.getId();
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getId = () => {
        let idTemp = '', id = '';
        let href = window.location.href;

        if(href.indexOf("id") === -1) {
            window.location.href = "/";
        }
        else {
            idTemp = href.substring(href.indexOf("id"), href.length);
            id = idTemp.substring(idTemp.indexOf('=') + 1, idTemp.indexOf("#") === -1 ? idTemp.length : idTemp.length - 1);
        }

        this.getOrder(id);
        this.getOrderDetails(id);
    }

    getOrderDetails = (id) => {
        fetch(`https://localhost:44376/api/customer/orderdetail/getCustomerOrderDetails?orderId=${id}`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                orderdetail: res
            });
        })
        .catch(e=>{
            console.log(e);
        })
    }

    getOrder = (id) => {
        fetch(`https://localhost:44376/api/customer/order/getCustomerOrderByOrderId?orderId=${id}`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                order: res
            });
        })
        .catch(e=>{
            console.log(e);
        })
    }

    renderOrderDetails = () => {
        if(this.state.orderdetail !== null)
        {
            const listItems = this.state.orderdetail.map((item, idx) =>
                <tr key={idx}>
                    <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td>
                        <td className="details">
                            <a href={"/product?id="+ item.productId}>{item.name}</a>
                            <ul>
                                <li><span>Size: {item.sizeName}</span></li>
                                <li><span>Color: {item.colorName}</span></li>
                            </ul>
                        </td>
                        
                    <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
                    <td className="qty text-center">{item.quantity}</td>
                </tr>
            );

            return listItems;
        }
    }

    renderCreatedDate = (createdDate) => {
        if(createdDate !== undefined) {
            let value = new Date(createdDate);
            let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
            let year = value.getFullYear();

            let fullDate = `${date}-${month}-${year}`;
            return fullDate;
        }
    }

    renderInformation = () => {
        let address = this.state.information.address;
        if(address !== undefined) {
            address = address.replace(" PX.", ", Phường xã ");
            address = address.replace(" QH.", ", Quận huyện ");
            address = address.replace(" TT.", ", ");
    
            return address;
        }
    }

    renderDeliveryDate = (deliveryDate, statusName) => {
        if(deliveryDate !== undefined) {
            if(statusName === "Đã huỷ") {
                return "";
            }

            if(statusName === "Chưa thanh toán") {
                return "Chưa xác nhận"
            }

            let value = new Date(deliveryDate);
            let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
            let year = value.getFullYear();

            let fullDate = `${date}-${month}-${year}`;
            return fullDate;
        }
    }

    cancelOrder = () => {
        Swal.fire({
            title: 'Thông báo',
            text: "Bạn có chắc chắn muốn huỷ đơn hàng?",
            width: 400,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.value) {
                fetch('https://localhost:44376/api/customer/order/cancelOrder', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderId: this.state.order.orderId
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
                            html: "<p style='font-size: 15px'>Huỷ đơn hàng thành công</p>"
                        }).then((res) => {
                        window.location.href = `/orderdetail?id=${this.state.order.orderId}`; 
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
    
    componentDidMount=()=>{
        this.checkLoggedIn();
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div style={{float: "left", marginRight: "10px"}}>
                        <div className="section-dc">
                            <i className="fa fa-map-marker"></i> &nbsp;
                            <span className="dc">Thông tin người nhận</span>
                        </div>
                        <div className="content-address">
                            <div>
                                <span className="dc">Họ tên: {this.state.order.deliveryName}</span>
                                <br></br>
                                <span className="dc">Địa chỉ: {this.renderInformation()}</span>
                                <br></br>
                                <span className="dc">Email: {this.state.order.deliveryEmail}</span>
                                <br></br>
                                <span className="dc">SĐT: {this.state.order.contactPhone}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{float: "right"}}>
                        <div className="section-dc">
                            <i className="fa fa-shopping-bag"></i> &nbsp;
                            <span className="dc">Thông tin đơn hàng</span>
                        </div>
                        <div className="content-address">
                            <div>
                                <span className="dc">ID: {this.state.order.orderId}</span>
                                <br></br>
                                <span className="dc">Ngày đặt: {this.renderCreatedDate(this.state.order.createdDate)}</span>
                                <br></br>
                                <span className="dc">Ngày giao: {this.renderDeliveryDate(this.state.order.deliveryDate, this.state.order.statusName)}</span>
                                <br></br>
                                <span className="dc">Tình trạng: {this.state.order.statusName}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{clear: "both"}}></div>
                
                    <div className="section-title">
                        <h3 className="title">Đơn hàng</h3>
					</div>
                    <table className="shopping-cart-table table table-hover">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th></th>
                                <th className="text-center">Tổng tiền</th>
                                <th className="text-center">Số lượng</th>
								<th className="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.renderOrder()} */}
                            {this.renderOrderDetails()}
                        </tbody>
                    </table>
                </div>

                <div className="form-chuthich">
                    <div className="form-padding">
                        <div className="tong-tienhang">
                            <div className="txt-dathang">
                                <p>Phí vận chuyển</p>
                            </div>
                            <div className="gia-dathang">
                                <p>
                                    <NumberFormat value={this.state.order.deliveryPrice} displayType={'text'} thousandSeparator={true}/>    
                                </p>
                            </div>
                        </div>
                        <div className="tong-tienhang">
                            <div className="txt-dathang">
                                <p>Tổng tiền hàng</p>
                            </div>
                            <div className="gia-dathang">
                                <NumberFormat value={this.state.order.totalPrice - this.state.order.deliveryPrice} displayType={'text'} thousandSeparator={true}/>
                            </div>
                        </div>
                        <div className="tong-tienhang">
                            <div className="txt-dathang">
                                <p> Tổng thanh toán</p>
                            </div>
                            <div className="gia-dathang">
                                <p className="gia-tong">
                                    <NumberFormat value={this.state.order.totalPrice} displayType={'text'} thousandSeparator={true}/>    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.order.statusName === "Chưa thanh toán" ?
                    <div className="action">
                        <button type="button" className="primary-btn" id="btnOk" style={{float: "right"}} href={"/orderdetail"} onClick={this.cancelOrder}>Huỷ đơn hàng</button>
                    </div> :
                    ""
                }
            </div>
        )
    }
}
export default Main;