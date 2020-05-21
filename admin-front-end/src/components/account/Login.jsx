import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") !== null) {
      window.location.href = "/";
    }
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    fetch("https://localhost:44376/api/admin/account/authenticateAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res === "") {
          MySwal.fire({
            title: "Thông báo",
            width: 300,
            padding: "2em",
            html:
              "<img src='/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Sai thông tin tài khoản</p>"
          });
        } else {
          localStorage.setItem("authenticatedTokenAdmin", res);
          window.location.href = "/";
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form onSubmit={this.handleSubmit} className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="inputUserName"
                            placeholder="Enter User Name..."
                            required
                            onChange={this.handleUsernameChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            required
                            onChange={this.handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                        <hr />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
