import React, { Component } from "react";
import MonthlyEarnings from './statistics/monthly-earnings/MonthlyEarnings';
import YearlyEarnings from './statistics/yearly-earnings/YearlyEarnings';
import CompletedPercentage from './statistics/completed-percentage/CompletedPercentage';
import PendingOrder from './statistics/pending-order/PendingOrder';
import IncomeChart from './statistics/income-chart/IncomeChart';

class Home extends Component {
    state = {};
    UNSAFE_componentWillMount() {
        if (localStorage.getItem("authenticatedTokenAdmin") === null) {
        window.location.href = "/login";
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Trang chủ</h1>
                <div className="row">
                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <MonthlyEarnings></MonthlyEarnings>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <YearlyEarnings></YearlyEarnings>

                    {/* <!-- Completed Percentage Card Example --> */}
                    <CompletedPercentage></CompletedPercentage>

                    {/* <!-- Pending Requests Card Example --> */}
                    <PendingOrder></PendingOrder>
                </div>
                <div className="row">
                    {/* <!-- Area Chart --> */}
                    <IncomeChart></IncomeChart>
                </div>  
            </div>
        );
    }
}

export default Home;
