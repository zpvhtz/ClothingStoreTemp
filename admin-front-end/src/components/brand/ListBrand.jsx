import React, { Component } from "react";
import Brand from "./Brand";
import CreateBrand from "./CreateBrand";
import EditBrand from "./EditBrand";
class ListBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: { BrandId: "", Name: "", CompanyName: "" },
      listBrand: []
    };
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  PushTo404Page = () => {
    window.location.href = "/not-found";
  };
  PushToBrandPage = () => {
    window.location.href = "/brand-page";
  };
  onClickEdit(BrandId = "") {
    if (BrandId !== "") {
      const brand = this.state.listBrand.find(function(brand) {
        return brand.brandId === BrandId;
      });
      this.setState({ brand: { ...brand } });
    }
  }
  onClickDelete(BrandId = "") {
    if (BrandId !== "") {
      var confirmDelete = window.confirm(
        "Bạn chắc chắn muốn xóa thương hiệu này?"
      );
      if (confirmDelete) {
        const url = "https://localhost:44376/api/admin/brands/" + BrandId;
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("authenticatedTokenAdmin").toString()
          }
        };
        fetch(url, options).then(
          result => {
            if (result.status === 200) {
              alert("Xóa thương hiệu thành công!!!");
              this.PushToBrandPage();
            } else if (result.status === 404) {
              alert("Thương hiệu không tìm thấy???");
              this.PushToBrandPage();
            } else if (result.status === 400) {
              alert("Lỗi khi sửa thương hiệu");
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            alert("Server Interupts");
            this.PushToServerPage();
          }
        );
      }
    }
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  async componentDidMount() {
    const url = "https://localhost:44376/api/admin/brands";
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(
        result => {
          if (result.length > 0) {
            this.setState({
              listBrand: [...result]
            });
          } else {
            alert("Không có thương hiệu nào trong database");
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          alert("Lỗi server");
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
    }, 2000);
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
            <h6 className="m-0 font-weight-bold text-primary">List Brands</h6>
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
                    <th>Mã thương hiệu</th>
                    <th>Tên thương hiệu</th>
                    <th>Thuộc công ty</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Mã thương hiệu</th>
                    <th>Tên thương hiệu</th>
                    <th>Thuộc công ty</th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {this.state.listBrand.map(brand => (
                    <Brand
                      key={brand.brandId}
                      brandId={brand.brandId}
                      name={brand.name}
                      companyName={brand.companyName}
                      onClickEdit={() => this.onClickEdit(brand.brandId)}
                      onClickDelete={() => this.onClickDelete(brand.brandId)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#modalCreateBrand"
            >
              Tạo thương hiệu mới
            </button>
          </div>
        </div>
        <CreateBrand />
        <EditBrand
          BrandId={this.state.brand.brandId}
          Name={this.state.brand.name}
          CompanyName={this.state.brand.companyName}
        />
      </div>
    );
  }
}

export default ListBrand;
