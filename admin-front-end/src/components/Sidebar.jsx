import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ""
    };
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") !== null) {
      fetch("https://localhost:44376/api/admin/account/checkRole", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("authenticatedTokenAdmin").toString()
        }
      })
        .then(res => res.text())
        .then(res => {
          this.setState({ role: res });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  renderFunctionGuest = () => {};
  renderFunctionAdmin = () => {
    return (
      <React.Fragment>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Sản phẩm</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Product Function:</h6>
              <a className="collapse-item" href="product-page">
                Danh sách sản phẩm
              </a>
              <a className="collapse-item" href="create-product-page">
                Tạo sản phẩm mới
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/#"
            data-toggle="collapse"
            data-target="#collapseOrderSidebar"
            aria-expanded="true"
            aria-controls="collapseOrderSidebar"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Đơn hàng</span>
          </a>
          <div
            id="collapseOrderSidebar"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Tính năng:</h6>
              <a className="collapse-item" href="/order-page">
                Danh sách đơn hàng
              </a>
              {/* <a className="collapse-item" href="/#">
              Tạo đơn hàng
          </a> */}
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/#"
            data-toggle="collapse"
            data-target="#collapseAttProductSidebar"
            aria-expanded="true"
            aria-controls="collapseOrderSidebar"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Thuộc tính sản phẩm</span>
          </a>
          <div
            id="collapseAttProductSidebar"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Tính năng:</h6>
              <a className="collapse-item" href="/brand-page">
                Danh sách thương hiệu
              </a>
              <a className="collapse-item" href="/color-page">
                Danh sách màu
              </a>
              {/* <a className="collapse-item" href="/#">
              Tạo đơn hàng
          </a> */}
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  };
  renderFunctionNhapKho = () => {
    return (
      <React.Fragment>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Sản phẩm</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Product Function:</h6>
              <a className="collapse-item" href="product-page">
                Danh sách sản phẩm
              </a>
              <a className="collapse-item" href="create-product-page">
                Tạo sản phẩm mới
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/#"
            data-toggle="collapse"
            data-target="#collapseAttProductSidebar"
            aria-expanded="true"
            aria-controls="collapseOrderSidebar"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Thuộc tính sản phẩm</span>
          </a>
          <div
            id="collapseAttProductSidebar"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Tính năng:</h6>
              <a className="collapse-item" href="/brand-page">
                Danh sách thương hiệu
              </a>
              <a className="collapse-item" href="/color-page">
                Danh sách màu
              </a>
              {/* <a className="collapse-item" href="/#">
              Tạo đơn hàng
          </a> */}
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  };
  renderFunctionXuatKho = () => {
    return (
      <React.Fragment>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/#"
            data-toggle="collapse"
            data-target="#collapseOrderSidebar"
            aria-expanded="true"
            aria-controls="collapseOrderSidebar"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Đơn hàng</span>
          </a>
          <div
            id="collapseOrderSidebar"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Tính năng:</h6>
              <a className="collapse-item" href="/order-page">
                Danh sách đơn hàng
              </a>
              {/* <a className="collapse-item" href="/#">
              Tạo đơn hàng
          </a> */}
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  };
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Home</span>
          </a>
        </li>
        {this.state.role === "Quản trị viên"
          ? this.renderFunctionAdmin()
          : this.renderFunctionGuest()}
        {this.state.role === "Nhân viên xuất kho"
          ? this.renderFunctionXuatKho()
          : this.renderFunctionGuest()}
        {this.state.role === "Nhân viên nhập kho"
          ? this.renderFunctionNhapKho()
          : this.renderFunctionGuest()}
        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">Quản lý</div>
      </ul>
    );
  }
}

export default Sidebar;
