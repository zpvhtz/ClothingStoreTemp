import React from 'react';

class Account extends React.Component {
    state = {
        token: [],
        isLoggedIn: false,
        information: []
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation();
            });
        }
    }

    getUserInformation = () => {
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                information: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    UNSAFE_componentWillMount = () => {
        this.checkLoggedIn();
    }

    render() {
        const information = this.state.information;

        return (
            // {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer">
                    <h3 className="footer-header">Tài khoản</h3>
                    <ul className="list-links">
                        { information.length !== 0 ?  '' :  <li><a href="/register"><i className="fa fa-user-plus"></i> Đăng ký</a></li>}
                        { information.length !== 0 ?  <li><a href="/information"><i className="fa fa-user"></i> Thông tin</a></li> :  ''}
                        { information.length !== 0 ?  <li><a href="/order"><i className="fa fa-shopping-bag"></i> Đơn hàng</a></li> :  ''}
                        <li><a href="/cartdetail"><i className="fa fa-check"></i> Thanh toán</a></li>
                    </ul>
                </div>
            </div>
            // {/* <!-- /footer widget --> */}
        )
    }
}

export default Account;