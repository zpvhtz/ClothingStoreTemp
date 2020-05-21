import React from 'react';

class Connect extends React.Component {

    render() {
        return (
            // {/* <!-- footer subscribe --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer">
                    <h3 className="footer-header">Nhận tin mỗi ngày</h3>
                    <p>Để cập nhật tin tức về những sản phẩm, khuyến mãi mới nhất, vui lòng cung cấp email của bạn</p>
                    <br></br>
                    <form>
                        <div className="form-group">
                            <input className="input" placeholder="Nhập vào email" />
                        </div>
                        <button className="primary-btn">Đăng ký</button>
                    </form>
                </div>
            </div>
            // {/* <!-- /footer subscribe --> */}
        )
    }
}

export default Connect;