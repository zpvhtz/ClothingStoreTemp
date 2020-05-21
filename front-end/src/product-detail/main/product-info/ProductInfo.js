import React from 'react';
import NumberFormat from 'react-number-format';

class ProductInfo extends React.Component{
    state = {
        productId: '00000000-0000-0000-0000-000000000000',
        colorArr: [],
        colorId: '00000000-0000-0000-0000-000000000000',
        size:[],
        sizeId: '00000000-0000-0000-0000-000000000000',
        quantity: 0,
        thongbao: '',
        productStatus: ''
    }

    getProductStatus = () => {
        console.log(`https://localhost:44376/api/customer/product/getProductStatus?productId=${this.state.productId}`);
        fetch(`https://localhost:44376/api/customer/product/getProductStatus?productId=${this.state.productId}`)
        .then(res => res.json())
        .then(
            (res) => {
                console.log(res);
                this.setState({
                    productStatus: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    getProductColors = () => {
        fetch(`https://localhost:44376/api/customer/color/getColorByProductId?productId=${this.state.productId}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    colorArr: res
                });

            },
            (err) => {
                console.log(err);
            }
        )
    }

    getProductSizes=()=>{
        fetch(`https://localhost:44376/api/customer/size/getSizeByProduct?id=${this.state.productId}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    size: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    renderProductColors = () => {
        const colors = this.state.colorArr.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            item.colorId === this.state.colorId ?
                <li className="active" key={ idx }><a id={item.colorId} onClick={this.selectColor} href=" #" style={{ backgroundColor: item.colorValue, border: "1px solid" }}> </a></li> :
                <li key={ idx }><a id={item.colorId} onClick={this.selectColor} href=" #" style={{ backgroundColor: item.colorValue, border: "1px solid" }}> </a></li>
        );

        return colors;
    }

    renderProductSizes = () => {
        // console.log(this.state.size);
        const sizes = this.state.size.map((item, idx) => 
                // eslint-disable-next-line jsx-a11y/anchor-has-content
            item.sizeId === this.state.sizeId ?
                <li className="active" key={idx}><a id={item.sizeId} onClick={this.selecSize} href=" #">{item.name}</a></li> :
                <li key={idx}><a id={item.sizeId} onClick={this.selecSize} href=" #">{item.name}</a></li>
        );

        return sizes;
    }

    selectColor = (e) => {
        let colorId = e.target.id;
        this.props.selectColor(colorId);

        this.setState({
            colorId: colorId
        }, () => {
            this.getSelectSize();
        });
    }

    selecSize =(e)=>{
        let sizeId= e.target.id;
        // this.props.selectSize(sizeId);

        this.setState({
            sizeId: sizeId
        }, () => {
            this.getSelectSize();
        });
    }

    getSelectSize=()=>{
        if(this.state.colorId !== '00000000-0000-0000-0000-000000000000' && this.state.sizeId !== '00000000-0000-0000-0000-000000000000')
        {
            console.log(`https://localhost:44376/api/customer/productsize/getQuatityBySelect?colorId=${this.state.colorId}&sizeId=${this.state.sizeId}&productId=${this.state.productId}`);
            fetch(`https://localhost:44376/api/customer/productsize/getQuatityBySelect?colorId=${this.state.colorId}&sizeId=${this.state.sizeId}&productId=${this.state.productId}`)
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res);
                    this.setState({
                        quantity: res
                    });
                },
                (err) => {
                    console.log(err);
                }
            )
        }
        
    }    

    addToCart = () => {
        if(window.$("#txtsl").val() === '')
        {
            this.setState({
                thongbao: 'Vui lòng nhập số lượng'
            })
        }
        else
        {
            if(this.state.colorId === '00000000-0000-0000-0000-000000000000' || this.state.sizeId === '00000000-0000-0000-0000-000000000000')
            {
                this.setState({
                    thongbao: 'Vui lòng chọn size và màu!'
                })
            }
            else
            {
                if(window.$("#txtsl").val() <= 0)
                {
                    this.setState({
                        thongbao: 'Số lượng phải lớn hơn 0!'
                    })
                }
                else
                {
                    if(window.$("#txtsl").val() > this.state.quantity)
                    {
                        this.setState({
                            thongbao: 'Số lượng tồn không đủ!'
                        })
                    }
                    else
                    {
                        this.setState({
                            thongbao: ''
                        })
                        
                        //Thêm vào giỏ hàng
                        let list = JSON.parse(localStorage.getItem("cart")) == null ? [] : JSON.parse(localStorage.getItem("cart"));
                        let checkExisted = list.find(item => item.productId === this.state.productId && item.colorId === this.state.colorId && item.sizeId === this.state.sizeId);
                        

                        if(checkExisted === undefined)
                        {
                            let item = {
                                productId: this.state.productId,
                                colorId: this.state.colorId,
                                sizeId: this.state.sizeId,
                                quantity: parseInt(window.$("#txtsl").val())
                            }
                            list.push(item);
                        }
                        else
                        {
                            let index = list.findIndex(item => item.productId === this.state.productId && item.colorId === this.state.colorId && item.sizeId === this.state.sizeId);
                            list[index].quantity += 1;
                        }
                        
                        localStorage.setItem("cart", JSON.stringify(list));
                        window.location.reload();
                    }
                }
            }
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            productId: nextProps.itemId,
            colorId: nextProps.colorId
        }, () => {
            this.getProductColors();
            // console.log(this.state)
            this.getProductSizes();

            this.getSelectSize();

            this.getProductStatus();
        });
    }

    componentDidMount = () => {
        // window.$("#txt-thongbao").hide();
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="product-body">
                    <div className="product-label">
                        {/* <span>New</span> */}
                        { this.props.itemDiscount === null || this.props.itemDiscount === 0 ? '' : <span className="sale">-{ this.props.itemDiscount }%</span>}
                    </div>
                    <h2 className="product-name">{this.props.itemName}</h2>
                    { 
                        this.props.itemDiscount === null ?
                        <h3 className="product-price"><NumberFormat value={this.props.itemPrice} displayType={'text'} thousandSeparator={true}/>₫</h3> :
                        <h3 className="product-price">{this.props.itemPrice - (this.props.itemPrice * this.props.itemDiscount / 100)} <del className="product-old-price">₫{this.props.itemPrice}</del></h3>
                    }
                    {/* <div>
                        <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                        </div>
                        <a href=" #">3 Review(s) / Add Review</a>
                    </div> */}
                    <p><strong>Còn tồn:</strong> <b>{this.state.quantity}</b> sản phẩm</p>
                    <p><strong>Thương hiệu:</strong> {this.props.itemBrand}</p>
                    <p>{this.props.itemDetail}</p>
                    <div className="product-options">
                        <ul className="size-option">
                            <li><span className="text-uppercase"><b>Size:</b></span></li>
                            {this.renderProductSizes()}
                            {/* <li className="active"><a href=" #">S</a></li>
                            <li><a href=" #">XL</a></li>
                            <li><a href=" #">SL</a></li> */}
                        </ul>
                        <ul className="color-option">
                            <li><span className="text-uppercase"><b>Màu:</b></span></li>
                            {this.renderProductColors()}
                            {/* <li className="active"><a href=" #" style={{backgroundColor: '#475984'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#8A2454'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#BF6989'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#9A54D8'}}> </a></li> */}
                        </ul>
                    </div>

                    <div className="product-btns">
                        <div className="qty-input">
                            <span className="text-uppercase"><b>Số lượng mua: </b></span>
                            <input className="input" id="txtsl" type="number" defaultValue="1" min="1"/>
                        </div>
                        { this.state.productStatus.statusName === "Khoá" ?
                            <button className="primary-btn add-to-cart" onClick={this.addToCart} disabled style={{background: "#808080"}}><i className="fa fa-shopping-cart"></i> Sản phẩm đã bỏ mẫu</button> :
                            <button className="primary-btn add-to-cart" onClick={this.addToCart}><i className="fa fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
                        }
                        
                        {/* <div className="pull-right">
                            <button className="main-btn icon-btn"><i className="fa fa-heart"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-exchange"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-share-alt"></i></button>
                        </div> */}
                    </div>
                            
                    <br />
                    <h4 id="txt-thongbao" style={{color: "red"}}>{this.state.thongbao}</h4>
                </div>
            </div>
        );
    }
}

export default ProductInfo;