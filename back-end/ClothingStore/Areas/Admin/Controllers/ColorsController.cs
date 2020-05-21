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
    public class ColorsController : ControllerBase
    {
        ColorService colorService = new ColorService();

        // GET: api/Colors
        [HttpGet]
        public IEnumerable<Color> GetColor()
        {
            Guid activeId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            return colorService.GetAll().Result.Where(m => m.StatusId == activeId);
        }

        // GET: api/Colors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetColor([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var color = await colorService.GetById(id);

            if (color == null)
            {
                return NotFound();
            }

            return Ok(color);
        }

        // PUT: api/Colors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor([FromRoute] Guid id, [FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != color.ColorId)
            {
                return BadRequest();
            }
            string prevColorValue = colorService.GetById(id).Result.ColorValue;
            if (prevColorValue != color.ColorValue && colorService.GetAll().Result.Where(m => m.ColorValue == color.ColorValue).Count() > 0)
            {
                return BadRequest();
            }
            color.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");


            try
            {
                await colorService.EditColor(color);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (colorService.GetById(id).Result == null)
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

        // POST: api/Colors
        [HttpPost]
        public async Task<IActionResult> PostColor([FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (colorService.GetAll().Result.Where(m => m.ColorValue == color.ColorValue).Count() > 0)
            {
                return BadRequest();
            }
            color.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            await colorService.Create(color);

            return CreatedAtAction("GetColor", new { id = color.ColorId }, color);
        }

        // DELETE: api/Colors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var color = await colorService.GetById(id);
            if (color == null)
            {
                return NotFound();
            }

            await colorService.DeleteColor(id);

            return Ok(color);
        }
    }
}