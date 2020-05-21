import React from 'react';
import './style.css';
import Swal from 'sweetalert2';
import NumberFormat from "react-number-format";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

class Main extends React.Component{
    state={
        token:'',
        //isLoggedIn: false,
        information:[],
        customerId:'00000000-0000-0000-0000-000000000000',
        cart:[],
        fee:0,
        totalState:0,
        totalprice:0,
        contactPhone:"",
        deliveryName:"",
        deliveryEmail:"",
        deliveryAddress:""

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
        
        if(suffix !== "delivery") {
            window.location.href = "/";
        }
    }

    getUserInformation = () => {
        // fetch('https://localhost:44376/api/customer/account/validateToken', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + this.state.token
        //     },
        //     body: JSON.stringify({
        //         tokenId: this.state.token
        //     })
        // })
        // .then(res => res.json())
        // .then(res => {
        //     this.setState({
        //         information: res
        //     });
        // })
        // .catch(error =>{
        //     console.log(error)
        // })
        let information = JSON.parse(localStorage.getItem("information"));

        this.setState({
            information: information
        })
    }

    getFee=()=>{
        fetch(`https://localhost:44376/api/customer/delivery/getFee?districtId=${localStorage.getItem("district")}&numberOfProduct=10`)
        .then(res =>res.json())
        .then(res=>{
            // console.log(res.totalFee);
            this.setState({
                fee:res.totalFee
            });
        })
        .catch(error=>{
            console.log(error);
        })
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

    getQuantity=()=>{
        if(this.state.cart !== null)
        {
            let sl=0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                sl += item.quantity;
            })
            return sl;
        }
        
    }

    onSave = () => {
        //Kiểm tra nếu đủ số lượng
        fetch(`https://localhost:44376/api/customer/product/checkProductQuantity?carts=${localStorage.getItem("cart")}`)
        .then(res => res.json())
        .then(
            (res) => {
                let tempCart = [];
                let resCart = res;

                resCart.forEach(item => {
                    if(item.quantity === -1) {
                        tempCart.push(item);
                    }
                })

                tempCart.forEach(item => {
                    let cart = this.state.cart;

                    let found = cart.find(ele => ele.colorId === item.colorId && ele.productId === item.productId && ele.sizeId === item.sizeId);
                    item.name = found.name;
                })

                if(tempCart.length !== 0) {
                    let html = "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>";

                    tempCart.forEach(item => {
                        html += "<b>" + item.name + "</b><br />"
                    })

                    html += "<br />Những sản phẩm này không đủ số lượng. Xin vui lòng kiểm tra lại</p>";

                    MySwal.fire({
                        title: 'Thông báo',
                        width: 300,
                        padding: '2em',
                        html: html
                    })
                } else {
                    //
                    // this.state.cart = this.state.cart.map(ele => ele.price = (ele.price - (ele.price * (ele.discount === null || ele.discount === 0 ? 0 : ele.discount) / 100)) * ele.quantity)
                    let cart = this.state.cart;
                    console.log("CART")
                    console.log(this.state.cart);
                    cart.forEach(ele => {
                        let cart = this.state.cart;
    
                        // let found = cart.find(ele => ele.colorId === item.colorId && ele.productId === item.productId && ele.sizeId === item.sizeId);
                        // item.name = found.name;
                        ele.price = ele.discount === null || ele.discount === 0 ? ele.price * ele.quantity : (ele.price - (ele.price / 100 * ele.discount)) * ele.quantity;
                        // ele.price = ele.price - (ele.price * (ele.discount === null || ele.discount === 0 ? 0 : ele.discount) / 100) * ele.quantity;
                    })
                    //Đi tiếp
                    fetch(`https://localhost:44376/api/customer/order/createOrder`,{
                        method:'POST',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            customerId:this.state.information.customerId,
                            totalprice:localStorage.getItem("totalState"),
                            contactPhone: this.state.information.phone,
                            deliveryName: this.state.information.name,
                            deliveryEmail:this.state.information.email,
                            deliveryAddress:this.state.information.address,
                            deliveryPrice: this.state.fee,
                            OrderProductSize: cart
                        })
                    })
                    .then(res=>{
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            icon: 'success',
                            html: "<p style='font-size: 15px'>Đặt hàng thành công</p>"
                        }).then((res) => {
                            localStorage.removeItem("cart");
                            localStorage.removeItem("information");
                            localStorage.removeItem("district");
                            localStorage.removeItem("totalState");

                            window.location.href = "/orderdetail"; 
                        });
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                }
            },
            (err) => {
                console.log(err);
            }
        )
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
                    {/* <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td> */}
                    <td className="qty text-center"><p id={"txt" + idx}>{item.quantity}</p></td>
                    
                    <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
                    <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100)) * item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
                    {/* <td className="text-right"><button className="main-btn icon-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-close"></i></button></td> */}
                </tr>
            );

            return listItems;
        }
    }

    renderInformation = () => {
        let address = this.state.information.address;
        if(address !== undefined) {
            address = address.replace(" PX.", ", Phường xã ");
            address = address.replace(" QH.", ", Quận huyện ");
            address = address.replace(" TT.", ", ");
    
            return  <h4> 
                        {this.state.information.name}: {address}
                    </h4> 
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
            this.setState.totalprice=totalPrice;
            return <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    rendertotal = () => {
        if(this.state.cart !== null)
        {
            let total = 0;
            let fee= this.state.fee;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                // total += item.price * item.quantity;
                total += item.discount === null ? item.price * item.quantity : (item.price - (item.price * item.discount / 100)) * item.quantity;
            })
            total=total+fee;
            localStorage.setItem("totalState",total);
            return <NumberFormat value={total} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    renderFee=()=>{
        let fee = 0;
        fee = this.state.fee;
        return <NumberFormat value={fee} displayType={'text'} thousandSeparator={true}/>;
    }


    // rendertotal=()=>{
    //     let total=0;
    //     let fee=0;
    //     fee= this.state.fee;
    //     let tmp=0;
    //     tmp=totalprice;
    //     total= tmp+fee;
    //     return <NumberFormat value={total} displayType={'text'} thousandSeparator={true}/>;
    // }


    // renderInfomartion=()=>{
    //     if(this.state.information!==null)
    // }

    // getSizeName=()=>{
    //     fetch(`https://localhost:44376/api/customer/size/getSizebyId?sizeId=${this.state.sizeId}`)
    //     .then(res=>res.json())
    //     .then(
    //         (res=>{
    //             this.setState({
    //                 namesize:res
    //             });
    //         },
    //         (err)=>{
    //             console.log(err);
    //         }
    //         )
    //     )
    // }

    componentDidMount = () => {
        this.checkLoggedIn();
        this.getAllProducts();
        this.getQuantity();
        this.getFee();

    }

    render() {
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div className="section-dc">
                        <i className="fa fa-map-marker"></i> &nbsp;
                        <span className="dc">Địa chỉ giao hàng</span> &nbsp; <a href={'/delivery'}>Thay đổi</a>
                    </div>
                    <div className="content-address">
                        {this.renderInformation()}
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                    </table>
                    <div className="form-chuthich">
                        <div className="form-padding">
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p>Phí vận chuyển</p>
                                </div>
                                <div className="gia-dathang">
                                    <p>
                                        ₫{this.renderFee()}
                                    </p>
                                </div>
                            </div>
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p>Tổng tiền hàng</p>
                                </div>
                                <div className="gia-dathang">
                                    <p>₫{this.renderTotalPrice()}</p>
                                </div>
                            </div>
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p> Tổng thanh toán</p>
                                </div>
                                <div className="gia-dathang">
                                    <p className="gia-tong">
                                        ₫{this.rendertotal()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="action">
                    <button type="button" className="primary-btn" id="btnOk" onClick={this.onSave} style={{float: "right"}} href={"/orderdetail"}>Đặt hàng</button>
                    </div>
                </div>
            </div>
            

        )
    }
}
export default Main;