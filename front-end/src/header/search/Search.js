import React from 'react';

class Search extends React.Component {
    searchProductsByName = (e) => {
        e.preventDefault();
        window.location.href = `/productlist?search=${window.$("#txt-search").val()}`;
    }

    render() {
        return (
            // {/* <!-- Search --> */}
            <div className="header-search">
            <form>
                <input id="txt-search" className="input search-input" type="text" placeholder="Nhập tên sản phẩm" />
                <select className="input search-categories">
                    <option value="0">Tất cả</option>
                    {/* <option value="1">Category 01</option>
                    <option value="1">Category 02</option> */}
                </select>
                <button className="search-btn" onClick={this.searchProductsByName}><i className="fa fa-search"></i></button>
            </form>
            </div>
            // {/* <!-- /Search --> */}
        )
    }
}

export default Search;