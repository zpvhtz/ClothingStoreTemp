using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        ColorService colorService = new ColorService();

        [HttpGet]
        [Route("getColors")] //api/customer/product/getProducts
        public async Task<IActionResult> GetColors()
        {
            return Ok(await colorService.GetAll());
        }

        [HttpGet]
        [Route("getColorById")]
        public async Task<IActionResult> GetColorById(Guid id)
        {
            return Ok(await colorService.GetById(id));
        }

        [HttpGet]
        [Route("getColorByProductId")]
        public async Task<IActionResult> GetColorByProductId(Guid productId)
        {
            return Ok(await colorService.GetColorByProductId(productId));
        }
    }
}