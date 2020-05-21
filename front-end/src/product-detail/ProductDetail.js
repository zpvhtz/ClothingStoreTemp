import React from 'react';
// eslint-disable-next-line no-unused-vars
import  { Redirect } from 'react-router-dom'
import ProductNavigation from '../navigation/ProductNavigation'
import Breadcrumb from './breadcrumb/Breadcrumb'
import Main from './main/Main'

class ProductDetail extends React.Component{
    state = {
        productId: '00000000-0000-0000-0000-000000000000',
        item: '',
        colorId: '00000000-0000-0000-0000-000000000000',
    }

    getProduct = (id) => {
        fetch(`https://localhost:44376/api/customer/product/getProductVMById?id=${id}&colorId=${this.state.colorId}`)
        .then(res => res.json())
        .then(res => {
            let check = res.id;
            if(check === undefined) {
                this.setState({
                    item: res
                });
            }
            else {
                alert("Sai đường dẫn");
                window.location.href = "/";
            }
            
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getId = () => {
        let idTemp = '', id = '';
        let href = window.location.href;

        if(href.indexOf("id") === -1) {
            window.location.href = "/";
        }
        else {
            idTemp = href.substring(href.indexOf("id"), href.length);
            id = idTemp.substring(idTemp.indexOf('=') + 1, idTemp.indexOf("#") === -1 ? idTemp.length : idTemp.length - 1);
        }
        
        this.getProduct(id);
    }

    selectColor = (colorId) => {
        this.setState({
            colorId: colorId
        }, () => {
            this.getId();
        });
    }

    componentDidMount = () => {
        this.productSlick(); //chạy JS (đừng quan tâm)
        this.getId();
    }

    productSlick = () => {
        // PRODUCT DETAILS SLICK
        window.$('#product-main-view').slick({
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            fade: true,
            asNavFor: '#product-view',
        });

        window.$('#product-view').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            asNavFor: '#product-main-view',
        });

        // PRODUCT ZOOM
        window.$('#product-main-view .product-view').zoom();
    }

    render() {
        return (
            <div>
                <ProductNavigation></ProductNavigation>
                <Breadcrumb itemName={this.state.item.name}></Breadcrumb>
                <Main selectColor={this.selectColor} colorId={this.state.colorId} item={this.state.item}></Main>
            </div>
        );
    }
}

export default ProductDetail;