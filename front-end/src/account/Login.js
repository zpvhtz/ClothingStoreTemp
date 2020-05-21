import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// eslint-disable-next-line no-unused-vars
import { base, firebaseApp } from '../base';
import firebase from "firebase";
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// eslint-disable-next-line no-unused-vars
import { getDefaultWatermarks } from 'istanbul-lib-report';
const MySwal = withReactContent(Swal)
  
class Login extends React.Component{
    state = {
        token: '',
        isLoggedIn: false,
        fullName: '',
        email: '',
        id: ''
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            });
            
            this.props.history.push('/');
        }
    }

    checkExisted = (username) => {
        //check account availability
        let accountAvailability = false;
        fetch(`https://localhost:44376/api/customer/account/checkAvailability?username=${username}`)
        .then(res => res.json())
        .then(res => {
            accountAvailability = res;
        }).then(() => {
            if(accountAvailability === false) {
                fetch('https://localhost:44376/api/customer/account/authenticateAccount', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Username: this.state.id,
                        Password: this.state.id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res === "") {
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Sai thông tin tài khoản</p>"
                        })
                    }
                    else {
                        localStorage.setItem("authenticatedToken", res);
                        this.props.history.push("/");
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
            }
            else {
                this.createAccount();
            }
        })
        .catch(error =>{
            console.log(error)
        });
    }

    checkInformation = () => {
        fetch(`https://localhost:44376/api/customer/customer/getCustomerByAccountId?accountId=${localStorage.getItem('id')}`)
        .then(res => res.text())
        .then(res => {
            if(res === "") {
                this.props.history.push("/information");
            }
            else {
                this.props.history.push("/home");
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    createAccount = () => {
        let date = new Date();
        date = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

        fetch('https://localhost:44376/api/customer/account/createCustomerAccountAndCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.id,
                password: this.state.id,
                name: this.state.fullName,
                genderId: '00000000-0000-0000-0000-000000000000',
                birthday: date,
                address: '',
                email: this.state.email === "" ? '' : this.state.email,
                phone: ''
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === true) {
                fetch('https://localhost:44376/api/customer/account/authenticateAccount', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Username: this.state.id,
                        Password: this.state.id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res === "") {
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Sai thông tin tài khoản</p>"
                        })
                    }
                    else {
                        localStorage.setItem("authenticatedToken", res);
                        this.props.history.push("/");
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
            } else {
                console.log(`Error: ${res}`);
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();

        switch(provider) {
            case "Facebook":
                firebaseApp.auth()
                .signInWithPopup(authProvider)
                .then(this.authHandlerFacebook);
                break;
            case "Google":
                firebaseApp.auth()
                .signInWithPopup(authProvider)
                .then(this.authHandlerGoogle);
                break;
            default:
                console.log(`Error: Login with ${provider}`);
                break;
        }
    };
     
    //  # xử lý sau khi xác thực
    authHandlerGoogle = async (authData) => {
        let fullName = authData.additionalUserInfo.profile.name;
        let email = authData.user.email;
        let id = authData.additionalUserInfo.profile.id;
        this.setState({
            fullName: fullName,
            email: email,
            id: id
        }, () => {
            this.checkExisted(id);
        });
    };

    //  # xử lý sau khi xác thực
    authHandlerFacebook = async (authData) => {
        let fullName = authData.additionalUserInfo.profile.name;
        let id = authData.additionalUserInfo.profile.id;
        this.setState({
            fullName: fullName,
            id: id
        }, () => {
            this.checkExisted(id);
        });
    };

    validateInput() {
        let username = window.$("#username").val();
        let password = window.$("#password").val();
        
        //check blank
        if(username === "") {
            document.getElementById("username").setCustomValidity("Vui lòng nhập vào tên tài khoản!");
            return;
        }
        document.getElementById("username").setCustomValidity("");

        if(password === "") {
            document.getElementById("password").setCustomValidity("Vui lòng nhập vào mật khẩu!");
            return;
        }
        document.getElementById("password").setCustomValidity("");
    }

    handleSubmit = (event) => { 
        event.preventDefault();

        //check usernamee validity
        let usernameValidity = this.checkUsernameValidity(window.$("#username").val());
        if(usernameValidity === false) {
            return;
        }

        //check password validity
        let passwordValidity = this.checkPasswordValidity(window.$("#password").val());
        if(passwordValidity === false) {
            return;
        }
        
        fetch('https://localhost:44376/api/customer/account/authenticateAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.refs.username.value,
                Password: this.refs.password.value
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === "") {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Sai thông tin tài khoản</p>"
                })
            }
            else {
                localStorage.setItem("authenticatedToken", res);
                this.props.history.push("/");
            }
        })
        .catch(error =>{
            console.log(error)
        })
    };

    checkUsernameValidity = (username) => {
        if(username.includes(" ")) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Tài khoản không được có khoảng trắng</p>"
            })
            return false;
        }
        else {
            let usernameLength = username.length;

            if(usernameLength < 6) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Độ dài tài khoản phải từ 6 ký tự/</p>"
                })
                return false;
            }
            else {
                return true;
            }
        }
    }

    checkPasswordValidity = (password) => {
        let passwordLength = password.length;
        
        if(passwordLength < 6) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Độ dài mật khẩu phải từ 6 ký tự</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    snowEffect = () => {
        let items = [];

        for(let i = 0; i < 10; i++) {
            items.push(<div className='snowflake' key={i}>❆</div>);
        }

        return items;
    }

    componentDidMount() {
        this.checkLoggedIn();
    }      

    render()
    {
        return(
            <div className="register">
                { this.snowEffect() }
                <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
                <div className="wrapper wrapper--w780">
                    <div className="card card-3">
                        <div className="card-heading">
                            <a href="/"><img src="./assets/img/logo.png" alt="logo.png"></img></a>
                        </div>
                            <div className="card-body">
                                <h2 className="title"><center>Đăng nhập</center></h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Tài khoản" id="username" name="Username" ref="username"/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="password" placeholder="Mật khẩu" id="password" name="Password" ref="password"/>
                                    </div>
                                    <div className="input-group" style={{ width: "60px", height: "20px" }}>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a onClick={() => this.authenticate("Facebook")}><FontAwesomeIcon size="lg" icon={['fab', 'facebook']}></FontAwesomeIcon></a>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a onClick={() => this.authenticate("Google")}><FontAwesomeIcon size="lg" icon={['fab', 'google']}></FontAwesomeIcon></a>
                                    </div>
                                    <div className="input-group">
                                        <p style={{fontStyle: "italic"}}><span style={{color: "#ccc"}}>Chưa có tài khoản? Nhấn vào </span><a href="/register"><span style={{fontWeight: "bold"}}>đây</span></a></p>
                                    </div>
                                    <div className="p-t-10">
                                        <center>
                                            <button className="btn btn--pill btn--green" type="submit" onClick={this.validateInput}>Đăng nhập</button>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;