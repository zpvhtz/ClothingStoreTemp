import React, { Component } from "react";
import NumberFormat from "react-number-format";

class MonthlyEarnings extends Component {
    state = {
        monthlyEarnings: []
    }

    getMonthlyEarnings = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };
    
        fetch(`https://localhost:44376/api/admin/statistics/getMonthlyEarnings`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                monthlyEarnings: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentWillMount = () => {
        this.getMonthlyEarnings();
    };

    render() {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Thu nhập (hàng tháng)</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    <NumberFormat value={this.state.monthlyEarnings.earnings} displayType={"text"} thousandSeparator={true}/>₫
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthlyEarnings;
