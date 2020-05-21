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
    public class ProductSizeController : ControllerBase
    {
        ProductSizeService productSizeService = new ProductSizeService();

        [HttpGet]
        [Route("getProductSizes")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await productSizeService.GetAll());
        }

        [HttpGet]
        [Route("getProductSizeById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await productSizeService.GetById(id));
        }

        [HttpGet]
        [Route("getExtendedProductSizeInfoByAllId")]
        public async Task<IActionResult> GetExtendedProductSizeInfoByAllId(Guid colorId, Guid sizeId, Guid productId)
        {
            return Ok(await productSizeService.GetExtendedProductSizeInfoByAllId(colorId, sizeId, productId));
        }
    }
}