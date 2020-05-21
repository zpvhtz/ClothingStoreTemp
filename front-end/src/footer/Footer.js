import React from 'react';
import Introduction from './introduction/Introduction'
import Account from './account/Account'
import CustomerService from './customer-service/CustomerService'
import Connect from './connect/Connect'

function Footer() {
     return (
            // {/* <!-- FOOTER --> */}
            <footer id="footer" className="section section-grey">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        <Introduction></Introduction>
                        <Account></Account>
                        <div className="clearfix visible-sm visible-xs"></div>
                        <CustomerService></CustomerService>
                        <Connect></Connect>
                    </div>
                    {/* <!-- /row --> */}
                    <hr />
                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center">
                            {/* <!-- footer copyright --> */}
                            <div className="footer-copyright">
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                            </div>
                            {/* <!-- /footer copyright --> */}
                        </div>
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            {/* <!-- /FOOTER --> */}
        </footer>
    );
}

export default Footer;
