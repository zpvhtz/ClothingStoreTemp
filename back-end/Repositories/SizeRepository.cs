using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class SizeRepository : BaseRepository<Size>
    {
        private readonly ClothetsStoreContext ctx;

        public SizeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public SizeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Size>> GetAll()
        {
            return await ctx.Size.ToListAsync();
        }

        public async Task<IList<Size>> GetSizesByTypeSizeId(Guid typeSizeId)
        {
            return await ctx.Size.Where(m => m.TypeSizeId == typeSizeId).ToListAsync();
        }

        public async Task<IList<string>> GetDistinctSizes()
        {
            return await ctx.Size.Select(s => s.Name)
                                 .Distinct()
                                 .ToListAsync();
        }

        public override async Task<Size> GetById(Guid id)
        {
            Size size = await ctx.Size.Where(s => s.SizeId == id)
                                      .FirstOrDefaultAsync();

            return size;
        }
        public async Task<IList<Size>> GetSizeByProductId(Guid id)
        {
            IList<Size> size = new List<Size>();

            List<Guid> productSize = await ctx.ProductSize.Where(p => p.ProductId == id)
                                                          .GroupBy(p => p.SizeId)
                                                          .Distinct()
                                                          .Select(s => s.Key)
                                                          .ToListAsync();

            foreach (Guid item in productSize)
            {
                size.Add(ctx.Size.Where(s => s.SizeId == item).FirstOrDefault());
            }

            return size;
        }
        public async Task<string> GetSizeById(Guid sizeId)
        {
            string name = await ctx.Size.Where(p => p.SizeId == sizeId)
                                        .Select(p => p.Name)
                                        .FirstOrDefaultAsync();
            return name;
        }

    }
}
