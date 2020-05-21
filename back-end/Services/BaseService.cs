using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public abstract class BaseService<TEntity, TRepository>
        where TEntity : class, new()
        where TRepository : BaseRepository<TEntity>, new()
    {
        TRepository repository = new TRepository();

        public virtual async Task<IList<TEntity>> GetAll()
        {
            return await repository.GetAll();
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            if(id == Guid.Empty)
            {
                TEntity entity = new TEntity();
                return entity;
            }

            return await repository.GetById(id);
        }
        public virtual async Task Create(TEntity entity)
        {
            await repository.Create(entity);
        }
    }
}
