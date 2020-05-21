using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        OrderDetailService orderDetailService = new OrderDetailService();

        [HttpGet]
        [Route("getOrderDetails")]
        public async Task<IActionResult> GetOrders()
        {
            return Ok(await orderDetailService.GetAll());
        }

        [HttpGet]
        [Route("getAllByOrderId")]
        public async Task<IActionResult> GetAllByOrderId(Guid orderId)
        {
            return Ok(await orderDetailService.GetAllByOrderId(orderId));
        }

        [HttpGet]
        [Route("getCustomerOrderDetails")]
        public async Task<IActionResult> GetCustomerOrderDetails(Guid orderId)
        {
            return Ok(await orderDetailService.GetCustomerOrderDetails(orderId));
        }
    }
}