import React from 'react';
import NumberFormat from "react-number-format";
class Main extends React.Component{
    state={
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

    checkPreviousUrl = () => {
        let url = document.referrer;
        let suffix = url.substring(url.lastIndexOf("/") + 1, url.length);
        
        if(suffix !== "pay") {
            window.location.href = "/";
        }
    }

    getOrderDetailAll = () => {
        let x= this.state.information.customerId;
        console.log(x);
        fetch(`https://localhost:44376/api/customer/order/getDetailOrder?idcustomer=${this.state.information.customerId}`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                orderdetail:res
            });
        })
        .catch(e=>{
            console.log(e);
        })
    }

    getAllOrders = () => {
        fetch(`https://localhost:44376/api/customer/order/getAllCustomerOrders?customerId=${this.state.information.customerId}`)
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
                // this.getOrderDetailAll()
                this.getAllOrders();
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    renderOrder = () => {
        // if(this.state.orderdetail!==null){
        //     const listItems = this.state.orderdetail.map((item, idx) =>
        //     <tbody>
        //         <tr key={idx}>
        //             <td>Mã đơn hàng: {item.orderId}</td>
        //             <td>Ngày mua: {item.createdDate}</td>
        //             <td>Tổng tiền: {item.totalPrice}</td>
        //             <td>Tình trạng: {item.statusName}</td>
        //         </tr>
        //         <tr>
        //             <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td>
        //             <td className="details">
        //                 <a href={"/product?id="+ item.productId}>{item.name}</a>
        //             </td>        
        //             <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
        //                 {/* <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td> */}
        //             <td className="qty text-center"><p id={"txt" + idx}>{item.quantity}</p></td>
                        
        //             <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
        //             <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100))*item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
        //         </tr>     
        //     </tbody>
                
        //     );
        //     return listItems;
        // }

        if(this.state.order !== null)
        {
            const listItems = this.state.order.map((item, idx) =>
                <tr key={idx}>
                    <td className="total"><a href={`/orderdetail?id=${item.orderId}`} style={{color: "#F8694A"}}>{item.orderId}</a></td>
                    <td className="total text-center">{this.renderCreatedDate(item.createdDate)}</td>
                    <td className="total text-center">{item.numberOfProducts === 1 ? item.firstProductName : item.firstProductName + ` và ${item.numberOfProducts - 1} sản phẩm khác`}</td>
                    <td className="total text-center"><NumberFormat value={item.totalPrice} displayType={'text'} thousandSeparator={true}/></td>
                    <td className="total text-center">{this.renderDeliveryDate(item.deliveryDate, item.statusName)}</td>
                    <td className="total text-center">{item.statusName}</td>
                    {/* <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td> */}
                        {/* <td className="details">
                            <a href={"/product?id="+ item.productId}>{item.name}</a>
                            <ul>
                                <li><span>Size: {item.sizeName}</span></li>
                                <li><span>Color: {item.colorName}</span></li>
                            </ul>
                        </td>
                        
                    <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
                    <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td>
                    
                    <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
                    <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100))*item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
                    <td className="text-right"><button className="main-btn icon-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-close"></i></button></td> */}
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
    
    componentDidMount=()=>{
        this.checkLoggedIn();
        //this.checkPreviousUrl(); 
        //this.getUserInformation();
        // this.getOrderDetailAll();
    }
    render(){
        return(
            // <div className="col-md-12">
            //     <div className="order-summary clearfix">
            //         <h3 className="title">Đơn hàng</h3>
            //     </div>
            //     <table className="shopping-cart-table table">
            //     {/* <thead>
            //         <tr>
            //             <th className="text-center">Mã đơn hàng</th>
            //             <th className="text-center">Ngày mua</th>
            //             <th className="text-center">Tổng tiền</th>
            //         </tr>
            //     </thead> */}
            //         {this.renderorder()}
            //         {/* {this.renderOrderDetail()} */}
            // </table>
            // </div>

            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div className="section-title">
						<h3 className="title">Đơn hàng</h3>
					</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID đơn hàng</th>
                                <th className="text-center">Ngày mua</th>
                                <th className="text-center">Sản phẩm</th>
                                <th className="text-center">Tổng tiền</th>
                                <th className="text-center">Ngày giao</th>
                                <th className="text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrder()}
                        </tbody>
                        <tfoot>
							{/* <tr>
								<th class="empty" colspan="3"></th>
								<th>SUBTOTAL</th>
								<th colspan="2" class="sub-total">$97.50</th>
							</tr>
							<tr>
								<th class="empty" colspan="3"></th>
								<th>SHIPING</th>
								<td colspan="2">Free Shipping</td>
							</tr> */}
						</tfoot>
                    </table>
                </div>
            </div>
        )
    }
}
export default Main;