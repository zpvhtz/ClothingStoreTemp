import React, { Component } from "react";
import ProductColor from "./ProductColor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeProducts: [],
      brands: [],
      statuses: [],
      sizes: [],
      typeSizes: [],
      typeSizeId: "",
      colors: [],
      productSize: {
        size: {
          sizeId: "",
          name: ""
        },
        inventoryQuantity: ""
      },
      productColor: {
        color: {
          colorId: "",
          colorValue: "",
          name: ""
        },
        imageUrl: "",
        imageData: "",
        listProductSize: []
      },
      extendedProduct: {
        code: "",
        name: "",
        typeProduct: {
          typeProductId: "",
          name: ""
        },
        price: "",
        detail: "",
        discount: "",
        brand: {
          brandId: "",
          name: ""
        },
        status: {
          statusId: "",
          name: ""
        },
        listProductColor: []
      }
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeProductChange = this.handleTypeProductChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleTypeSizeChange = this.handleTypeSizeChange.bind(this);
    this.handleInventoryQuantityChange = this.handleInventoryQuantityChange.bind(
      this
    );
    this.handleImageDataChange = this.handleImageDataChange.bind(this);
    this.handleSubmitProduct = this.handleSubmitProduct.bind(this);
    this.handleSubmitModalProductSize = this.handleSubmitModalProductSize.bind(
      this
    );
    this.handleAddMoreColorClick = this.handleAddMoreColorClick.bind(this);
    this.handleSubmitModalProductColor = this.handleSubmitModalProductColor.bind(
      this
    );
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  componentDidMount() {
    fetch("https://localhost:44376/api/customer/brand/getBrands")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            brands: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
    fetch("https://localhost:44376/api/admin/typeProducts")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            typeProducts: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
    fetch("https://localhost:44376/api/admin/status/getStatuses")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            statuses: [
              ...result.filter(
                status =>
                  status.name === "Sắp về hàng" || status.name === "Hoạt động"
              )
            ]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
    fetch("https://localhost:44376/api/customer/color/getColors")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            colors: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
    fetch("https://localhost:44376/api/customer/typesize/getTypeSizes")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            typeSizes: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
  }
  handleCodeChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: event.target.value,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  loadSizesByTypeSizeloadSizes() {
    const typeSizeId = this.state.typeSizeId;
    if (typeSizeId === "") {
      alert("Không lấy được size");
    }
    fetch(
      `https://localhost:44376/api/customer/size/getSizebyTypeSize?typeSizeId=${typeSizeId}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            sizes: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.PushToServerPage();
        }
      );
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  handleNameChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: event.target.value,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handleTypeSizeChange(event) {
    this.setState(
      {
        typeSizeId: event.target.value
      },
      () => {
        this.loadSizesByTypeSizeloadSizes();
      }
    );
  }
  handleTypeProductChange(event) {
    const { extendedProduct } = this.state;
    let productGenderId;
    this.state.typeProducts.forEach(element => {
      if (element.typeProductId === event.target.value) {
        productGenderId = element.productGenderId;
      }
    });
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: {
          typeProductId: event.target.value,
          name: event.target.options[event.target.selectedIndex].text,
          productGenderId: productGenderId
        },
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handlePriceChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: event.target.value,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handleDetailChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: event.target.value,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handleDiscountChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: event.target.value,

        brand: extendedProduct.brand,
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handleBrandChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: {
          brandId: event.target.value,
          name: event.target.options[event.target.selectedIndex].text
        },
        status: extendedProduct.status,
        listProductColor: extendedProduct.listProductColor
      }
    });
  }
  handleStatusChange(event) {
    const { extendedProduct } = this.state;
    this.setState({
      extendedProduct: {
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,

        brand: extendedProduct.brand,
        status: {
          statusId: event.target.value,
          name: event.target.options[event.target.selectedIndex].text
        },
        listProductColor: extendedProduct.listProductColor
      }
    });
  }

  handleImageDataChange(event) {
    const { productColor } = this.state;
    const imageData = document.getElementById("inputProductImage").files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({
        productColor: {
          color: productColor.color,
          imageUrl: reader.result,
          imageData: imageData,
          listProductSize: productColor.listProductSize
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  handleSizeChange(event) {
    this.setState({
      productSize: {
        size: {
          sizeId: event.target.value,
          name: event.target.options[event.target.selectedIndex].text
        },
        inventoryQuantity: this.state.productSize.inventoryQuantity
      }
    });
  }
  handleColorChange(event) {
    const { productColor } = this.state;
    const arr = event.target.options[event.target.selectedIndex].text.split(
      "-"
    );
    this.setState({
      productColor: {
        color: {
          colorId: event.target.value,
          colorValue: arr[1],
          name: arr[0]
        },
        imageUrl: productColor.imageUrl,
        imageData: productColor.imageData,
        listProductSize: productColor.listProductSize
      }
    });
  }
  handleInventoryQuantityChange(event) {
    this.setState({
      productSize: {
        size: this.state.productSize.size,
        inventoryQuantity: event.target.value
      }
    });
  }
  handleSubmitModalProductSize(event) {
    event.preventDefault();
    const productSize = this.state.productSize;
    const { productColor } = this.state;
    let listProductSizeInProductColorTemp = [...productColor.listProductSize];
    listProductSizeInProductColorTemp.push(productSize);
    let listSizeTemp = this.state.sizes;
    listSizeTemp = listSizeTemp.filter(
      item => item.sizeId !== productSize.size.sizeId
    );
    this.setState({
      sizes: [...listSizeTemp],
      productSize: {
        size: {
          sizeId: "",
          name: ""
        },
        inventoryQuantity: ""
      },
      productColor: {
        color: productColor.color,
        imageUrl: productColor.imageUrl,
        imageData: productColor.imageData,
        listProductSize: [...listProductSizeInProductColorTemp]
      }
    });
  }
  handleAddMoreColorClick(event) {
    if (this.state.typeSizeId === "") {
      alert("Vui lòng chọn loại size cho sản phẩm trước khi thêm màu!!!");
    }
  }
  handleSubmitModalProductColor(event) {
    event.preventDefault();
    const { productColor } = this.state;
    if (productColor.listProductSize.length > 0) {
      const { extendedProduct } = this.state;
      let listProductColorTemp = [...extendedProduct.listProductColor];
      listProductColorTemp.push(productColor);
      let listColorTemp = [...this.state.colors];
      listColorTemp = listColorTemp.filter(
        item => item.colorId !== productColor.color.colorId
      );
      this.setState({
        colors: [...listColorTemp],
        productColor: {
          color: {
            colorId: "",
            colorValue: "",
            name: ""
          },
          imageUrl: "",
          imageData: "",
          listProductSize: []
        },
        extendedProduct: {
          code: extendedProduct.code,
          name: extendedProduct.name,
          typeProduct: extendedProduct.typeProduct,
          price: extendedProduct.price,
          detail: extendedProduct.detail,
          discount: extendedProduct.discount,
          brand: extendedProduct.brand,
          status: extendedProduct.status,
          listProductColor: [...listProductColorTemp]
        }
      });
      this.loadSizesByTypeSizeloadSizes();
    } else {
      alert("Xin lựa chọn các Size có trong màu này!!!");
    }
  }
  handleSubmitProduct(event) {
    event.preventDefault();
    if (this.state.extendedProduct.listProductColor.length > 0) {
      const url = "https://localhost:44376/api/admin/extendedproducts";
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("authenticatedTokenAdmin").toString()
        },
        body: JSON.stringify(this.state.extendedProduct) // body data type must match "Content-Type" header
      };
      fetch(url, options)
        .then(res => res.json())
        .then(
          result => {
            this.state.extendedProduct.listProductColor.map(productColor => {
              const imageFormData = new FormData();
              imageFormData.append("productId", result.productId);
              imageFormData.append("colorId", productColor.color.colorId);
              imageFormData.append("imageData", productColor.imageData);
              const url =
                "https://localhost:44376/api/admin/extendedproducts/uploadImageProductColor";
              const options = {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                body: imageFormData,
                headers: {
                  Authorization:
                    "Bearer " +
                    localStorage.getItem("authenticatedTokenAdmin").toString()
                }
              };
              fetch(url, options)
                .then(res => {
                  return res;
                })
                .catch(err => {
                  console.log("Lỗi khi upload ảnh lên server: " + err);
                  // window.location.reload();
                });
            });
            MySwal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            window.location.href = "/product-page";
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            /*this.setState({
            isSubmitted: true,
            error
          });*/
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Có gì đó sai. Tạo sản phẩm thất bại!",
              footer: "<a href>Why do I have this issue?</a>"
            });
          }
        );
    } else {
      alert("Xin chọn màu cho sản phẩm này");
    }
  }

  render() {
    const { extendedProduct } = this.state;
    const imageNull =
      "data:image/png;base64,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";
    return (
      <div className="container">
        <form onSubmit={this.handleSubmitProduct}>
          <div className="justify-content-center">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCode">Mã sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCode"
                  placeholder="Mã sản phẩm"
                  required
                  onChange={this.handleCodeChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputName">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Tên sản phẩm"
                  required
                  onChange={this.handleNameChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCode">Giá</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPrice"
                  min="0"
                  placeholder="Giá"
                  required
                  onChange={this.handlePriceChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputDiscount">% Giá Giảm</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputDiscount"
                  placeholder="Giá giảm"
                  onChange={this.handleDiscountChange}
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputTypeProduct">Loại sản phẩm</label>
                <select
                  id="inputTypeProduct"
                  className="form-control"
                  required
                  onChange={this.handleTypeProductChange}
                >
                  <option value="">Chọn loại sản phẩm</option>
                  {this.state.typeProducts.map(typeProduct => (
                    <option
                      key={typeProduct.typeProductId}
                      value={typeProduct.typeProductId}
                    >
                      {typeProduct.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputTypeProduct">Loại size</label>
                <select
                  id="inputTypeProduct"
                  className="form-control"
                  required
                  onChange={this.handleTypeSizeChange}
                >
                  <option value="">Chọn loại size</option>
                  {this.state.typeSizes.map(typeSize => (
                    <option key={typeSize.id} value={typeSize.id}>
                      {typeSize.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputBrand">Nhãn hiệu</label>
                <select
                  id="inputBrand"
                  className="form-control"
                  required
                  onChange={this.handleBrandChange}
                >
                  <option value="">Chọn nhãn hiệu</option>
                  {this.state.brands.map(brand => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputStatus">Trạng thái</label>
                <select
                  id="inputStatus"
                  className="form-control"
                  required
                  onChange={this.handleStatusChange}
                >
                  <option value="">Chọn trạng thái</option>
                  {this.state.statuses.map(status => (
                    <option key={status.statusId} value={status.statusId}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="detailTextArea">Chi tiết</label>
              <textarea
                className="form-control"
                id="detailTextArea"
                rows="3"
                required
                onChange={this.handleDetailChange}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="col-sm-12">
                <label>Danh sách màu sản phẩm:</label>
              </div>
              {extendedProduct.listProductColor.map(productColor => (
                <div className="col-sm-4" key={productColor.color.colorId}>
                  <ProductColor
                    color={productColor.color}
                    imageUrl={productColor.imageUrl}
                    listProductSize={productColor.listProductSize}
                    heightImg={100}
                    isBase64Url={true}
                  />
                </div>
              ))}
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleAddMoreColorClick}
                  data-toggle="modal"
                  data-target="#modalProductColor"
                >
                  Thêm màu mới
                </button>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success mt-5">
                Thêm sản phẩm này vào dữ liệu
              </button>
            </div>
          </div>
        </form>
        <div
          className="modal fade"
          id="modalProductColor"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalProductColorTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Màu sản phẩm
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
                <form onSubmit={this.handleSubmitModalProductColor}>
                  <div className="form-group">
                    <img
                      src={
                        this.state.productColor.imageUrl === ""
                          ? imageNull
                          : this.state.productColor.imageUrl
                      }
                      className="rounded mx-auto d-block"
                      alt="Image Product Color"
                      width="100"
                      height="100"
                    />
                    <input
                      type="file"
                      className="form-control"
                      id="inputProductImage"
                      accept="image/*"
                      onChange={this.handleImageDataChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputColor">Màu sản phẩm</label>
                    <select
                      id="inputColor"
                      className="form-control"
                      required
                      onChange={this.handleColorChange}
                    >
                      <option defaultValue="">Chọn màu</option>
                      {this.state.colors.map(color => (
                        <option key={color.colorId} value={color.colorId}>
                          {color.name + "-" + color.colorValue}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="col-sm-12">
                      <label>Danh sách size sản phẩm:</label>
                    </div>
                    {this.state.productColor.listProductSize.map(item => (
                      <div key={item.size.sizeId} className="col-sm-6">
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          id={item.size.sizeId}
                          value={
                            "Size: " +
                            item.size.name +
                            " | " +
                            "Số lượng tồn: " +
                            item.inventoryQuantity
                          }
                        />
                      </div>
                    ))}
                    <div className="col-sm-6">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-toggle="modal"
                        data-target="#modalProductSize"
                      >
                        Thêm size mới
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success mt-5">
                    Thêm màu này vào sản phẩm
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modalProductSize"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalProductSizeTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Size sản phẩm
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
                <form onSubmit={this.handleSubmitModalProductSize}>
                  <div className="form-group">
                    <label htmlFor="inputSize">Size</label>
                    <select
                      id="inputSize"
                      className="form-control"
                      onChange={this.handleSizeChange}
                      required
                    >
                      <option value="">Chọn size</option>
                      {this.state.sizes.map(size => (
                        <option key={size.sizeId} value={size.sizeId}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputInventory">Số lượng tồn</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputInventory"
                      placeholder="Số lượng"
                      onChange={this.handleInventoryQuantityChange}
                      value={this.state.productSize.inventoryQuantity}
                      min="0"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Thêm size này vào màu
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProductPage;
