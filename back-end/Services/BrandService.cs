using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class BrandService : BaseService<Brand, BrandRepository>
    {
        BrandRepository brandRepository = new BrandRepository();
        public async Task EditBrand(Brand brand)
        {
            await brandRepository.EditBrand(brand);
        }
        public async Task DeleteBrand(Guid id)
        {
            await brandRepository.DeleteBrand(id);
        }
    }
}
