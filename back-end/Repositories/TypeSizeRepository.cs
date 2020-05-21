using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class TypeSizeRepository : BaseRepository<TypeSize>
    {
        private readonly ClothetsStoreContext ctx;
        public TypeSizeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }
        public TypeSizeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<TypeSize>> GetAll()
        {
            return await ctx.TypeSize.ToListAsync();
        }
    }
}
