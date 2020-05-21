using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class StatisticsRepository
    {
        private readonly ClothetsStoreContext ctx;

        public StatisticsRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public StatisticsRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<MonthlyEarningsVM> GetMonthlyEarnings()
        {
            List<Order> orders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                .ToListAsync();

            decimal totalEarnings = orders.Sum(o => o.TotalPrice);

            DateTime firstDate = orders.OrderBy(o => o.DeliveryDate)
                                       .Select(o => o.DeliveryDate)
                                       .FirstOrDefault();

            DateTime now = DateTime.Now;

            int months = ((now.Year - firstDate.Year) * 12) + now.Month - firstDate.Month;

            MonthlyEarningsVM monthlyEarningsVM = new MonthlyEarningsVM();
            monthlyEarningsVM.Earnings = totalEarnings / months;

            return monthlyEarningsVM;
        }

        public async Task<YearlyEarningsVM> GetYearlyEarnings()
        {
            List<Order> orders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                .ToListAsync();

            decimal totalEarnings = orders.Sum(o => o.TotalPrice);

            DateTime firstDate = orders.OrderBy(o => o.DeliveryDate)
                                       .Select(o => o.DeliveryDate)
                                       .FirstOrDefault();

            DateTime now = DateTime.Now;

            int years = now.Year - firstDate.Year + 1;

            YearlyEarningsVM yearlyEarningsVM = new YearlyEarningsVM();
            yearlyEarningsVM.Earnings = totalEarnings / years;

            return yearlyEarningsVM;
        }

        public async Task<CompletedPercentageVM> GetCompletedPercentage()
        {
            int completedOrders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                 .CountAsync();

            int allOrders = await ctx.Order.Where(o => o.StatusId != Guid.Parse("C9137E0B-0E56-4F96-8916-5DBF76B15736")) //Đã huỷ
                                           .CountAsync();

            CompletedPercentageVM completedPercentageVM = new CompletedPercentageVM();
            completedPercentageVM.Percentage = int.Parse(Math.Round(((float)completedOrders / allOrders) * 100).ToString());

            return completedPercentageVM;
        }

        public async Task<PendingOrdersVM> GetPendingOrders()
        {
            int incompletedOrders = await ctx.Order.Where(o => o.StatusId != Guid.Parse("C9137E0B-0E56-4F96-8916-5DBF76B15736") && o.StatusId != Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã huỷ
                                                   .CountAsync();

            PendingOrdersVM pendingOrdersVM = new PendingOrdersVM();
            pendingOrdersVM.numberOfOrders = incompletedOrders;

            return pendingOrdersVM;
        }

        public async Task<IncomesVM> CalculateIncomes(DateTime fromDate, DateTime toDate)
        {
            IncomesVM incomesVM = new IncomesVM();

            if (fromDate == DateTime.Parse("01/01/0001") || toDate == DateTime.Parse("01/01/0001"))
            {
                fromDate = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                          .OrderBy(o => o.DeliveryDate)
                                          .Select(o => o.DeliveryDate)
                                          .FirstOrDefaultAsync();

                toDate = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                        .OrderByDescending(o => o.DeliveryDate)
                                        .Select(o => o.DeliveryDate)
                                        .FirstOrDefaultAsync();

                
                incomesVM.FromDate = fromDate;
                incomesVM.ToDate = toDate;
            }
            else
            {
                incomesVM.FromDate = fromDate;
                incomesVM.ToDate = toDate;
            }

            incomesVM.TotalIncomes = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                    .Select(o => o.TotalPrice)
                                                    .SumAsync();

            if(incomesVM.FromDate.Month == incomesVM.ToDate.Month && incomesVM.FromDate.Year == incomesVM.ToDate.Year)
            {
                incomesVM.IncomesByDays = await CalculateIncomesByDays(incomesVM.FromDate, incomesVM.ToDate);
            }
            else
            {
                incomesVM.IncomesByMonths = await CalculateIncomesByMonths(incomesVM.FromDate, incomesVM.ToDate);
            }

            return incomesVM;
        }

        public async Task<List<Dictionary<DateTime, decimal>>> CalculateIncomesByMonths(DateTime fromDate, DateTime toDate)
        {
            List<Dictionary<DateTime, decimal>> listIncomes = new List<Dictionary<DateTime, decimal>>();

            while(fromDate.Month != toDate.Month || fromDate.Year != toDate.Year)
            {
                decimal incomes = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA") && o.DeliveryDate.Month == fromDate.Month && o.DeliveryDate.Year == fromDate.Year)
                                                 .Select(o => o.TotalPrice)
                                                 .SumAsync();

                Dictionary<DateTime, decimal> keyValuePairs = new Dictionary<DateTime, decimal>();
                keyValuePairs.Add(fromDate, incomes);

                listIncomes.Add(keyValuePairs);

                fromDate = fromDate.AddMonths(1);
            }

            return listIncomes;
        }

        public async Task<List<Dictionary<DateTime, decimal>>> CalculateIncomesByDays(DateTime fromDate, DateTime toDate)
        {
            List<Dictionary<DateTime, decimal>> listIncomes = new List<Dictionary<DateTime, decimal>>();

            while (fromDate.Day != toDate.Day)
            {
                decimal incomes = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA") && o.DeliveryDate.Day == fromDate.Day && o.DeliveryDate.Month == fromDate.Month && o.DeliveryDate.Year == fromDate.Year)
                                                 .Select(o => o.TotalPrice)
                                                 .SumAsync();

                Dictionary<DateTime, decimal> keyValuePairs = new Dictionary<DateTime, decimal>();
                keyValuePairs.Add(fromDate, incomes);

                listIncomes.Add(keyValuePairs);

                fromDate = fromDate.AddDays(1);
            }

            return listIncomes;
        }
    }
}
