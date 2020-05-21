import React from 'react';
import NumberFormat from 'react-number-format';

class Filter extends React.Component {
    state = {
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        color: [],
        filterBySize: '',
        filterByBrand: '00000000-0000-0000-0000-000000000000',
        brand: [],
        filterByProductGender: '00000000-0000-0000-0000-000000000000',
        productGender: [],
        filterByProductType: '00000000-0000-0000-0000-000000000000',
        productType: []
    }

    getColor = () => {
        if(this.state.filterByColor !== '00000000-0000-0000-0000-000000000000') {
            fetch(`https://localhost:44376/api/customer/color/getColorById?id=${this.state.filterByColor}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    color: res
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    getBrand = () => {
        if(this.state.filterByBrand !== '00000000-0000-0000-0000-000000000000') {
            fetch(`https://localhost:44376/api/customer/brand/getBrandById?id=${this.state.filterByBrand}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    brand: res
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    getProductGender = () => {
        if(this.state.filterByProductGender !== '00000000-0000-0000-0000-000000000000') {
            fetch(`https://localhost:44376/api/customer/productgender/getProductGenderById?id=${this.state.filterByProductGender}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    productGender: res
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    getProductType = () => {
        if(this.state.filterByProductType !== '00000000-0000-0000-0000-000000000000') {
            fetch(`https://localhost:44376/api/customer/producttype/getProductTypeById?id=${this.state.filterByProductType}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    productType: res
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    resetPrice = () => {
        this.props.filterByPrice(0, 0);

        this.setState({
            filterByMinPrice: 0,
            filterByMaxPrice: 0
        })
    }

    resetColor = () => {
        this.props.filterByColor('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByColor: '00000000-0000-0000-0000-000000000000',
            color: []
        });
    }

    resetSize = () => {
        this.props.filterBySize('');

        this.setState({
            filterBySize: ''
        });
    }

    resetBrand = () => {
        this.props.filterByBrand('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByBrand: '00000000-0000-0000-0000-000000000000'
        })
    }

    resetProductGender = () => {
        this.props.filterByProductGender('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByProductGender: '00000000-0000-0000-0000-000000000000'
        })
    }

    resetProductType = () => {
        this.props.filterByProductType('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByProductType: '00000000-0000-0000-0000-000000000000'
        })
    }

    resetAll = () => {
        this.props.filterByPrice(0, 0);
        this.props.filterByColor('00000000-0000-0000-0000-000000000000');
        this.props.filterBySize('');
        this.props.filterByBrand('00000000-0000-0000-0000-000000000000');
        this.props.filterByProductGender('00000000-0000-0000-0000-000000000000');
        this.props.filterByProductType('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByMinPrice: 0,
            filterByMaxPrice: 0,
            filterByColor: '00000000-0000-0000-0000-000000000000',
            color: [],
            filterBySize: '',
            filterByBrand: '00000000-0000-0000-0000-000000000000',
            filterByProductGender: '00000000-0000-0000-0000-000000000000',
            filterByProductType: '00000000-0000-0000-0000-000000000000'
        })
    }

    renderPrice = () => {
        let price;

        if(this.state.filterByMaxPrice !== 0) {
            price = <ul className="filter-list">
                        <li><span className="text-uppercase">Giá:</span></li>
                        <li><a href=" #" onClick={this.resetPrice}>Từ: <NumberFormat value={this.state.filterByMinPrice} displayType={'text'} thousandSeparator={true}/></a></li>
                        <li><a href=" #" onClick={this.resetPrice}>Đến: <NumberFormat value={this.state.filterByMaxPrice} displayType={'text'} thousandSeparator={true}/></a></li>
                    </ul>
        }

        return price;
    }

    renderColor = () => {
        let color;
        
        if(this.state.filterByColor !== '00000000-0000-0000-0000-000000000000') {
            color = <ul className="filter-list">
                        <li><span className="text-uppercase">Màu:</span></li>
                        <li><a href=" #" onClick={this.resetColor} style={{ border: "1px solid #F8694A", backgroundColor: `${this.state.color.colorValue}`, color: this.state.color.name === "Trắng" ? "#000" : "#FFF" }}>{this.state.color.name}</a></li>
                    </ul>
        }

        return color;
    }

    renderSize = () => {
        let size;

        if(this.state.filterBySize !== '') {
            size =  <ul className="filter-list">
                        <li><span className="text-uppercase">Size:</span></li>
                        <li><a href=" #" onClick={this.resetSize} style={{ border: "1px solid #F8694A"}}>{this.state.filterBySize}</a></li>
                    </ul>
        }

        return size;
    }

    renderBrand = () => {
        let brand;
        
        if(this.state.filterByBrand !== '00000000-0000-0000-0000-000000000000') {
            brand = <ul className="filter-list">
                        <li><span className="text-uppercase">Thương hiệu:</span></li>
                        <li><a href=" #" onClick={this.resetBrand} style={{ border: "1px solid #F8694A" }}>{this.state.brand.name}</a></li>
                    </ul>
        }

        return brand;
    }

    renderProductGender = () => {
        let productGender;

        if(this.state.filterByProductGender !== '00000000-0000-0000-0000-000000000000') {
            productGender = <ul className="filter-list">
                                <li><span className="text-uppercase">Giới tính:</span></li>
                                <li><a href=" #" onClick={this.resetProductGender} style={{ border: "1px solid #F8694A" }}>{this.state.productGender.name}</a></li>
                            </ul>
        }

        return productGender;
    }

    renderProductType = () => {
        let productType;

        if(this.state.filterByProductType !== '00000000-0000-0000-0000-000000000000') {
            productType = <ul className="filter-list">
                                <li><span className="text-uppercase">Loại:</span></li>
                                <li><a href=" #" onClick={this.resetProductType} style={{ border: "1px solid #F8694A" }}>{this.state.productType.name}</a></li>
                            </ul>
        }

        return productType;
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            filterByMinPrice: nextProps.minPrice,
            filterByMaxPrice: nextProps.maxPrice,
            filterByColor: nextProps.color,
            filterBySize: nextProps.size,
            filterByBrand: nextProps.brand,
            filterByProductGender: nextProps.productGender,
            filterByProductType: nextProps.productType
        }, () => {
            this.getColor();
            this.getBrand();
            this.getProductGender();
            this.getProductType();
        });
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Bộ lọc</h3>

                {this.renderPrice()}
                {this.renderColor()}
                {this.renderSize()}
                {this.renderBrand()}
                {this.renderProductGender()}
                {this.renderProductType()}

                <button className="primary-btn" onClick={this.resetAll}>Xoá tất cả</button>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default Filter;