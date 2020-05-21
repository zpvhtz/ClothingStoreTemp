using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothingStore.Areas.Admin.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize(Roles = Constrain.CustomRoles.Administrator + "," + Constrain.CustomRoles.XuatKho)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderService orderService = new OrderService();

        [HttpGet]
        [Route("getOrders")]
        public async Task<IActionResult> GetOrders()
        {
            return Ok(await orderService.GetAll());
        }

        [HttpGet]
        [Route("getAdminOrders")]
        public async Task<IActionResult> GetAdminOrders()
        {
            return Ok(await orderService.GetAdminOrders());
        }

        [HttpGet]
        [Route("getOrderById")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            return Ok(await orderService.GetById(id));
        }

        [HttpPost]
        [Route("confirmDeliveryDate")]
        public async Task<IActionResult> ConfirmDeliveryDate([FromBody] ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return Ok(await orderService.ConfirmDeliveryDate(orderConfirmation));
        }

        [HttpPost]
        [Route("editDeliveryDate")]
        public async Task<IActionResult> EditDeliveryDate([FromBody] ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return Ok(await orderService.EditDeliveryDate(orderConfirmation));
        }

        [HttpPost]
        [Route("confirmOrder")]
        public async Task<IActionResult> ConfirmOrder([FromBody] Order order)
        {
            return Ok(await orderService.ConfirmOrder(order));
        }

        [HttpPost]
        [Route("cancelOrder")]
        public async Task<IActionResult> CancelOrder([FromBody] Order order)
        {
            return Ok(await orderService.CancelOrder(order));
        }
    }
}