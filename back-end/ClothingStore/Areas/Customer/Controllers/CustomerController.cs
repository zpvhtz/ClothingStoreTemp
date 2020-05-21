using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Authorize]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        CustomerService customerService = new CustomerService();

        [AllowAnonymous]
        [HttpGet]
        [Route("getCustomers")] //api/customer/customer/getCustomers
        public async Task<IActionResult> GetCustomers()
        {
            return Ok(await customerService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getCustomerById")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            return Ok(await customerService.GetById(id));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("createCustomerWithAccountId")]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerVM customer)
        {
            return Ok(await customerService.CreateCustomerWithAccountId(customer));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("createCustomerWithUsername")]
        public async Task<IActionResult> CreateCustomerWithUsername([FromBody] CustomerVM customer)
        {
            return Ok(await customerService.CreateCustomerWithUsername(customer));
        }

        [Authorize(Roles = "Khách hàng")]
        [HttpPost]
        [Route("updateCustomerInformation")]
        public async Task<IActionResult> UpdateCustomerInformation(Models.Customer customer)
        {
            return Ok(await customerService.UpdateCustomerInformation(customer));
        }
    }
}