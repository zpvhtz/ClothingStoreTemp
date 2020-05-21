using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Helpers;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Customer.Controllers
{
    //[Area("Customer")]
    [Authorize]
    [Route("api/customer/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ClothetsStoreContext context;
        private readonly AccountService accountService;

        public AccountController(ClothetsStoreContext context, AccountService accountService)
        {
            this.context = context;
            this.accountService = accountService;
        }

        //[Authorize(Roles = "Khách hàng")] //Test
        [AllowAnonymous]
        [HttpGet]
        [Route("getAccounts")] //api/customer/product/getProducts
        public async Task<IActionResult> GetAccounts()
        {
            return Ok(await accountService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getAccountById")]
        public async Task<IActionResult> GetAccountById(Guid id)
        {
            return Ok(await accountService.GetById(id));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getAccountByUsername")]
        public async Task<IActionResult> GetAccountByUsername(string username)
        {
            return Ok(await accountService.GetAccountByUsername(username));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticateAccount")]
        public async Task<IActionResult> AuthenticateAccount(Account account)
        {
            return Ok(await accountService.AuthenticateAccount(account));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("checkAvailability")]
        public async Task<IActionResult> CheckAvailability(string username)
        {
            return Ok(await accountService.CheckAvailability(username));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("checkEmailAvailability")]
        public async Task<IActionResult> CheckEmailAvailability(string email)
        {
            return Ok(await accountService.CheckEmailAvailability(email));
        }

        [Authorize(Roles = "Khách hàng")]
        [HttpPost]
        [Route("checkOldPasswordByAccountId")]
        public async Task<IActionResult> CheckOldPasswordByAccountId(ValidationAccountVM validationAccount)
        {
            return Ok(await accountService.CheckOldPasswordByAccountId(validationAccount));
        }

        [Authorize(Roles = "Khách hàng")]
        [HttpPost]
        [Route("checkOldPasswordByUsername")]
        public async Task<IActionResult> CheckOldPasswordByUsername(ValidationAccountVM validationAccount)
        {
            return Ok(await accountService.CheckOldPasswordByAccountId(validationAccount));
        }

        [Authorize(Roles = "Khách hàng")]
        [HttpPost]
        [Route("changePasswordByAccountId")]
        public async Task<IActionResult> ChangePasswordByAccountId(ValidationAccountVM validationAccount)
        {
            return Ok(await accountService.ChangePasswordByAccountId(validationAccount));
        }

        [Authorize(Roles = "Khách hàng")]
        [HttpPost]
        [Route("changePasswordByUsername")]
        public async Task<IActionResult> ChangePasswordByUsername(ValidationAccountVM validationAccount)
        {
            return Ok(await accountService.ChangePasswordByUsername(validationAccount));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("createCustomerAccount")]
        public async Task<IActionResult> CreateCustomerAccount([FromBody] Account account)
        {
            return Ok(await accountService.CreateCustomerAccount(account));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("createCustomerAccountAndCustomer")]
        public async Task<IActionResult> CreateCustomerAccountAndCustomer([FromBody] CustomerAccountVM accountCustomer)
        {
            return Ok(await accountService.CreateCustomerAccountAndCustomer(accountCustomer));
        }

        //[AllowAnonymous]
        [HttpPost]
        [Route("validateToken")]
        public async Task<IActionResult> ValidateToken([FromBody] Token token)
        {
            //return Ok();
            return Ok(await accountService.ValidateToken(token));
        }
    }
}