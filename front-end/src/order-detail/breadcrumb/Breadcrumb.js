import React from 'react';

class Breadcrumb extends React.Component{
    render(){
        return(
            <div id="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <a href="/">Trang chủ</a>
                        </li>
                        <li>
                            <a href="/order">Đơn hàng</a>
                        </li>
                        <li className="active">Chi tiết đơn hàng</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;