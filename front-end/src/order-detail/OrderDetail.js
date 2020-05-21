import React from 'react';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Main from './main/Main'
import ProductNavigation from '../navigation/ProductNavigation';

class OrderDetail extends React.Component{

    render() {
        return (
            <div>
                <ProductNavigation></ProductNavigation>
               
                <Breadcrumb></Breadcrumb>
    
                {/* <!-- section --> */}
                <div className="section">
                    {/* <!-- container --> */}
                    <div className="container">
                        {/* <!-- row --> */}
                        <div className="row">
                            <Main></Main>
                        </div>
                        {/* <!-- /row --> */}
                    </div>
                    {/* <!-- /container --> */}
                </div>
                {/* <!-- /section --> */}
            </div>
            // </div>
        );
    }
}
export default OrderDetail;