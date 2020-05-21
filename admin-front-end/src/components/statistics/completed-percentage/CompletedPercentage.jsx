import React, { Component } from "react";

class CompletedPercentage extends Component {
    state = {
        completedPercentage: []
    }

    getCompletedPercentage = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };
    
        fetch(`https://localhost:44376/api/admin/statistics/getCompletedPercentage`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                completedPercentage: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentWillMount = () => {
        this.getCompletedPercentage();
    };

    render() {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tỉ lệ đơn hoàn thành</div>
                        <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.completedPercentage.percentage}%</div>
                            </div>
                            <div className="col">
                            <div className="progress progress-sm mr-2">
                                <div className="progress-bar bg-info" role="progressbar" style={{width: `${this.state.completedPercentage.percentage}%`}} aria-valuenow={this.state.completedPercentage.percentage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompletedPercentage;
