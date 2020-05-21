import React from 'react';

class CustomerService extends React.Component {

    render() {
        return (
            // {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer">
                    <h3 className="footer-header">Dịch vụ khách hàng</h3>
                    <ul className="list-links">
                        <li><a href="/#">Về E-SHOP</a></li>
                        <li><a href="/#">Vận chuyển và đổi trả</a></li>
                        <li><a href="/#">Hướng dẫn thanh toán</a></li>
                        <li><a href="/#">FAQ</a></li>
                    </ul>
                </div>
            </div>
            // {/* <!-- /footer widget --> */}
        )
    }
}

export default CustomerService;