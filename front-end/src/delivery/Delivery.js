import React from 'react';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Main from './main/Main';
import ProductNavigation from '../navigation/ProductNavigation';
import Spinner from '../spinner/Spinner'

class Delivery extends React.Component{
    render() {
        return (
            <div>
                <Spinner></Spinner>
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
export default Delivery;