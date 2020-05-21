using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class IncomesVM
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal TotalIncomes { get; set; }
        public List<Dictionary<DateTime, decimal>> IncomesByMonths { get; set; }
        public List<Dictionary<DateTime, decimal>> IncomesByDays { get; set; }
    }
}
