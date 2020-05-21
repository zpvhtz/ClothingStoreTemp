import React, { Component } from "react";

class PendingOrder extends Component {
    state = {
        pendingOrders: []
    }

    getPendingOrders = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };
    
        fetch(`https://localhost:44376/api/admin/statistics/getPendingOrders`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                pendingOrders: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentWillMount = () => {
        this.getPendingOrders();
    };

    render() {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Đơn cần xử lý</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.pendingOrders.numberOfOrders}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PendingOrder;