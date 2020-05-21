using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductColorService : BaseService<ProductColor, ProductColorRepository>
    {
        ProductColorRepository productColorRepository = new ProductColorRepository();

        public async Task<IList<ProductColor>> GetByProductId(Guid productId)
        {
            if (productId == Guid.Empty)
            {
                List<ProductColor> productColors = new List<ProductColor>();
                return productColors;
            }

            return await productColorRepository.GetByProductId(productId);
        }
    }
}
