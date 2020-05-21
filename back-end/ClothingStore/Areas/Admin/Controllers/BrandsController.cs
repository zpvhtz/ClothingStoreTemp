using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothingStore.Areas.Admin.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Services;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize(Roles = Constrain.CustomRoles.Administrator + "," + Constrain.CustomRoles.NhapKho)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        BrandService brandService = new BrandService();

        // GET: api/Brands
        [HttpGet]
        public IEnumerable<Brand> GetBrand()
        {
            Guid activeId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            return brandService.GetAll().Result.Where(m => m.StatusId == activeId);
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrand([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var brand = await brandService.GetById(id);

            if (brand == null)
            {
                return NotFound();
            }

            return Ok(brand);
        }

        // PUT: api/Brands/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand([FromRoute] Guid id, [FromBody] Brand brand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != brand.BrandId)
            {
                return BadRequest();
            }
            string prevBrandName = brandService.GetById(id).Result.Name;
            if (prevBrandName != brand.Name && brandService.GetAll().Result.Where(m => m.Name == brand.Name).Count() > 0)
            {
                return BadRequest();
            }
            brand.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");

            try
            {
                await brandService.EditBrand(brand);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (brandService.GetById(id).Result == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Brands
        [HttpPost]
        public async Task<IActionResult> PostBrand([FromBody] Brand brand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (brandService.GetAll().Result.Where(m => m.Name == brand.Name).Count() > 0)
            {
                return BadRequest();
            }
            brand.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");

            await brandService.Create(brand);

            return CreatedAtAction("GetBrand", new { id = brand.BrandId }, brand);
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var brand = await brandService.GetById(id);
            if (brand == null)
            {
                return NotFound();
            }

            await brandService.DeleteBrand(id);

            return Ok(brand);
        }
    }
}