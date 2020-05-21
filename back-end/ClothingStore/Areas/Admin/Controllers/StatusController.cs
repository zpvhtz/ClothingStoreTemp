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
    public class StatusController : ControllerBase
    {
        StatusService statusService = new StatusService();
        [HttpGet]
        [Route("getStatuses")] //api/customer/product/getProducts
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await statusService.GetAll());
        }
    }
}