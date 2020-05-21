import React from 'react';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";

class Banner extends React.Component {
    componentDidMount() {
        this.bannerCarousel();
    }

    render() {
        return (
            // <!-- HOME -->
            <div id="home">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- home wrap --> */}
                    <div className="home-wrap">
                        {/* <!-- home slick --> */}
                        <div id="home-slick">
                            {/* <!-- banner --> */}
                            <div className="banner banner-1">
                                <img src="/assets/img/banner01.jpg" alt="" />
                                <div className="banner-caption text-center">
                                    <h1>Giảm giá</h1>
                                    <h3 className="white-color font-weak">Lên đến 50%</h3>
                                    <Link to={`/productlist`}>
                                        <button className="primary-btn">Mua sắm ngay</button>
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- /banner --> */}
    
                            {/* <!-- banner --> */}
                            <div className="banner banner-1">
                                <img src="/assets/img/banner02.jpg" alt="" />
                                <div className="banner-caption">
                                    <h1 className="primary-color">HOT DEAL<br /><span className="white-color font-weak">Lên đến 50%</span></h1>
                                    <button className="primary-btn">Mua sắm ngay</button>
                                </div>
                            </div>
                            {/* <!-- /banner --> */}
    
                            {/* <!-- banner --> */}
                            <div className="banner banner-1">
                                <img src="/assets/img/banner03.jpg" alt="" />
                                <div className="banner-caption">
                                    <h1 className="white-color">Sản phẩm <span>mới</span></h1>
                                    <Link to={`/productlist`}>
                                        <button className="primary-btn">Mua sắm ngay</button>
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- /banner --> */}
                        </div>
                        {/* <!-- /home slick --> */}
                    </div>
                    {/* <!-- /home wrap --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // <!-- /HOME -->
        );   
    }

    // Carousel for banners
    bannerCarousel = () => {
        // HOME SLICK
        window.$('#home-slick').slick({
            autoplay: true,
            infinite: true,
            speed: 300,
            arrows: true,
        });

        // PRODUCTS SLICK
        window.$('#product-slick-1').slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: true,
            arrows: false,
            appendDots: '.product-slick-dots-1',
            responsive: [{
                breakpoint: 991,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                dots: false,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            }]
        });

        window.$('#product-slick-2').slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: true,
            arrows: false,
            appendDots: '.product-slick-dots-2',
            responsive: [{
                breakpoint: 991,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                dots: false,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            }]
        });
    }
}

export default Banner;
