using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.Helpers;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService accountService;
        public AccountController(AccountService accountService)
        {
            this.accountService = accountService;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("authenticateAccount")]
        public async Task<IActionResult> AuthenticateAccount([FromBody]Account account)
        {
            return Ok(await accountService.AuthenticateAccountEmployee(account));
        }

        [HttpGet]
        [Route("checkRole")]
        public ActionResult<string> CheckRole()
        {
            var currentUser = HttpContext.User;
            string role = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
            return Ok(role);
        }
    }
}