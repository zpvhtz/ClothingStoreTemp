import React from 'react';

class Filter extends React.Component {
    state = {
        numberOfPages: 0,
        pageSize: 9,
        orderBy: 'new',
        search: '',
        currentPageNumber: 1,
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        filterBySize: '',
        filterByBrand: '00000000-0000-0000-0000-000000000000',
        filterByProductGender: '00000000-0000-0000-0000-000000000000',
        filterByProductType: '00000000-0000-0000-0000-000000000000'
    }

    getSearchAndFilter = () => {
        let searchTemp = '', search = '';
        let url = window.location.href;

        if(url.indexOf('search') !== -1) {
            searchTemp = url.substring(url.indexOf('search'), url.length);
            search = searchTemp.substr(searchTemp.indexOf('=') + 1, searchTemp.indexOf('&') === -1 ? searchTemp.length - searchTemp.indexOf('=') : searchTemp.indexOf('&') - searchTemp.indexOf('=') - 1);
        }

        return search;
    }

    getNumberOfPages = () => {
        let search = this.getSearchAndFilter();

        fetch(`https://localhost:44376/api/customer/product/getNumberOfPages?pageSize=${this.state.pageSize}&minPrice=${this.state.filterByMinPrice}&maxPrice=${this.state.filterByMaxPrice}&colorId=${this.state.filterByColor}&sizeName=${this.state.filterBySize}&brandId=${this.state.filterByBrand}&productGenderId=${this.state.filterByProductGender}&search=${search}&productTypeId=${this.state.filterByProductType}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                numberOfPages: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    renderListPages = () => {
        const listPages = [];

        for(let i = 0; i < this.state.numberOfPages; i++) {
            listPages.push(
                <li key={i} value={i + 1} className={i + 1 === this.props.currentPageNumber ? "active" : ''}>
                    {i + 1 === this.props.currentPageNumber ? i + 1 : <a href=" #" onClick={this.liClick}>{i + 1}</a>}
                </li>
            );
        }

        return listPages;
    }

    changeSize = () => {
        this.props.changeSize(this.refs.pageSize.value);
        this.changePage(1);

        this.setState({
            pageSize: this.refs.pageSize.value
        }, () => {
            this.getNumberOfPages();
        });
    }

    changePage = (page) => {
        this.props.changePage(page);
        this.setState({
            currentPageNumber: page
        });
    }

    changeOrder = () => {
        this.props.changeOrder(this.refs.order.value);
        this.changePage(1);

        this.setState({
            orderBy: this.refs.order.value
        }, () => {
            this.getNumberOfPages();
        });
    }

    liClick = (evt) => {
        this.changePage(evt.target.innerText);
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            pageSize: nextProps.pageSize,
            filterByMinPrice: nextProps.minPrice,
            filterByMaxPrice: nextProps.maxPrice,
            filterByColor: nextProps.color,
            filterBySize: nextProps.size,
            filterByBrand: nextProps.brand,
            filterByProductGender: nextProps.productGender,
            search: nextProps.search,
            filterByProductType: nextProps.productType
        }, () => {
            this.getNumberOfPages();
        }, () => {
            this.changePage(1);
        });
    }

    componentDidMount = () => {
        this.getNumberOfPages()
    }
    
    render() {
        return (
            // {/* <!-- store top filter --> */}
            <div className="store-filter clearfix">
                <div className="pull-left">
                    <div className="row-filter">
                        <a href=" #"><i className="fa fa-th-large"></i></a>
                        <a href=" #" className="active"><i className="fa fa-bars"></i></a>
                    </div>
                    <div className="sort-filter">
                        <span className="text-uppercase">Sắp xếp theo: </span>
                        <select className="input" ref='order' onChange={this.changeOrder}>
                            <option value="new">Mới nhất</option>
                            <option value="high">Giá cao đến thấp</option>
                            <option value="low">Giá thấp đến cao</option>
                        </select>
                        <a href=" #" className="main-btn icon-btn"><i className="fa fa-arrow-down"></i></a>
                    </div>
                </div>
                <div className="pull-right">
                    <div className="page-filter">
                        <span className="text-uppercase">Show:</span>
                        <select className="input" onChange={this.changeSize} ref='pageSize'>
                                <option value="9">9</option>
                                <option value="12">12</option>
                                <option value="15">15</option>
                            </select>
                    </div>
                    <ul className="store-pages">
                        <li><span className="text-uppercase">Page:</span></li>
                        {this.renderListPages()}
                        {/* <li className="active">1</li>
                        <li><a href=" #">2</a></li>
                        <li><a href=" #">3</a></li>
                        <li><a href=" #"><i className="fa fa-caret-right"></i></a></li> */}
                    </ul>
                </div>
            </div>
            // {/* <!-- /store top filter --> */}
        );
    }
}

export default Filter;