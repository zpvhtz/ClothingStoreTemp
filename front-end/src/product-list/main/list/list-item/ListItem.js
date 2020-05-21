import React from 'react';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // eslint-disable-next-line no-unused-vars
    Link
} from "react-router-dom";
import NumberFormat from 'react-number-format';

class ListItem extends React.Component {
    render() {
        let imgUrl = "https://localhost:44376/" + this.props.itemImage;

        return (
            // {/* <!-- Product Single --> */}
            <div className="col-md-4 col-sm-6 col-xs-6">
                <div className="product product-single">
                    <div className="product-thumb">
                        <div className="product-label">
                            <span>Mới</span>
                            { this.props.itemDiscount === null || this.props.itemDiscount === 0 ? '' : <span className="sale">{ this.props.itemDiscount }%</span>}
                        </div>
                            <button className="main-btn quick-view"><i className="fa fa-search-plus"></i><a href={`/product?id=${this.props.itemProductId}`}>Chi tiết</a></button>
                        <img src={ imgUrl } alt="" style={{width: '260px', height: '350px'}}/>
                    </div>
                    <div className="product-body">
                        { 
                            this.props.itemDiscount === null || this.props.itemDiscount === 0 ?
                            <h3 className="product-price"><NumberFormat value={this.props.itemPrice} displayType={'text'} thousandSeparator={true}/></h3> :
                            <h3 className="product-price"><NumberFormat value={this.props.itemPrice - (this.props.itemPrice * this.props.itemDiscount / 100)} displayType={'text'} thousandSeparator={true}/> <del className="product-old-price"><NumberFormat value={this.props.itemPrice} displayType={'text'} thousandSeparator={true}/></del></h3>
                        }
                        <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                        </div>
                        <h2 className="product-name"><a href={`/product?id=${this.props.itemProductId}`}>{this.props.itemName}</a></h2>
                        {/* <div className="product-btns">
                            <button className="main-btn icon-btn"><i className="fa fa-heart"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-exchange"></i></button>
                            <button className="primary-btn add-to-cart"><i className="fa fa-shopping-cart"></i> Thêm vào giỏ</button>
                        </div> */}
                    </div>
                </div>
            </div>
            // {/* <!-- /Product Single --> */}
        );
    }
}

export default ListItem;