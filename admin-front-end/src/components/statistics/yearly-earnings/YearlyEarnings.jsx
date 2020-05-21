import React, { Component } from "react";
import NumberFormat from "react-number-format";

class YearlyEarnings extends Component {
    state = {
        yearlyEarnings: []
    }

    getYearlyEarnings = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };
    
        fetch(`https://localhost:44376/api/admin/statistics/getYearlyEarnings`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                yearlyEarnings: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentWillMount = () => {
        this.getYearlyEarnings();
    };

    render() {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Thu nhập (hàng năm)</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    <NumberFormat value={this.state.yearlyEarnings.earnings} displayType={"text"} thousandSeparator={true}/>₫
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default YearlyEarnings;
