using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductColorRepository : BaseRepository<ProductColor>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductColorRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductColorRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductColor>> GetAll()
        {
            return await ctx.ProductColor.Include(m => m.Color).ToListAsync();
        }

        public async Task<IList<ProductColor>> GetProductColorsByColorId(Guid colorId)
        {
            List<ProductColor> productColors = await ctx.ProductColor.Where(pc => pc.ColorId == colorId)
                                                                     .ToListAsync();

            return productColors;
        }

        public async Task<IList<ProductColor>> GetByProductId(Guid productId)
        {
            List<ProductColor> productColors = await ctx.ProductColor.Where(p => p.ProductId == productId).Include(m => m.Color).ToListAsync();

            return productColors;
        }
    }
}
