using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductGenderRepository : BaseRepository<ProductGender>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductGenderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductGenderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductGender>> GetAll()
        {
            return await ctx.ProductGender.ToListAsync();
        }

        public override async Task<ProductGender> GetById(Guid id)
        {
            ProductGender productgender = await ctx.ProductGender.Where(p => p.ProductGenderId == id)
                                                                 .FirstOrDefaultAsync();

            return productgender;
        }
    }
}
