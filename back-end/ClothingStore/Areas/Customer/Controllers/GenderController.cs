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
    public class GenderController : ControllerBase
    {
        GenderService genderService = new GenderService();

        [HttpGet]
        [Route("getGenders")] //api/customer/product/getProducts
        public async Task<IActionResult> GetGenders()
        {
            return Ok(await genderService.GetAll());
        }

        [HttpGet]
        [Route("getGenderById")]
        public async Task<IActionResult> GetGenderById(Guid id)
        {
            return Ok(await genderService.GetById(id));
        }
    }
}