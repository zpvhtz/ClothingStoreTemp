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
    public class ProductTypeController : ControllerBase
    {
        ProductTypeService productTypeService = new ProductTypeService();

        [HttpGet]
        [Route("getProductTypes")] //api/customer/producttype/getProductTypes
        public async Task<IActionResult> getProductTypes()
        {
            return Ok(await productTypeService.GetAll());
        }

        [HttpGet]
        [Route("getProductTypeById")]
        public async Task<IActionResult> GetProductTypeById(Guid id)
        {
            return Ok(await productTypeService.GetById(id));
        }

        [HttpGet]
        [Route("GetProductTypesByGender")]
        public async Task<IActionResult> GetProductTypesByProductGender(Guid productGenderId)
        {
            return Ok(await productTypeService.GetProductTypesByProductGender(productGenderId));
        }
    }
}