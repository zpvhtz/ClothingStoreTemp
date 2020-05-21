using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class ProductService : BaseService<Product, ProductRepository>
    {
        ProductRepository productRepository = new ProductRepository();
        public Guid ChangeStatus(Guid id, Guid statusId)
        {
            return productRepository.ChangeStatus(id, statusId);
        }
    }
}
