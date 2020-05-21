using Models.ViewModels;
using Newtonsoft.Json;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductVMService : BaseService<ProductVM, ProductVMRepository>
    {
        ProductVMRepository productVMRepository = new ProductVMRepository();

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            return await productVMRepository.GetAll(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId);
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            return await productVMRepository.GetNumberOfPages(pageSize, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId);
        }

        public async Task<IList<ProductVM>> GetNew()
        {
            return await productVMRepository.GetNew();
        }

        public async Task<ProductDetailVM> GetProductVMById(Guid id, Guid colorId)
        {
            if (id == Guid.Empty)
            {
                ProductDetailVM productDetail = new ProductDetailVM();
                return productDetail;
            }

            return await productVMRepository.GetProductVMById(id, colorId);
        }

        public async Task<List<CartDetailVM>> GetProductsForCart(string carts)
        {
            if(carts == "null")
            {
                List<CartDetailVM> cartDetails = new List<CartDetailVM>();
                return cartDetails;
            }

            List<CartVM> cartVMs = JsonConvert.DeserializeObject<List<CartVM>>(carts);

            return await productVMRepository.GetProductsForCart(cartVMs);
        }

        public async Task<IList<ProductVM>> GetBestSeller()
        {
            return await productVMRepository.GetBestSeller();
        }

        public async Task<List<CartVM>> CheckProductQuantity(string carts)
        {
            if(carts == "null")
            {
                List<CartVM> cart = new List<CartVM>();
                return cart;
            }

            List<CartVM> cartVMs = JsonConvert.DeserializeObject<List<CartVM>>(carts);

            return await productVMRepository.CheckProductQuantity(cartVMs);
        }

        public async Task<ProductStatusVM> GetProductStatus(Guid productId)
        {
            return await productVMRepository.GetProductStatus(productId);
        }
    }
}
