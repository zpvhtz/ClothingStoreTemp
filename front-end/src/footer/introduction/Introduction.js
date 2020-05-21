import React from 'react';

class Introduction extends React.Component {

    render() {
        return (
        //    {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer">
                    {/* <!-- footer logo --> */}
                    <div className="footer-logo">
                        <a className="logo" href="/#">
                            <img src="./img/logo.png" alt="" />
                        </a>
                    </div>
                    {/* <!-- /footer logo --> */}

                    <h4>THEO DÕI E-SHOP TRÊN</h4>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p> */}

                    {/* <!-- footer social --> */}
                    <ul className="footer-social">
                        <li><a href="/#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="/#"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                    {/* <!-- /footer social --> */}
                </div>
            </div>
            // {/* <!-- /footer widget --> */}
        )
    }
}

export default Introduction;