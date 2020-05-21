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
    public class SizeController : ControllerBase
    {
        SizeService sizeService = new SizeService();

        [HttpGet]
        [Route("getSizes")] //api/customer/brand/getBrands
        public async Task<IActionResult> GetSizes()
        {
            return Ok(await sizeService.GetAll());
        }

        [HttpGet]
        [Route("getDistinctSizes")] //api/customer/brand/getBrands
        public async Task<IActionResult> GetDistinctSizes()
        {
            return Ok(await sizeService.GetDistinctSizes());
        }

        [HttpGet]
        [Route("getSizeById")]
        public async Task<IActionResult> GetSizeById(Guid id)
        {
            return Ok(await sizeService.GetById(id));
        }
        [HttpGet]
        [Route("getSizeByProduct")]
        public async Task<IActionResult> GetSizesByProductId(Guid id)
        {
            return Ok(await sizeService.GetSizesByProductId(id));
        }

        [HttpGet]
        [Route("getSizebyId")]
        public async Task<IActionResult> GetNameSizeById(Guid sizeId)
        {
            return Ok(await sizeService.GetSizeById(sizeId));
        }
        [HttpGet]
        [Route("getSizebyTypeSize")]
        public async Task<IActionResult> GetSizesByTypeSizeId(Guid typeSizeId)
        {
            return Ok(await sizeService.GetSizesByTypeSizeId(typeSizeId));
        }
    }
}