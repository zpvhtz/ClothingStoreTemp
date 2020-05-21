import React from 'react';  
import ProductImage from './product-image/ProductImage'
import ProductInfo from './product-info/ProductInfo'
// eslint-disable-next-line
import ProductReview from './product-review/ProductReview'

class Main extends React.Component {
    state = {
        item: '',
        colorId: '00000000-0000-0000-0000-000000000000'
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            item: nextProps.item,
            colorId: nextProps.colorId            
        });
    }

    selectColor = (colorId) => {
        this.props.selectColor(colorId);

        this.setState({
            colorId: colorId
        });
    }

    render() {
        return (
            // {/* <!-- MAIN --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {/* <!--  Product Details --> */}
                        <div className="product product-details clearfix">
                            <ProductImage itemImage={this.state.item.imageUrl}></ProductImage>
                            <ProductInfo selectColor={this.selectColor} colorId={this.state.colorId} itemId={this.state.item.productId} itemName={this.state.item.name} itemPrice={this.state.item.price} itemDetail={this.state.item.detail} itemDiscount={this.state.item.discount} itemBrand={this.state.item.brandName}></ProductInfo>
                            {/* <ProductReview></ProductReview> */}
                        </div>
                        {/* <!-- /Product Details --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /MAIN --> */}
        );
    }
}

export default Main;