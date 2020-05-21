import React, { Component } from "react";
import ProductColor from "./ProductColor";
class ListProductColor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { listProductColor } = this.props;
    return (
      <div
        className="modal fade"
        id={"modal" + this.props.productId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                {this.props.productName}
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
              {listProductColor.map(productColor => (
                <ProductColor
                  key={productColor.color.colorId}
                  color={productColor.color}
                  imageUrl={productColor.imageUrl}
                  listProductSize={productColor.listProductSize}
                  heightImg={200}
                  isBase64Url={false}
                />
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListProductColor;
