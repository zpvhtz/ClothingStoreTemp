using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class StatusRepository : BaseRepository<Status>
    {
        private readonly ClothetsStoreContext ctx;

        public StatusRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public StatusRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Status>> GetAll()
        {
            return await ctx.Status.ToListAsync();
        }

        public override async Task<Status> GetById(Guid id)
        {
            Status status = await ctx.Status.Where(p => p.StatusId == id)
                                           .FirstOrDefaultAsync();

            return status;
        }
    }
}
