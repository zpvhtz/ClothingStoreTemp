import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Export extends React.Component {
    getIncomes = () => {
        if(this.props.incomesList !== undefined) {
            console.log(this.props.incomesList)
            const incomes = [];

            let fromDate = new Date(this.props.incomesList.fromDate);
            let toDate = new Date(this.props.incomesList.toDate);

            if(this.props.incomesList.incomesByDays === null) {
                this.props.incomesList.incomesByMonths.forEach(ele => {
                    let date = new Date(Object.keys(ele));
                    incomes.push({
                        date: new Date(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`),
                        incomes: parseFloat(Object.values(ele))
                    });
                }); 
        
                return (
                    <ExcelFile filename={`ThongKe(${this.props.incomesList.fromDate}-${this.props.incomesList.toDate})`} element={<button className="btn btn-secondary">In</button>}>
                        <ExcelSheet data={incomes} name="Thống kê">
                            <ExcelColumn label="Ngày" value="date"/>
                            <ExcelColumn label="Thu nhập" value="incomes"/>
                        </ExcelSheet>
                    </ExcelFile>
                );
            }
            else {
                this.props.incomesList.incomesByDays.forEach(ele => {
                    let date = new Date(Object.keys(ele));
                    incomes.push({
                        date: new Date(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`),
                        incomes: parseFloat(Object.values(ele))
                    });
                }); 
        
                return (
                    <ExcelFile filename={`ThongKe(${new Date(this.props.incomesList.fromDate)}-${this.props.incomesList.toDate})`} element={<button type="button" className="btn btn-secondary">In</button>}>
                        <ExcelSheet data={incomes} name="Thống kê">
                            <ExcelColumn label="Ngày" value="date"/>
                            <ExcelColumn label="Thu nhập" value="incomes"/>
                        </ExcelSheet>
                    </ExcelFile>
                );
            }
        }
        
    }

    render() {       

        return (
            <div style={{float: "right"}}>
                {this.getIncomes()}
            </div>
        );
    }
}

export default Export;