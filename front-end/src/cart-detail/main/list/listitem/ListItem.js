import React from 'react';
import {
    Link
} from "react-router-dom";
import NumberFormat from "react-number-format";

class ListItem extends React.Component{
    render(){
        let imgUrl="/https://localhost:44376/" + this.props.itemImage;
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div className="section-title">
						<h3 className="title">Chi tiết giỏ hàng</h3>
					</div>
                    <table className="shopping-cart-table table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th></th>
                                <th className="text-center">Đơn giá</th>
                                <th className="text-center">Số lượng</th>
								<th className="text-center">Số tiền</th>
                                <th className="text-center">Giảm giá</th>
								<th className="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="thumb"><img src="./img/thumb-product01.jpg" alt=""/></td>
                                    <td className="details">
                                        <a href="#">Product Name Goes Here</a>
                                        <ul>
                                            <li><span>Size: XL</span></li>
                                            <li><span>Color: Camelot</span></li>
                                        </ul>
                                    </td>
                                    
                                    <td className="price text-center"><del class="font-weak"><small>$40.00</small></del></td>
                                    <td className="qty text-center"><input class="input" type="number" value="1"/></td>
                                    <td className="total text-center"><strong class="primary-color">$32.50</strong></td>
                                    <td className="total text-center"></td>
                                    <td className="text-right"><button class="main-btn icon-btn"><i class="fa fa-close"></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot>
							<tr>
								<th class="empty" colspan="3"></th>
								<th>SUBTOTAL</th>
								<th colspan="2" class="sub-total">$97.50</th>
							</tr>
							<tr>
								<th class="empty" colspan="3"></th>
								<th>SHIPING</th>
								<td colspan="2">Free Shipping</td>
							</tr>
							<tr>
								<th class="empty" colspan="3"></th>
								<th>TOTAL</th>
								<th colspan="2" class="total">$97.50</th>
							</tr>
						</tfoot>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListItem;