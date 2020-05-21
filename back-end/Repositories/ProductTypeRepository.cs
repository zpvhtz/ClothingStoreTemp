using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductTypeRepository : BaseRepository<TypeProduct>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductTypeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductTypeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<TypeProduct>> GetAll()
        {
            return await ctx.TypeProduct.ToListAsync();
        }

        public override async Task<TypeProduct> GetById(Guid id)
        {
            TypeProduct typeProduct = await ctx.TypeProduct.Where(p => p.TypeProductId == id)
                                                           .FirstOrDefaultAsync();

            return typeProduct;
        }

        public async Task<IList<TypeProduct>> GetProductTypesByProductGender(Guid productGenderId)
        {
            IList<TypeProduct> typeProducts = await ctx.TypeProduct.Where(t => t.ProductGenderId == productGenderId)
                                                                   .ToListAsync();

            return typeProducts;
        }
    }
}
