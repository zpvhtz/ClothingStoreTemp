import React from 'react';

class Breadcrumb extends React.Component{
    render(){
        return(
            <div id="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb">
                    <li><a href="/">Trang chủ</a></li>
                        <li className="active">Đơn hàng của tôi</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;