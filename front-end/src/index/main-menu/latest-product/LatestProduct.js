import React from 'react';
import LatestProductItem from './latest-product-item/LatestProductItem';

class LatestProduct extends React.Component {
    state = {
        items:[]
    };

    renderItem = () => {
        let listItems = null;
        if(this.state.items.length !== 0) {
            listItems = this.state.items.map((item, idx) =>
            <LatestProductItem key={idx} itemId={item.productId} itemName={item.name} itemPrice={item.price} itemDiscount={item.discount} itemImage={item.imageUrl}></LatestProductItem>
        )};
    //     const listItems = this.state.items.map((item, idx) =>
    //     <LatestProductItem key={idx} itemName={item.name} itemPrice={item.price} itemDiscount={item.discount} itemImage={item.imageUrl}></LatestProductItem>
    // );


        return listItems;
    }
    getProduct=()=>{
        fetch(`https://localhost:44376/api/customer/product/getNew`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                items:res
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
                            <h2 className="title">Sản phẩm mới nhất</h2>
                        </div>
                    </div>
                    {/* <!-- section title --> */}

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

export default LatestProduct;
