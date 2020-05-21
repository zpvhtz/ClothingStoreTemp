using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ColorRepository : BaseRepository<Color>
    {
        private readonly ClothetsStoreContext ctx;

        public ColorRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ColorRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Color>> GetAll()
        {
            return await ctx.Color.ToListAsync();
        }

        public override async Task<Color> GetById(Guid id)
        {
            Color color = await ctx.Color.Where(p => p.ColorId == id)
                                             .FirstOrDefaultAsync();

            return color;
        }
        public override async Task Create(Color color)
        {
            ctx.Color.Add(color);
            await ctx.SaveChangesAsync();
        }

        public async Task<IList<Color>> GetColorByProductId(Guid productId)
        {
            List<Color> colors = await ctx.ProductColor.Include(p => p.Color)
                                                       .Where(p => p.ProductId == productId)
                                                       .Select(p => new Color
                                                       {
                                                           ColorId = p.Color.ColorId,
                                                           ColorValue = p.Color.ColorValue,
                                                           Name = p.Color.Name,
                                                           StatusId = p.Color.StatusId
                                                       })
                                                       .ToListAsync();

            return colors;
        }
        public async Task EditColor(Color color)
        {
            ctx.Entry(color).State = EntityState.Modified;
            await ctx.SaveChangesAsync();
        }
        public async Task DeleteColor(Guid id)
        {
            Color color = await ctx.Color.FindAsync(id);
            color.StatusId = new Guid("1C55F3C2-D7ED-4B82-8F18-480062D092A1");
            await ctx.SaveChangesAsync();
        }
    }
}
