import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class Product extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
  }
  handleActiveClick(event) {
    if (this.props.status.name === "Hoạt động") {
      MySwal.fire("Sản phẩm đang ở trạng thái hoạt động");
    } else {
      MySwal.fire({
        title: "Bạn muốn chuyển trạng thái này sang đã hoạt động?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý chuyển."
      }).then(result => {
        if (result.value) {
          const url =
            "https://localhost:44376/api/admin/ExtendedProducts/changeStatus";
          const options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                localStorage.getItem("authenticatedTokenAdmin").toString()
            },
            body: JSON.stringify({
              ProductId: this.props.productId,
              StatusId: "87577063-322E-4901-98D2-FF519341D992"
            }) // body data type must match "Content-Type" header
          };
          fetch(url, options)
            .then(res => {
              Swal.fire(
                "Chuyển trang thái thành công!",
                "Sản phẩm đã đưa vào hoạt động.",
                "success"
              );
              window.location.reload();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }
  handleDeleteClick(event) {
    MySwal.fire({
      title: "Bạn muốn xóa sản phẩm này?",
      text: "Sản phẩm này sẽ bị ẩn đi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý xóa."
    }).then(result => {
      if (result.value) {
        const url =
          "https://localhost:44376/api/admin/ExtendedProducts/changeStatus";
        const options = {
          method: "POST", // *GET, POST, PUT, DELETE, etc.

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("authenticatedTokenAdmin").toString()
          },
          body: JSON.stringify({
            ProductId: this.props.productId,
            StatusId: "1C55F3C2-D7ED-4B82-8F18-480062D092A1"
          }) // body data type must match "Content-Type" header
        };
        fetch(url, options)
          .then(res => {
            Swal.fire("Đã xóa!", "Sản phẩm đã bị xóa.", "success");
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
  renderCreatedDate = () => {
    let tempDate = new Date(this.props.createdDate);

    let dd =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let mm =
      tempDate.getMonth() + 1 < 10
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    let yyyy = tempDate.getFullYear();

    let fullDate = `${dd}-${mm}-${yyyy}`;
    return fullDate;
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.code}</td>
          <td>{this.props.name}</td>
          <td>{this.props.typeProduct.name}</td>
          <td>{this.props.discount}</td>
          <td>{this.props.detail}</td>
          <td>{this.renderCreatedDate()}</td>
          <td>{this.props.brand.name}</td>
          <td>{this.props.status.name}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target={"#modal" + this.props.productId}
            >
              Xem thêm
            </button>
          </td>
          <td>
            <button
              className="btn btn-success"
              onClick={this.handleActiveClick}
            >
              Hoạt động
            </button>
            <button className="btn btn-danger" onClick={this.handleDeleteClick}>
              Xóa
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Product;
