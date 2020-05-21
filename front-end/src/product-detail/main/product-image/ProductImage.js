import React from 'react';

class ProductImage extends React.Component{
    render() {
        let imgUrl = "";
        if(this.props.itemImage !== undefined)
            imgUrl = "https://localhost:44376/" + this.props.itemImage;

        return (
            <div className="col-md-6">
                <div id="product-main-view">
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                </div>
                <div id="product-view">
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-view">
                        <img src={imgUrl} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductImage;