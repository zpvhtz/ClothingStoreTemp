import React from 'react';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Order from './order/Order';
import ProductNavigation from '../navigation/ProductNavigation';

class Cart extends React.Component{

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
                            <Order></Order>
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
export default Cart;