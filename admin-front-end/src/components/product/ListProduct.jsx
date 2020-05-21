import React, { Component } from "react";
import Product from "./Product";
import ListProductColor from "./ListProductColor";
import "./dataTables.bootstrap4.min.css";
class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      isLoaded: false
    };
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  PushTo404Page = () => {
    window.location.href = "/not-found";
  };

  componentDidMount() {
    const urlGender = "https://localhost:44376/api/admin/extendedproducts";
    const optionsGender = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(urlGender, optionsGender)
      .then(res => res.json())
      .then(
        result => {
          if (result.status !== 404) {
            this.setState({
              listProduct: [...result],
              isLoaded: true
            });
          } else {
            console.log("Something wrong when get products");
            this.PushTo404Page();
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log("Server interupt");
          this.PushToServerPage();
        }
      );
    const scriptBootstrapDatatable = document.createElement("script");
    const scriptDemoDatatable = document.createElement("script");

    scriptBootstrapDatatable.src =
      "/vendor/datatables/dataTables.bootstrap4.min.js";
    scriptDemoDatatable.src = "/js/demo/datatables-demo.js";

    document.body.appendChild(scriptBootstrapDatatable);

    setTimeout(function() {
      document.body.appendChild(scriptDemoDatatable);
    }, 4000);
  }
  render() {
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>
        <p className="mb-4">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the{" "}
          <a target="_blank" href="https://datatables.net">
            official DataTables documentation
          </a>
          .
        </p>

        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">List Products</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên</th>
                    <th>Loại sản phẩm</th>
                    <th>Giảm giá</th>
                    <th>Chi tiết</th>
                    <th>Ngày tạo</th>
                    <th>Nhãn hiệu</th>
                    <th>Trạng thái</th>
                    <th>Chủng loại</th>
                    <th>Đổi trạng thái</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên</th>
                    <th>Loại sản phẩm</th>
                    <th>Giảm giá</th>
                    <th>Chi tiết</th>
                    <th>Ngày tạo</th>
                    <th>Nhãn hiệu</th>
                    <th>Trạng thái</th>
                    <th>Chủng loại</th>
                    <th>Đổi trạng thái</th>
                  </tr>
                </tfoot>
                <tbody>
                  {this.state.listProduct.map(product => (
                    <Product
                      key={product.productId}
                      productId={product.productId}
                      code={product.code}
                      name={product.name}
                      typeProduct={product.typeProduct}
                      discount={product.discount}
                      detail={product.detail}
                      createdDate={product.createdDate}
                      brand={product.brand}
                      status={product.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.listProduct.map((product, index) => (
          <ListProductColor
            key={index}
            productId={product.productId}
            productName={product.name}
            listProductColor={product.listProductColor}
          />
        ))}
      </div>
    );
  }
}

export default ListProduct;
