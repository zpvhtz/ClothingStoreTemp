import React, { Component } from "react";
import NumberFormat from 'react-number-format';

class OrderDeliveryItem extends Component {
    state = {
        information: []
    }

    getInformation = () => {
        fetch(`https://localhost:44376/api/admin/productsize/getExtendedProductSizeInfoByAllId?colorId=${this.props.colorId}&sizeId=${this.props.sizeId}&productId=${this.props.productId}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                information: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    componentWillMount = () => {
        this.getInformation();
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index + 1}</th>
                <td>{this.state.information.productName}</td>
                <td>{this.state.information.sizeName}</td>
                <td>{this.state.information.colorName}</td>
                <td>{this.props.quantity}</td>
                <td><NumberFormat value={this.props.price} displayType={'text'} thousandSeparator={true}/>₫</td>
            </tr>
        );
    }
}

export default OrderDeliveryItem;
