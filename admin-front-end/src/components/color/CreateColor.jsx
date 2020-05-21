import React, { Component } from "react";

class CreateColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      ColorValue: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorValueChange = this.handleColorValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  PushToColorPage = () => {
    window.location.href = "/color-page";
  };
  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }
  handleColorValueChange(event) {
    this.setState({ ColorValue: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const url = "https://localhost:44376/api/admin/colors";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      },
      body: JSON.stringify({
        Name: this.state.Name,
        ColorValue: this.state.ColorValue
      })
    };
    fetch(url, options).then(
      result => {
        if (result.status === 201) {
          alert("Tạo màu thành công!!!");
          this.PushToColorPage();
        } else if (result.status === 400) {
          alert("Màu đã tồn tại");
          this.PushToColorPage();
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
        id="modalCreateColor"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalCreateColorTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCreateColorTitle">
                Thêm màu
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
                    htmlFor="colorNameInput"
                    className="col-sm-4 col-form-label"
                  >
                    Tên màu
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="colorNameInput"
                      placeholder="Tên thương hiệu"
                      value={this.state.Name}
                      onChange={this.handleNameChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="colorValueInput"
                    className="col-sm-4 col-form-label"
                  >
                    Giá trị màu
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="color"
                      className="form-control"
                      id="colorValueInput"
                      placeholder="Giá trị màu"
                      required
                      onChange={this.handleColorValueChange}
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
                  <button type="submit" className="btn btn-success">
                    Tạo màu
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

export default CreateColor;
