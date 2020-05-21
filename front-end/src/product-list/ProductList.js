import React from 'react';
import ProductNavigation from '../navigation/ProductNavigation';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Aside from './aside/Aside';
import Main from './main/Main';

class ProductList extends React.Component {
    state = {
        pageSize: 9,
        pageNumber: 1,
        orderBy: 'new',
        search: '',
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        filterBySize: '',
        filterByBrand: '00000000-0000-0000-0000-000000000000',
        filterByProductGender: '00000000-0000-0000-0000-000000000000',
        filterByProductType: '00000000-0000-0000-0000-000000000000'
    }

    getUrl = () => {
        let pageSizeTemp, pageSize = 9;
        let pageNumberTemp, pageNumber = 1;
        let orderByTemp, orderBy = 'new';
        let searchTemp = '', search = '';
        let productGenderTemp = '', productGender = '';
        let productTypeTemp = '', productType = '';
        let url = window.location.href;
        
        //pageSize
        if(url.indexOf('pageSize') !== -1) {
            pageSizeTemp = url.substring(url.indexOf('pageSize'), url.length);
            pageSize = pageSizeTemp.substr(pageSizeTemp.indexOf('=') + 1, pageSizeTemp.indexOf('&') === -1 ? pageSizeTemp.length - pageSizeTemp.indexOf('=') : pageSizeTemp.indexOf('&') - pageSizeTemp.indexOf('=') - 1);
        }

        //pageNumber
        if(url.indexOf('pageNumber') !== -1) {
            pageNumberTemp = url.substring(url.indexOf('pageNumber'), url.length);
            pageNumber = pageNumberTemp.substr(pageNumberTemp.indexOf('=') + 1, pageNumberTemp.indexOf('&') === -1 ? pageNumberTemp.length - pageNumberTemp.indexOf('=') : pageNumberTemp.indexOf('&') - pageNumberTemp.indexOf('=') - 1);
        }

        //orderBy
        if(url.indexOf('orderBy') !== -1) {
            orderByTemp = url.substring(url.indexOf('pageNumber'), url.length);
            orderBy = orderByTemp.substr(orderByTemp.indexOf('=') + 1, orderByTemp.indexOf('&') === -1 ? orderByTemp.length - orderByTemp.indexOf('=') : orderByTemp.indexOf('&') - orderByTemp.indexOf('=') - 1);
        }

        //search
        if(url.indexOf('search') !== -1) {
            searchTemp = url.substring(url.indexOf('search'), url.length);
            search = searchTemp.substr(searchTemp.indexOf('=') + 1, searchTemp.indexOf('&') === -1 ? searchTemp.length - searchTemp.indexOf('=') : searchTemp.indexOf('&') - searchTemp.indexOf('=') - 1);
        }

        //productGender
        if(url.indexOf('productGenderId') !== -1) {
            productGenderTemp = url.substring(url.indexOf('productGenderId'), url.length);
            productGender = productGenderTemp.substr(productGenderTemp.indexOf('=') + 1, productGenderTemp.indexOf('&') === -1 ? productGenderTemp.length - productGenderTemp.indexOf('=') : productGenderTemp.indexOf('&') - productGenderTemp.indexOf('=') - 1);
        }
        else {
            productGender = '00000000-0000-0000-0000-000000000000';
        }

        //productType
        if(url.indexOf('productTypeId') !== -1) {
            productTypeTemp = url.substring(url.indexOf('productTypeId'), url.length);
            productType = productTypeTemp.substr(productTypeTemp.indexOf('=') + 1, productTypeTemp.indexOf('&') === -1 ? productTypeTemp.length - productTypeTemp.indexOf('=') : productTypeTemp.indexOf('&') - productTypeTemp.indexOf('=') - 1);
        }
        else {
            productType = '00000000-0000-0000-0000-000000000000';
        }
        

        this.setState({
            pageSize: pageSize,
            pageNumber: pageNumber,
            orderBy: orderBy,
            search: search,
            filterByProductGender: productGender,
            filterByProductType: productType
        });
    }

    changeSize = (size) => {
        this.setState({
            pageSize: size
        });
    }

    changePage = (page) => {
        this.setState({
            pageNumber: page
        });
    }

    changeOrder = (order) => {
        this.setState({
            orderBy: order
        });
    }

    filterByPrice = (minPrice, maxPrice) => {
        this.setState({
            filterByMinPrice: minPrice,
            filterByMaxPrice: maxPrice
        });
    }

    filterByColor = (colorId) => {
        this.setState({
            filterByColor: colorId
        });
    }

    filterBySize = (sizeName) => {
        this.setState({
            filterBySize: sizeName
        });
    }

    filterByBrand = (brandId) => {
        this.setState({
            filterByBrand: brandId
        });
    }

    filterByProductGender = (productGenderId) => {
        this.setState({
            filterByProductGender: productGenderId
        });
    }

    filterByProductType = (productTypeId) => {
        this.setState({
            filterByProductType: productTypeId
        });
    }

    componentDidMount = () => {
        this.getUrl();
    }

    render() {
        return (
            <div>
                {/* <ProductNavigation></ProductNavigation> */}
                <ProductNavigation></ProductNavigation>
                <Breadcrumb></Breadcrumb>
    
                {/* <!-- section --> */}
                <div className="section">
                    {/* <!-- container --> */}
                    <div className="container">
                        {/* <!-- row --> */}
                        <div className="row">
                            <Aside productGender={this.state.filterByProductGender} productType={this.state.filterByProductType} filterByProductType={this.filterByProductType} filterByProductGender={this.filterByProductGender} filterByBrand={this.filterByBrand} filterBySize={this.filterBySize} filterByPrice={this.filterByPrice} filterByColor={this.filterByColor}></Aside>
                            <Main productType={this.state.filterByProductType} search={this.state.search} productGender={this.state.filterByProductGender} brand={this.state.filterByBrand} size={this.state.filterBySize} color={this.state.filterByColor} minPrice={this.state.filterByMinPrice} maxPrice={this.state.filterByMaxPrice} pageSize={this.state.pageSize} pageNumber={this.state.pageNumber} orderBy={this.state.orderBy} changeSize={this.changeSize} changePage={this.changePage} changeOrder={this.changeOrder}></Main>
                        </div>
                        {/* <!-- /row --> */}
                    </div>
                    {/* <!-- /container --> */}
                </div>
                {/* <!-- /section --> */}
            </div>
            // </div>
        );
    }
}

export default ProductList;
