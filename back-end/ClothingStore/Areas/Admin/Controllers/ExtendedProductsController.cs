using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using Services;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using ClothingStore.Areas.Admin.Helper;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize(Roles = Constrain.CustomRoles.Administrator + "," + Constrain.CustomRoles.NhapKho)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ExtendedProductsController : ControllerBase
    {
        private readonly IHostingEnvironment _env;
        ProductService productService = new ProductService();
        ProductColorService productColorService = new ProductColorService();
        ProductSizeService productSizeService = new ProductSizeService();
        ExtendedProductService extendedProductService = new ExtendedProductService();
        public ExtendedProductsController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetExtendedProduct()
        {
            var listProduct = await productService.GetAll();
            var listProductColor = await productColorService.GetAll();
            var listProductSize = await productSizeService.GetAll();
            Guid statusIdKhoa = new Guid("1C55F3C2-D7ED-4B82-8F18-480062D092A1");
            List<ExtendedProductVM> listExtendedProduct = new List<ExtendedProductVM>();
            foreach (var product in listProduct.Where(m => m.StatusId != statusIdKhoa))
            {
                IList<ProductColorVM> listProductColorVM = listProductColor
                    .Where(m => m.ProductId == product.ProductId)
                    .Select(m => new ProductColorVM()
                    {
                        Color = new ColorVM() { ColorId = m.ColorId, ColorValue = m.Color.ColorValue, Name = m.Color.Name },
                        ImageUrl = m.ImageUrl,
                        ListProductSize = listProductSize
                        .Where(n => n.ColorId == m.ColorId && n.ProductId == m.ProductId)
                        .Select(n => new ProductSizeVM() { InventoryQuantity = n.InventoryQuantity, Size = new SizeVM() { SizeId = n.SizeId, Name = n.Size.Name } }).ToList()
                    }).ToList();
                ExtendedProductVM extendedProduct = new ExtendedProductVM
                {
                    ProductId = product.ProductId,
                    Code = product.Code,
                    Name = product.Name,
                    TypeProduct = new TypeProductVM() { Name = product.TypeProduct.Name, TypeProductId = product.TypeProductId },
                    Price = product.Price,
                    Detail = product.Detail,
                    Discount = product.Discount,
                    CreatedDate = product.CreatedDate,
                    Brand = new BrandVM() { Name = product.Brand.Name, BrandId = product.Brand.BrandId },
                    Status = new StatusVM() { Name = product.Status.Name, StatusId = product.Status.StatusId },
                    ListProductColor = listProductColorVM
                };
                listExtendedProduct.Add(extendedProduct);
            }
            listExtendedProduct = listExtendedProduct.OrderByDescending(m => m.CreatedDate).ToList();

            return Ok(listExtendedProduct);
        }
        [HttpPost]
        [Route("changeStatus")]
        public async Task<ActionResult> ChangeStatus(Product product)
        {
            var statusIdChange = productService.ChangeStatus(product.ProductId, product.StatusId);
            if (statusIdChange.ToString() == product.StatusId.ToString())
            {
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExtendedProductVM>> GetExtendedProduct(Guid id)
        {
            var product = await productService.GetById(id);
            var listProductColor = await productColorService.GetByProductId(id);
            var listProductSize = await productSizeService.GetByProductId(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                IList<ProductColorVM> listProductColorVM = listProductColor
                                        .Select(m => new ProductColorVM()
                                        {
                                            Color = new ColorVM() { ColorId = m.ColorId, ColorValue = m.Color.ColorValue, Name = m.Color.Name },
                                            ImageUrl = m.ImageUrl,
                                            ListProductSize = listProductSize.Where(n => n.ColorId == m.ColorId)
                                            .Select(n => new ProductSizeVM() { InventoryQuantity = n.InventoryQuantity, Size = new SizeVM() { SizeId = n.SizeId, Name = n.Size.Name } }).ToList()
                                        }).ToList();
                ExtendedProductVM extendedProduct = new ExtendedProductVM
                {
                    ProductId = id,
                    Code = product.Code,
                    Name = product.Name,
                    TypeProduct = new TypeProductVM() { TypeProductId = product.TypeProduct.TypeProductId, Name = product.TypeProduct.Name },
                    Price = product.Price,
                    Detail = product.Detail,
                    Discount = product.Discount,
                    CreatedDate = product.CreatedDate,
                    Brand = new BrandVM() { BrandId = product.Brand.BrandId, Name = product.Brand.Name },
                    Status = new StatusVM() { StatusId = product.Status.StatusId, Name = product.Status.Name },
                    ListProductColor = listProductColorVM
                };
                return extendedProduct;
            }


        }

        [HttpPost]
        [Route("uploadImageProductColor")]
        public async Task<ActionResult<string>> UploadImageProduct([FromForm]Guid productId, [FromForm]Guid colorId, [FromForm(Name = "imageData")]IFormFile imageData)
        {
            if (string.IsNullOrWhiteSpace(_env.WebRootPath))
            {
                _env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }
            try
            {
                Admin.Helper.AdminService adminService = new Helper.AdminService();
                var imageUrl = await adminService.UploadImageProduct(_env.WebRootPath, imageData, productId, colorId);
                return imageUrl;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<ExtendedProductVM>> PostExtendedProduct(ExtendedProductVM extendedProductVM)
        {
            await extendedProductService.Create(extendedProductVM);
            if (extendedProductVM.ProductId == null)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetExtendedProduct", new
            {
                id = extendedProductVM.ProductId
            }, extendedProductVM);
        }
    }
}