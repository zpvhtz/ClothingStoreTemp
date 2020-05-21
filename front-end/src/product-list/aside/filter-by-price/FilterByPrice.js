import React from 'react';
// import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class FilterByPrice extends React.Component {
    state = {
        filterByMinPrice: 0,
        filterByMaxPrice: 0
    };

    filterByPrice = () => {
        this.props.filterByPrice(this.refs.minPrice.value, this.refs.maxPrice.value);

        this.setState({
            filterByMinPrice: this.refs.minPrice.value,
            filterByMaxPrice: this.refs.maxPrice.value
        })
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Khoảng giá</h3>
                <center>
                    <ul className="size-option">
                        <li className="active" style={{width: "50px", textAlign: "center"}}><a href=" #">Từ</a></li>
                        <li className="active"><input type="text" ref="minPrice"></input></li>
                    </ul>
                    <ul className="size-option">
                        <li className="active" style={{width: "50px", textAlign: "center"}}><a href=" #">Đến</a></li>
                        <li className="active"><input type="text" ref="maxPrice"></input></li>
                    </ul>
                    <button className="primary-btn" style={{padding: "5px 10px"}} onClick={this.filterByPrice}>Áp dụng</button>
                </center>
                
                {/* <br></br> */}
                {/* <div id="price-slider"></div> */}
                {/* <Nouislider range={{ min: 0, max: 10000000 }} start={[0, 0]} connect onSlide={this.onSlide} /> */}
            </div>
            
            // {/* <!-- aside widget --> */}
        );
    }
}

export default FilterByPrice;