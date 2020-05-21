import React from 'react';

class HomeNavigation extends React.Component {
    state = {
        maleCategories: [],
        femaleCategories: [],
        categories: []
    }

    getMaleCategories = () => {
        fetch(`https://localhost:44376/api/customer/ProductType/GetProductTypesByGender?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                maleCategories: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getFemaleCategories = () => {
        fetch(`https://localhost:44376/api/customer/ProductType/GetProductTypesByGender?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                femaleCategories: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getAllCategories = () => {
        fetch(`https://localhost:44376/api/customer/ProductType/getProductTypes`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                categories: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }


    renderMaleCategories = () => {
        const maleCategories = this.state.maleCategories.map((item, idx) => 
            // <li key={idx}><a href="/#" id={item.typeProductId}>{item.name}</a></li>
            <li key={idx}><a href={"/productlist?productTypeId=" + item.typeProductId} id={item.typeProductId}>{item.name}</a></li>
            // href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A"
        )

        return maleCategories;
    }

    renderFemaleCategories = () => {
        const femaleCategories = this.state.femaleCategories.map((item, idx) => 
            <li key={idx}><a href="/#" id={item.typeProductId}>{item.name}</a></li>
        )

        return femaleCategories;
    }

    renderAllCategories = () => {
        const categories = this.state.categories.map((item, idx) => 
            <li key={idx}><a href={"/productlist?productTypeId=" + item.typeProductId} id={item.typeProductId}>{item.name}</a></li>
        )

        return categories;
    }

    componentDidMount = () => {
        this.getMaleCategories();
        this.getFemaleCategories();
        this.getAllCategories();
    }

    render() {
        return (
            // <!-- NAVIGATION -->
            <div id="navigation">
                {/* <!-- container --> */}
                <div className="container">
                    <div id="responsive-nav">
                        {/* <!-- category nav --> */}
                        <div className="category-nav">
                            <span className="category-header">Danh mục <i className="fa fa-list"></i></span>
                            <ul className="category-list">
                                {/* <li><a href="/productlist">Tất cả</a></li> */}
                                {this.renderAllCategories()}
                                
                                {/* Male */}
                                {/* <li className="dropdown side-dropdown"><a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">Nam <i className="fa fa-angle-right"></i></a>
                                    <div className="custom-menu" style={{width: "500px"}}>
                                        <div className="row">
                                            <div className="col-md-4" style={{width: "50%"}}>
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Danh mục</h3></li>
                                                    <li><a href="/productlist?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938">Tất cả</a></li>
                                                    {this.renderMaleCategories()}
                                                </ul>
                                            </div>
                                            <div className="col-md-4 hidden-sm hidden-xs" style={{width: "50%"}}>
                                                <a className="banner banner-2" href="/productlist?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938">
                                                    <img src="/assets//img/banner04.jpg" alt="" />
                                                    <div className="banner-caption">
                                                        <h3 className="white-color">SẢN PHẨM<br />NAM</h3>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}

                                {/* Female */}
                                {/* <li className="dropdown side-dropdown"><a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">Nữ <i className="fa fa-angle-right"></i></a>
                                    <div className="custom-menu" style={{width: "500px"}}>
                                        <div className="row">
                                            <div className="col-md-4" style={{width: "50%"}}>
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Danh mục</h3></li>
                                                    <li><a href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A">Tất cả</a></li>
                                                    {this.renderFemaleCategories()}
                                                </ul>
                                            </div>
                                            <div className="col-md-4 hidden-sm hidden-xs" style={{width: "50%"}}>
                                                <a className="banner banner-2" href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A">
                                                    <img src="/assets//img/banner04.jpg" alt="" />
                                                    <div className="banner-caption">
                                                        <h3 className="white-color">SẢN PHẨM<br />NỮ</h3>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                        {/* <!-- /category nav --> */}

                        {/* <!-- menu nav --> */}
                        <div className="menu-nav">
                            <span className="menu-header">Menu <i className="fa fa-bars"></i></span>
                            <ul className="menu-list">
                            <li><a href="/">Trang chủ</a></li>
                                <li><a href="/productlist">Sản phẩm</a></li>
                                <li><a href="/productlist?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938">Nam</a></li>
                                <li><a href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A">Nữ</a></li>
                                {/* <li><a href="/#">Sales</a></li> */}
                            </ul>
                        </div>
                        {/* <!-- menu nav --> */}
                    </div>
                </div>
                {/* <!-- /container --> */}
            </div>
            // <!-- /NAVIGATION -->
        );
    }
}

export default HomeNavigation;
