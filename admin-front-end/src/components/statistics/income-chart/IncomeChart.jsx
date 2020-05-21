import React, { Component } from "react";
import Export from './export/Export.jsx';
import CanvasJSReact from '../../../assets/canvasjs.react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import useChartConfig from 'hooks/useChartConfig';

class IncomeChart extends Component {
    state = {
        completedPercentage: [],
        incomes: []
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

    getIncomes = () => {
        const options = {
            headers: {
                Authorization:
                "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
            }
        };

        let fromDate = this.refs.fromDate.value === "" ? "01/01/0001" : this.refs.fromDate.value;
        let toDate = this.refs.toDate.value === "" ? "01/01/0001" : this.refs.toDate.value;
    
        fetch(`https://localhost:44376/api/admin/statistics/calculateIncomes?fromDate=${fromDate}&toDate=${toDate}`, options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                incomes: res
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    clearDate = () => {
        window.$("#fromDate").attr("max", null);
        window.$("#toDate").attr("min", null);

        window.$("#fromDate").val(null);
        window.$("#toDate").val(null);
    }

    onChangeToDate = () => {        
        // window.$("#fromDate").val(this.refs.toDate.value);
        window.$("#fromDate").attr("max", this.refs.toDate.value);
    }

    onChangeFromDate = () => {
        // window.$("#toDate").val(this.refs.fromDate.value);
        window.$("#toDate").attr("min", this.refs.fromDate.value);
    }

    calculateIncomes = () => {
        let fromDate = this.refs.fromDate.value;
        let toDate = this.refs.toDate.value;

        if(fromDate === "" || toDate === "") {
            MySwal.fire({
                title: "Thông báo",
                width: 300,
                padding: "2em",
                html:
                  "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng chọn khoảng thời gian</p>"
            });
        }
        else {
            this.getIncomes();
        }
    }

    renderIncomes = () => {
        if(this.state.incomes.length !== 0) {
            //fromDate
            let value = new Date(this.state.incomes.fromDate);
            let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
            let year = value.getFullYear();
            let fromDate = `${date}-${month}-${year}`;

            value = new Date(this.state.incomes.toDate);
            date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
            year = value.getFullYear();
            let toDate = `${date}-${month}-${year}`;
            
            let incomesData = [];
            if(this.state.incomes.incomesByDays === null) {
                this.state.incomes.incomesByMonths.forEach(ele => {
                    let date = new Date(Object.keys(ele));
                    incomesData.push({
                        x: new Date(date.getFullYear(), date.getMonth()),
                        y: parseFloat(Object.values(ele))
                    });
                });

                const options = {
                    animationEnabled: true,
                    title:{
                        text: this.state.incomes.incomesByDays === null ? `Thu nhập theo tháng (${fromDate} - ${toDate})` : `Thu nhập theo ngày (${fromDate} - ${toDate})`,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    axisX: {
                        valueFormatString: "MM",
                        intervalType: 'month',
                        interval: 1,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    axisY: {
                        title: "Tổng tiền (₫)",
                        suffix: "₫",
                        includeZero: true,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    data: [{
                        yValueFormatString: "#,###₫",
                        xValueFormatString: "MMMM",
                        type: "spline",
                        dataPoints: incomesData,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    }]
                }
    
                return <CanvasJSChart options = {options} />
            }
            else {
                this.state.incomes.incomesByDays.forEach(ele => {
                    let date = new Date(Object.keys(ele));
                    incomesData.push({
                        x: new Date(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`),
                        y: parseFloat(Object.values(ele))
                    });
                });
                
                const options = {
                    animationEnabled: true,
                    title:{
                        text: this.state.incomes.incomesByDays === null ? `Thu nhập theo tháng (${fromDate} - ${toDate})` : `Thu nhập theo ngày (${fromDate} - ${toDate})`,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    axisX: {
                        valueFormatString: "DD",
                        intervalType: "day",
                        interval: 1,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    axisY: {
                        title: "Tổng tiền (₫)",
                        suffix: "₫",
                        includeZero: true,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    },
                    data: [{
                        yValueFormatString: "#,###₫",
                        xValueFormatString: "DD",
                        type: "spline",
                        dataPoints: incomesData,
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
                        setInterval: 1
                    }]
                }
    
                return <CanvasJSChart options = {options} />
            }
        }
    }

    componentWillMount = () => {
        this.getCompletedPercentage();
    };

    componentDidMount = () => {
        this.getIncomes();
    }

    render() {        
        return (
            <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Tổng quan thu nhập</h6>
                        {/* <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="/#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Dropdown Header:</div>
                                <a className="dropdown-item" href="/#">Action</a>
                                <a className="dropdown-item" href="/#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/#">Something else here</a>
                            </div>
                        </div> */}
                    </div>
                    {/* <div id="chartContainer">

                    </div> */}
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <div className="overviewSelection">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1" style={{backgroundColor: "#4e73df", color: "#FFF"}}>Từ ngày</span>
                                            </div>
                                            <input id="fromDate" type="date" className="form-control" placeholder="Từ ngày" aria-label="fromDate" aria-describedby="basic-addon1" ref="fromDate" onChange={this.onChangeFromDate}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1" style={{backgroundColor: "#4e73df", color: "#FFF"}}>Đến ngày</span>
                                            </div>
                                            <input id="toDate" type="date" className="form-control" placeholder="Đến ngày" aria-label="toDate" aria-describedby="basic-addon1" ref="toDate" onChange={this.onChangeToDate}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-">
                                        <button type="button" className="btn btn-info" onClick={this.clearDate}>Làm mới</button>
                                        &nbsp;
                                        <button type="button" className="btn btn-success" onClick={this.calculateIncomes}>Tính thu nhập</button>
                                        &nbsp;
                                        {/* <button type="button" className="btn btn-secondary" onClick={this.validateDate}>In</button> */}
                                        { this.state.incomes.length !== 0 ? 
                                            <Export incomesList={this.state.incomes}></Export> :
                                            // <button>A</button> :
                                            ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        {this.renderIncomes()}
                    </div>
                </div>
            </div>
        );
    }
}

export default IncomeChart;