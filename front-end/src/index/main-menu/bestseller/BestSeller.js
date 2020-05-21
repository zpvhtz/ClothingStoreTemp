import React from 'react';
import DealItem from './bestseller-item/SellerItem';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";

class Deal extends React.Component {
    state = {
        item: []
    };

    renderItem = () => {
        let items = null;

        if(this.state.item.length!==0){
            items=this.state.item.map((item,idx )=>
            <DealItem key={idx} itemId={item.productId} itemName={item.name} itemPrice={item.price} itemDiscount={item.discount} itemImage={item.imageUrl}></DealItem>)
        };

        return items;
    }

    getProduct=()=>{
        fetch(`https://localhost:44376/api/customer/product/getBestSeller`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                item:res
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }
    componentDidMount=()=>{
        this.getProduct();
    }

    render() {
        return (
            // <!-- section -->
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {/* <!-- section title --> */}
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Sản phẩm bán chạy</h2>
                            </div>
                        </div>
                        {/* <!-- section title --> */}

                        {/* <!-- banner --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="banner banner-2">
                                <img src="/assets/img/banner14.jpg" alt="" />
                                <div className="banner-caption">
                                    <h2 className="white-color">BỘ SƯU TẬP<br />MỚI</h2>
                                    <Link to={`/productlist`}>
                                        <button className="primary-btn">Mua sắm ngay</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /banner --> */}

                        { this.renderItem() }
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /section --> */}



            
        )
    }
}

export default Deal;


