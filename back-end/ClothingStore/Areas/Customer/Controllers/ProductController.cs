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
    public class ProductController : ControllerBase
    {
        ProductService productService = new ProductService();
        ProductVMService productVMService = new ProductVMService();

        [HttpGet]
        [Route("getProducts")] //api/customer/product/getProducts
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await productVMService.GetAll());
        }

        [HttpGet]
        [Route("getProductById")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            return Ok(await productService.GetById(id));
        }

        [HttpGet]
        [Route("getProductVMs")]
        public async Task<IActionResult> GetProducts(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            return Ok(await productVMService.GetAll(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId));
        }

        [HttpGet]
        [Route("getNumberOfPages")]
        public async Task<IActionResult> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            return Ok(await productVMService.GetNumberOfPages(pageSize, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId));
        }

        [HttpGet]
        [Route("getNew")]
        public async Task<IActionResult> GetNew()
        {
            return Ok(await productVMService.GetNew());
        }

        [HttpGet]
        [Route("getProductVMById")]
        public async Task<IActionResult> GetProductVMById(Guid id, Guid colorId)
        {
            return Ok(await productVMService.GetProductVMById(id, colorId));
        }

        [HttpGet]
        [Route("getProductsForCart")]
        public async Task<IActionResult> GetProductsForCart(string carts)
        {
            return Ok(await productVMService.GetProductsForCart(carts));
        }

        [HttpGet]
        [Route("getBestSeller")]
        public async Task<IActionResult> GetBestSaler()
        {
            return Ok(await productVMService.GetBestSeller());
        }

        [HttpGet]
        [Route("checkProductQuantity")]
        public async Task<IActionResult> CheckProductQuantity(string carts)
        {
            return Ok(await productVMService.CheckProductQuantity(carts));
        }

        [HttpGet]
        [Route("getProductStatus")]
        public async Task<IActionResult> GetProductStatus(Guid productId)
        {
            return Ok(await productVMService.GetProductStatus(productId));
        }
    }
}