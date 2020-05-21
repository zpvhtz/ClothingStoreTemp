import React from 'react';
import Search from './search/Search'
import Account from './account/Account'
import Top from './top/Top'

function Header() {
    return (
        // <!-- HEADER -->
        <div>
            <Top></Top>

            {/* <!-- header --> */}
            <div id="header">
                <div className="container">
                    <div className="pull-left">
                        {/* <!-- Logo --> */}
                        <div className="header-logo">
                            <a className="logo" href="/#">
                                <img src="/assets/img/logo.png" alt="" />
                            </a>
                        </div>
                        {/* <!-- /Logo --> */}

                        <Search></Search>
                    </div>
                    <Account></Account>
                </div>
                {/* <!-- header --> */}
            </div>
            {/* <!-- container --> */}
            
        </div>
        // {/* <!-- /HEADER --> */}
    )
}

export default Header;