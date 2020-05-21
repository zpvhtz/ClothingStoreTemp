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
    public class DeliveryController : ControllerBase
    {
        GiaoHangNhanhService ghnService = new GiaoHangNhanhService();

        //[HttpGet]
        //[Route("getColors")] //api/customer/product/getProducts
        //public async Task<IActionResult> GetColors()
        //{
        //    return Ok(await colorService.GetAll());
        //}

        //[HttpGet]
        //[Route("getColorById")]
        //public async Task<IActionResult> GetColorById(Guid id)
        //{
        //    return Ok(await colorService.GetById(id));
        //}

        [HttpGet]
        [Route("getLocations")]
        public async Task<IActionResult> GetLocations()
        {
            return Ok(await ghnService.GetLocations());
        }

        [HttpGet]
        [Route("getDistricts")]
        public async Task<IActionResult> GetDistricts()
        {
            return Ok(await ghnService.GetDistricts());
        }

        [HttpGet]
        [Route("getDistrictsByProvinceId")]
        public async Task<IActionResult> GetDistrictsByProvinceId(int provinceId)
        {
            return Ok(await ghnService.GetDistrictsByProvinceId(provinceId));
        }

        [HttpGet]
        [Route("getDistrictByProvinceAndDistrictName")]
        public async Task<IActionResult> GetDistrictByProvinceAndDistrictName(string provinceName, string districtName)
        {
            return Ok(await ghnService.GetDistrictByProvinceAndDistrictName(provinceName, districtName));
        }

        [HttpGet]
        [Route("getProvinces")]
        public async Task<IActionResult> GetProvinces()
        {
            return Ok(await ghnService.GetProvinces());
        }

        [HttpGet]
        [Route("getProvinceByProvinceId")]
        public async Task<IActionResult> GetProvinceByProvinceId(int provinceId)
        {
            return Ok(await ghnService.GetProvinceByProvinceId(provinceId));
        }

        [HttpGet]
        [Route("getProvinceByProvinceName")]
        public async Task<IActionResult> GetProvinceByProvinceName(string provinceName)
        {
            return Ok(await ghnService.GetProvinceByProvinceName(provinceName));
        }

        [HttpGet]
        [Route("getWards")]
        public async Task<IActionResult> GetWards(int provinceId, int districtId)
        {
            return Ok(await ghnService.GetWards(provinceId, districtId));
        }

        [HttpGet]
        [Route("getFee")]
        public async Task<IActionResult> GetFee(int districtId, int numberOfProduct)
        {
            return Ok(await ghnService.GetFee(districtId, numberOfProduct));
        }
    }
}