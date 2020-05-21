using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class GenderRepository : BaseRepository<Gender>
    {
        private readonly ClothetsStoreContext ctx;

        public GenderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public GenderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Gender>> GetAll()
        {
            return await ctx.Gender.ToListAsync();
        }

        public override async Task<Gender> GetById(Guid id)
        {
            Gender gender = await ctx.Gender.Where(p => p.GenderId == id)
                                           .FirstOrDefaultAsync();

            return gender;
        }
    }
}
