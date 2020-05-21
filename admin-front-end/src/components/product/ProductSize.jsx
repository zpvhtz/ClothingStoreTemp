import React, { Component } from "react";

class ProductSize extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { size } = this.props;
    return (
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputSize">Size</label>
          <input
            type="text"
            className="form-control"
            id="inputSize"
            value={size.name}
            readOnly
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputInventory">Inventory</label>
          <input
            type="number"
            className="form-control"
            id="inputInventory"
            min="0"
            value={this.props.inventoryQuantity}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default ProductSize;
