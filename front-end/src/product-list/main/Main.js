import React from 'react';
import Filter from './filter/Filter';
import List from './list/List';

class Main extends React.Component {
    state = {
        pageSize: 9,
        pageNumber: 1,
        orderBy: 'new',
        search: '',
        items: [],
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        filterBySize: '',
        filterByBrand: '00000000-0000-0000-0000-000000000000',
        filterByProductGender: '00000000-0000-0000-0000-000000000000',
        filterByProductType: '00000000-0000-0000-0000-000000000000'
    }

    changeSize = (size) => {
        this.setState({
            pageSize: size
        }, () => {
            this.props.changeSize(size);
        }, () => {
            this.getProducts();
        });
    }

    changePage = (page) => {
        this.setState({
            pageNumber: page
        }, () => {
            this.props.changePage(page);
        }, () => {
            this.getProducts();
        });
    }
    
    changeOrder = (order) => {
        this.setState({
            orderBy: order
        }, () => {
            this.props.changeOrder(order);
        }, () => {
            this.getProducts();
        })
    }

    getProducts = () => {
        fetch(`https://localhost:44376/api/customer/product/getProductVMs?pageSize=${this.state.pageSize}&pageNumber=${this.state.pageNumber}&orderBy=${this.state.orderBy}&minPrice=${this.state.filterByMinPrice}&maxPrice=${this.state.filterByMaxPrice}&colorId=${this.state.filterByColor}&sizeName=${this.state.filterBySize}&brandId=${this.state.filterByBrand}&productGenderId=${this.state.filterByProductGender}&search=${this.state.search}&productTypeId=${this.state.filterByProductType}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                items: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            pageSize: nextProps.pageSize,
            pageNumber: nextProps.pageNumber,
            search: nextProps.search,
            filterByMinPrice: nextProps.minPrice,
            filterByMaxPrice: nextProps.maxPrice,
            filterByColor: nextProps.color,
            filterBySize: nextProps.size,
            filterByBrand: nextProps.brand,
            filterByProductGender: nextProps.productGender,
            filterByProductType: nextProps.productType
        }, () => {
            this.getProducts();
        });
    }

    render() {
        return (
            // {/* <!-- MAIN --> */}
            <div id="main" className="col-md-9">
                <Filter changeSize={this.changeSize} changePage={this.changePage} changeOrder={this.changeOrder} productType={this.state.filterByProductType} search={this.state.search} pageSize={this.state.pageSize} currentPageNumber={this.state.pageNumber} orderBy={this.state.orderBy} minPrice={this.state.filterByMinPrice} maxPrice={this.state.filterByMaxPrice} color={this.state.filterByColor} size={this.state.filterBySize} brand={this.state.filterByBrand} productGender={this.state.filterByProductGender}></Filter>
                <List items={this.state.items}></List>
            </div>
            // {/* <!-- /MAIN --> */}
        );
    }
}

export default Main;