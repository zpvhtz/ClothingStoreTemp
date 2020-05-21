import React from 'react';

class Breadcrumb extends React.Component {
    render() {
        return (
             // <!-- BREADCRUMB -->
            <div id="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><a href="/">Trang chủ</a></li>
                        <li className="active">Sản phẩm</li>
                    </ul>
                </div>
            </div>
            // <!-- /BREADCRUMB -->
        );
    }
}

export default Breadcrumb;