using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class StatisticsService
    {
        StatisticsRepository statisticsRepository = new StatisticsRepository();

        public async Task<MonthlyEarningsVM> GetMonthlyEarnings()
        {
            return await statisticsRepository.GetMonthlyEarnings();
        }

        public async Task<YearlyEarningsVM> GetYearlyEarnings()
        {
            return await statisticsRepository.GetYearlyEarnings();
        }

        public async Task<CompletedPercentageVM> GetCompletedPercentage()
        {
            return await statisticsRepository.GetCompletedPercentage();
        }

        public async Task<PendingOrdersVM> GetPendingOrders()
        {
            return await statisticsRepository.GetPendingOrders();
        }

        public async Task<IncomesVM> CalculateIncomes(DateTime fromDate, DateTime toDate)
        {
            return await statisticsRepository.CalculateIncomes(fromDate, toDate);
        }
    }
}