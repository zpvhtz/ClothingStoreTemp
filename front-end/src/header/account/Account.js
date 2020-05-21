import React from 'react';
import NumberFormat from 'react-number-format';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class Account extends React.Component {
    state = {
        cart: [],
        isLoggedIn: false,
        token: '',
        information: [],
        space: ''
    }

    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
                <div className="product product-widget" key={idx} style={{marginBottom: "35px"}}>
                    <div className="product-thumb">
                        <img src={"https://localhost:44376/" + item.imageUrl} alt="" />
                    </div>
                    <div className="product-body">
                        {/* <h3 className="product-price">{item.price}  */}
                        { 
                            item.discount === null ?
                            <h3 className="product-price">
                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/>
                                <span className="qty"> x{item.quantity}</span>
                            </h3> :
                            <h3 className="product-price">
                                <NumberFormat value={item.price - (item.price * item.discount / 100)} displayType={'text'} thousandSeparator={true}/>&nbsp;
                                <del className="product-old-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></del>
                                <span className="qty"> x{item.quantity}</span>
                            </h3>
                        }
                        
                        <h2 className="product-name"><a href={"/product?id=" + item.productId}>{item.name}</a></h2>
                    </div>
                    <button className="cancel-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-trash"></i></button>
                </div>
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

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation();
            });
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
                this.checkBlankInformation();
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    checkBlankInformation = () => {
        let phone = this.state.information.phone;
        let address = this.state.information.address;
        let email = this.state.information.email;

        if(phone === "blank" || address === "blank" || email === "blank") {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng cập nhật thông tin tài khoản</p>"
            }).then((res) => {
                window.location.href = "/information"; 
            });
        }
    }

    changePassword = () => {
        Swal.fire({
            title: 'Thay đổi mật khẩu',
            width: 300,
            padding: '2em',
            html: '<img src="./assets/img/lock.gif" style="width: 250px"/><p style="font-size: 15px">' +
                  '<input type="password" placeholder="Mật khẩu cũ" id="oldPassword" name="oldPassword" ref="oldPassword" class="swal2-input">' +
                  '<input type="password" placeholder="Mật khẩu mới" id="newPassword" name="newPassword" ref="newPassword" class="swal2-input">' +
                  '<input type="password" placeholder="Nhập lại mật khẩu mới" id="confirmNewPassword" name="confirmNewPassword" ref="confirmNewPassword" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: 'Thay đổi mật khẩu',
            cancelButtonText: 'Huỷ',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let validateInput = this.validateInput();
                if (validateInput === false) {
                    Swal.showValidationMessage(`Độ dài mật khẩu phải từ 6 ký tự`);
                }
                else {
                    let checkSamePassword = this.checkSamePassword();
                    if (checkSamePassword === false) {
                        Swal.showValidationMessage(`Mật khẩu mới không trùng nhau`);
                    }
                    else {
                        let checkDuplicatedPassword = this.checkDuplicatedPassword();
                        if (checkDuplicatedPassword === false) {
                            Swal.showValidationMessage(`Mật khẩu mới không được trùng cũ`);
                        }
                        else {
                            fetch('https://localhost:44376/api/customer/account/checkOldPasswordByAccountId', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + this.state.token
                                },
                                body: JSON.stringify({
                                    AccountId: this.state.information.accountId,
                                    Password: window.$("#oldPassword").val()
                                })
                            })
                            .then(res => res.json())
                            .then(res => {
                                if(res === false) {
                                    MySwal.fire({
                                        title: 'Thông báo',
                                        width: 300,
                                        padding: '2em',
                                        html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Mật khẩu cũ được nhập không chính xác</p>"
                                    })
                                }
                                else {
                                    fetch('https://localhost:44376/api/customer/account/changePasswordByAccountId', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + this.state.token
                                        },
                                        body: JSON.stringify({
                                            AccountId: this.state.information.accountId,
                                            Password: window.$("#newPassword").val()
                                        })
                                    })
                                    .then(res => res.json())
                                    .then(res => {
                                        if(res === false) {
                                            MySwal.fire({
                                                title: 'Thông báo',
                                                width: 300,
                                                padding: '2em',
                                                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Lỗi</p>"
                                            })
                                        }
                                        else {
                                            MySwal.fire({
                                                title: 'Thông báo',
                                                width: 300,
                                                padding: '2em',
                                                icon: 'success',
                                                html: "<p style='font-size: 15px'>Đổi mật khẩu thành công</p>"
                                            }).then((res) => {
                                               window.location.reload(); 
                                            });
                                        }
                                    })
                                    .catch(error =>{
                                        console.log(error)
                                    })
                                }
                            })
                            .catch(error =>{
                                console.log(error)
                            })
                        }
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    validateInput = () => {
        let oldPassword = window.$("#oldPassword").val();
        let newPassword = window.$("#newPassword").val();
        let confirmNewPassword = window.$("#confirmNewPassword").val();

        if(oldPassword.length >= 6 && newPassword.length >= 6 && confirmNewPassword.length >= 6) {
            return true;
        }
        else {
            return false;
        }
    }

    checkSamePassword = () => {
        let newPassword = window.$("#newPassword").val();
        let confirmNewPassword = window.$("#confirmNewPassword").val();
        
        if(newPassword === confirmNewPassword) {
            return true;
        }
        else {
            return false;
        }
    }

    checkDuplicatedPassword = () => {
        let oldPassword = window.$("#oldPassword").val();
        let newPassword = window.$("#newPassword").val();

        if(newPassword === oldPassword) {
            return false;
        }
        else {
            return true;
        }
    }

    logout = () => {
        localStorage.removeItem("authenticatedToken");
        window.location.reload();
    }

    componentDidMount = () => {
        this.getAllProducts();
        this.checkLoggedIn();
    }

    render() {
        const information = this.state.information;

        return (
            <div className="pull-right">
                <ul className="header-btns">
                    {/* <!-- Account --> */}
                    <li className="header-account dropdown default-dropdown">
                        <div className="dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="true">
                            <div className="header-btns-icon">
                                { information.length !== 0 ? <img src="/assets/img/user.png" style={{width: "100%"}} alt="user.png" /> : <i className="fa fa-user-o"></i>}
                            </div>
                            <strong className="text-uppercase">{ information.length !== 0 ? information.name : "Tài khoản" } <i className="fa fa-caret-down"></i></strong>
                        </div>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        { information.length !== 0 ?  <a className="text-uppercase">Xin chào</a> :  <a href="/login" className="text-uppercase">Đăng nhập</a>}
                        <ul className="custom-menu">
                            { information.length !== 0 ?  '' :  <li><a href="/register"><i className="fa fa-user-plus"></i> Đăng ký</a></li>}
                            { information.length !== 0 ?  <li><a href="/information"><i className="fa fa-user"></i> Thông tin</a></li> :  ''}
                            { information.length !== 0 ?  <li><a href="/order"><i className="fa fa-shopping-bag"></i> Đơn hàng</a></li> :  ''}
                            { information.length !== 0 ?  <li><a href="/#" onClick={this.changePassword}><i className="fa fa-unlock-alt"></i> Thay đổi mật khẩu</a></li> :  ''}
                            <li><a href="/cartdetail"><i className="fa fa-check"></i> Thanh toán</a></li>
                            { information.length !== 0 ?  <li><a href="/#" onClick={this.logout}><i className="fa fa-sign-out"></i> Đăng xuất</a></li> :  ''}
                        </ul>
                        
                    </li>
                    {/* <!-- /Account --> */}

                    {/* <!-- Cart --> */}
                    <li className="header-cart dropdown default-dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">
                            <div className="header-btns-icon">
                                <i className="fa fa-shopping-cart"></i>
                                <span className="qty">{this.renderTotalProducts()}</span>
                            </div>
                            <strong className="text-uppercase">Giỏ hàng</strong>
                            <br />
                            <span>{this.renderTotalPrice()}</span>
                        </a>
                        <div className="custom-menu">
                            <div id="shopping-cart">
                                {this.renderCart()}
                                <div className="shopping-cart-btns">
                                    <Link to={"/cartdetail"}>
                                        <button className="primary-btn">Thanh toán <i className="fa fa-arrow-circle-right"></i></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* <!-- /Cart --> */}

                    {/* <!-- Mobile nav toggle--> */}
                    <li className="nav-toggle">
                        <button className="nav-toggle-btn main-btn icon-btn"><i className="fa fa-bars"></i></button>
                    </li>
                    {/* <!-- / Mobile nav toggle --> */}
                </ul>
            </div>
        )
    }
}

export default Account;