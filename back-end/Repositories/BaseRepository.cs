using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public abstract class BaseRepository<TEntity>
        where TEntity : class, new()
    {
        private readonly ClothetsStoreContext ctx;
        public BaseRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public BaseRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public virtual async Task<IList<TEntity>> GetAll()
        {
            //return (IList<TEntity>)ctx.Set<TEntity>();
            return await ctx.Set<TEntity>().ToListAsync();
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            return await ctx.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task Create(TEntity item)
        {
            ctx.Set<TEntity>().Add(item);
            await ctx.SaveChangesAsync();
        }
    }
}
