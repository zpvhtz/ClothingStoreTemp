using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    [Route("api/customer/[controller]")]
    [ApiController]
    public class ProductSizeController : Controller
    {
        ProductSizeService productSizeService = new ProductSizeService();
        public IActionResult Index()
        {
            return View();
        }
        //select color, size
        [HttpGet]
        [Route("getQuatityBySelect")]
        public async Task<IActionResult> GetQuatityBySelect(Guid colorId, Guid sizeId, Guid productId)
        {
            return Ok(await productSizeService.GetQuatityBySelect(colorId, sizeId, productId));
        }


    }
}