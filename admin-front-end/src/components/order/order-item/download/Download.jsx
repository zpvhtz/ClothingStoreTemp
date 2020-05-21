import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



class Download extends React.Component {
    render() {
        const order = [
            {
                id: this.props.orderId,
                createdDate: this.props.createdDate,
                deliveryDate: this.props.deliveryDate,
                deliveryName: this.props.deliveryName,
                contactPhone: this.props.contactPhone,
                deliveryAddress: this.props.deliveryAddress,
                deliveryEmail: this.props.deliveryEmail,
                deliveryPrice: this.props.deliveryPrice,
                totalPrice: this.props.totalPrice
            }
        ];

        const orderDetail = this.props.orderDetail;

        return (
            <ExcelFile filename={'Đơn hàng ' + this.props.orderId} element={<button className="btn btn-secondary">In</button>}>
                <ExcelSheet data={order} name="Đơn hàng">
                    <ExcelColumn label="ID" value="id"/>
                    <ExcelColumn label="Ngày mua" value="createdDate"/>
                    <ExcelColumn label="Ngày giao" value="deliveryDate"/>
                    <ExcelColumn label="Họ tên" value="deliveryName"/>
                    <ExcelColumn label="SĐT" value="contactPhone"/>
                    <ExcelColumn label="Địa chỉ" value="deliveryAddress"/>
                    <ExcelColumn label="Email" value="deliveryEmail"/>
                    <ExcelColumn label="Phí ship" value="deliveryPrice"/>
                    <ExcelColumn label="Tổng tiền" value="totalPrice"/>
                </ExcelSheet>
                <ExcelSheet data={orderDetail} name="Chi tiết đơn hàng">
                    <ExcelColumn label="Sản phẩm" value="name"/>
                    <ExcelColumn label="Màu" value="colorName"/>
                    <ExcelColumn label="Size" value="sizeName"/>
                    <ExcelColumn label="Số lượng" value="quantity"/>
                    <ExcelColumn label="Đơn giá" value="price"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default Download;