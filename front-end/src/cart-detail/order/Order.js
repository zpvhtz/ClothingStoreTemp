import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class Order extends React.Component{
    state={
        cart:[],
        sizeId:'00000000-0000-0000-0000-000000000000',
        colorId:'00000000-0000-0000-0000-000000000000',
        namesize:'',
        namecolor:'',
        isLoggedIn: false,
        token: ''
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            });
        }
    }

    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
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
                    <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td>
                    
                    <td className="total text-center">{item.discount === null ? 0 : item.discount}%</td>
                    <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100)) * item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
                    <td className="text-right"><button className="main-btn icon-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-close"></i></button></td>
                </tr>
            );

            return listItems;
        }
    }

    renderTotalPrice = () => {
        if(this.state.cart !== null)
        {
            let totalPrice = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                // totalPrice += item.price * item.quantity;
                totalPrice += item.discount === null ? item.price * item.quantity : (item.price - (item.price * item.discount / 100)) * item.quantity;
            })

            return <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    renderTotalProducts = () => {
        if(this.state.cart !== null)
        {
            let totalProducts = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                totalProducts += item.quantity;
            })

            return totalProducts;
        }
    }

    getAllProducts = () => {
        fetch(`https://localhost:44376/api/customer/product/getProductsForCart?carts=${localStorage.getItem("cart")}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    cart: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    getSizeName=()=>{
        fetch(`https://localhost:44376/api/customer/size/getSizebyId?sizeId=${this.state.sizeId}`)
        .then(res=>res.json())
        .then(
            (res=>{
                this.setState({
                    namesize:res
                });
            },
            (err)=>{
                console.log(err);
            }
            )
        )
    }

    changeQuantity = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let number = id.substr(3, id.length - 3);

        if(value > 0) {
            let list = JSON.parse(localStorage.getItem("cart")) == null ? [] : JSON.parse(localStorage.getItem("cart"));
            if(list !== []) {
                list[number].quantity = value;
                localStorage.setItem("cart", JSON.stringify(list));

                //setState
                let cart = this.state.cart;
                cart[number].quantity = value;
                this.setState({
                    cart: cart
                })
            }
        }
    }

    deleteProduct = (e) => {
        let id = e.target.id;
        let number = id.substr(3, id.length - 3);

        let list = JSON.parse(localStorage.getItem("cart")) == null ? [] : JSON.parse(localStorage.getItem("cart"));
        if(list !== []) {
            list.splice(number, 1);
            localStorage.setItem("cart", JSON.stringify(list));
            window.location.reload();
        }
    }

    checkOut = () => {
        if(this.state.isLoggedIn === false) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng đăng nhập để thanh toán</p>"
            });
        } else {
            window.location.href = "/delivery";
        }
    }

    componentDidMount = () => {
        this.checkLoggedIn();
        this.getAllProducts();
    }


    render(){
        const cart = this.state.cart;

        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div className="section-title">
						<h3 className="title">Chi tiết giỏ hàng</h3>
					</div>
                    <table className="shopping-cart-table table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th></th>
                                <th className="text-center">Đơn giá</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giảm giá</th>
                                <th className="text-center">Thành tiền</th>
								<th className="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
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
							<tr>
								<th className="empty" colSpan="4"></th>
								<th>Tổng tiền</th>
								<th colSpan="2" className="total">{this.renderTotalPrice()}</th>
							</tr>
						</tfoot>
                    </table>
                    <div className="pull-right">
						{ cart.length === 0 ? <button className="primary-btn" disabled style={{backgroundColor: "grey"}}>Thanh toán</button> : <button className="primary-btn" onClick={this.checkOut}>Thanh toán</button> }
					</div>
                </div>
            </div>
        )
    }
}
export default Order;