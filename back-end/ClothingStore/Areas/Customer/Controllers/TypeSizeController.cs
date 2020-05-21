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
    public class TypeSizeController : ControllerBase
    {
        TypeSizeService sizeService = new TypeSizeService();
        [HttpGet]
        [Route("getTypeSizes")] //api/customer/brand/getBrands
        public async Task<IActionResult> GetSizes()
        {
            return Ok(await sizeService.GetAll());
        }
    }
}