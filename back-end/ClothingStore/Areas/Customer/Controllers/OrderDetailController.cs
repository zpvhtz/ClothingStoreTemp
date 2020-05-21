using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    [Route("api/customer/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        OrderDetailService orderDetailService = new OrderDetailService();

        [HttpGet]
        [Route("getCustomerOrderDetails")]
        public async Task<IActionResult> GetCustomerOrderDetails(Guid orderId)
        {
            return Ok(await orderDetailService.GetCustomerOrderDetails(orderId));
        }
    }
}