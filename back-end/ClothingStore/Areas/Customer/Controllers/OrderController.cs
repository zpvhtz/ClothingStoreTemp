using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    [Route("api/customer/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderService orderService = new OrderService();
        private readonly IHostingEnvironment _hostingEnvironment;
        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpPost]
        [Route("createOrder")]
        public async Task<IActionResult> createOrder(Order order)
        {
            return Ok(await orderService.CreateOrder(order));
        }

        [HttpGet]
        [Route("getDetailOrder")]
        public async Task<IActionResult> getDetailOrder(Guid idcustomer)
        {
            return Ok(await orderService.getDetailOrder(idcustomer));
        }

        [HttpGet]
        [Route("getAllCustomerOrders")]
        public async Task<IActionResult> GetAllCustomerOrders(Guid customerId)
        {
            return Ok(await orderService.GetAllCustomerOrders(customerId));
        }

        [HttpGet]
        [Route("getCustomerOrderByOrderId")]
        public async Task<IActionResult> GetCustomerOrderByOrderId(Guid orderId)
        {
            return Ok(await orderService.GetCustomerOrderByOrderId(orderId));
        }

        [HttpPost]
        [Route("cancelOrder")]
        public async Task<IActionResult> CancelOrder([FromBody] Order order)
        {
            return Ok(await orderService.CancelOrder(order));
        }
    }
}