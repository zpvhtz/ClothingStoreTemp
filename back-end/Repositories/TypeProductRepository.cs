using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class TypeProductRepository : BaseRepository<TypeProduct>
    {
        private readonly ClothetsStoreContext ctx;
        public TypeProductRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }
        public TypeProductRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<TypeProduct>> GetAll()
        {
            return await ctx.TypeProduct.Where(m => m.StatusId == new Guid("87577063-322E-4901-98D2-FF519341D992")).ToListAsync();
        }
    }
}
