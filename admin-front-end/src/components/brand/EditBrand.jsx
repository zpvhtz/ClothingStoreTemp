import React, { Component } from "react";
class EditBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BrandId: "",
      Name: "",
      CompanyName: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  PushToBrandPage = () => {
    window.location.href = "/brand-page";
  };
  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }
  handleCompanyNameChange(event) {
    this.setState({ CompanyName: event.target.value });
  }
  componentDidUpdate(prevProps) {
    if (this.props.BrandId !== prevProps.BrandId) {
      this.setState({
        BrandId: this.props.BrandId,
        Name: this.props.Name,
        CompanyName: this.props.CompanyName
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const url =
      "https://localhost:44376/api/admin/brands/" + this.state.BrandId;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      },
      body: JSON.stringify({
        BrandId: this.state.BrandId,
        Name: this.state.Name,
        CompanyName: this.state.CompanyName
      })
    };
    fetch(url, options).then(
      result => {
        if (result.status === 204) {
          alert("SỬa thương hiệu thành công!!!");
          this.PushToBrandPage();
        } else if (result.status === 404) {
          alert("Thương hiệu không tìm thấy???");
          this.PushToBrandPage();
        } else if (result.status === 400) {
          alert("Lỗi khi sửa thương hiệu, xin chọn thương hiệu khác");
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
  render() {
    return (
      <div
        className="modal fade"
        id="modalEditBrand"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalEditBrandTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEditBrandTitle">
                Sửa thương hiệu
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label
                    htmlFor="brandNameInput"
                    className="col-sm-4 col-form-label"
                  >
                    Tên thương hiệu
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="brandNameInput"
                      placeholder="Tên thương hiệu"
                      value={this.state.Name}
                      onChange={this.handleNameChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="companyBrandInput"
                    className="col-sm-4 col-form-label"
                  >
                    Thuộc công ty
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="companyBrandInput"
                      placeholder="Thuộc công ty"
                      required
                      value={this.state.CompanyName}
                      onChange={this.handleCompanyNameChange}
                    />
                  </div>
                </div>
                <div className="form-group-row">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Sửa thương hiệu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBrand;
