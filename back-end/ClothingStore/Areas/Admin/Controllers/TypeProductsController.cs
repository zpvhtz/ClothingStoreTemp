using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class TypeProductsController : ControllerBase
    {
        TypeProductService typeProductService = new TypeProductService();
        // GET: api/TypeProducts
        [HttpGet]
        public async Task<IActionResult> GetTypeProduct()
        {
            IList<TypeProduct> typeProducts = await typeProductService.GetAll();
            List<TypeProductVM> typeProductVMs = new List<TypeProductVM>();
            foreach (var item in typeProducts)
            {
                typeProductVMs.Add(new TypeProductVM() { Name = item.Name, TypeProductId = item.TypeProductId, ProductGenderId = item.ProductGenderId });
            }
            return Ok(typeProductVMs);
        }

    }
}