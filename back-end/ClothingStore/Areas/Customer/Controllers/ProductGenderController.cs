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
    public class ProductGenderController : ControllerBase
    {
        ProductGenderService productGenderService = new ProductGenderService();

        [HttpGet]
        [Route("getProductGenders")] //api/customer/productgender/getProductGenders
        public async Task<IActionResult> GetProductGenders()
        {
            return Ok(await productGenderService.GetAll());
        }

        [HttpGet]
        [Route("getProductGenderById")]
        public async Task<IActionResult> GetProductGenderById(Guid id)
        {
            return Ok(await productGenderService.GetById(id));
        }
    }
}