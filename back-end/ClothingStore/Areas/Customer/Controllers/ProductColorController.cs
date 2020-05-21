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
    public class ProductColorController : ControllerBase
    {
        ProductColorService productColorService = new ProductColorService();

        [HttpGet]
        [Route("getProductColors")] //api/customer/product/getProducts
        public async Task<IActionResult> GetColors()
        {
            return Ok(await productColorService.GetAll());
        }

        [HttpGet]
        [Route("getProductColorById")]
        public async Task<IActionResult> GetColorById(Guid id)
        {
            return Ok(await productColorService.GetById(id));
        }
    }
}