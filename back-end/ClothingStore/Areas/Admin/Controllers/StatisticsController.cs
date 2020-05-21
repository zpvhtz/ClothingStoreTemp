using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothingStore.Areas.Admin.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize(Roles = Constrain.CustomRoles.Administrator + "," + Constrain.CustomRoles.XuatKho)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        StatisticsService statisticsService = new StatisticsService();

        [HttpGet]
        [Route("getMonthlyEarnings")]
        public async Task<IActionResult> GetMonthlyEarnings()
        {
            return Ok(await statisticsService.GetMonthlyEarnings());
        }

        [HttpGet]
        [Route("getYearlyEarnings")]
        public async Task<IActionResult> GetYearlyEarnings()
        {
            return Ok(await statisticsService.GetYearlyEarnings());
        }

        [HttpGet]
        [Route("getCompletedPercentage")]
        public async Task<IActionResult> GetCompletedPercentage()
        {
            return Ok(await statisticsService.GetCompletedPercentage());
        }

        [HttpGet]
        [Route("getPendingOrders")]
        public async Task<IActionResult> GetPendingOrders()
        {
            return Ok(await statisticsService.GetPendingOrders());
        }

        [HttpGet]
        [Route("calculateIncomes")]
        public async Task<IActionResult> CalculateIncomes(DateTime fromDate, DateTime toDate)
        {
            return Ok(await statisticsService.CalculateIncomes(fromDate, toDate));
        }
    }
}