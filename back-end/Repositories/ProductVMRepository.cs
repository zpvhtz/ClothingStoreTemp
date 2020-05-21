using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductVMRepository : BaseRepository<ProductVM>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductVMRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductVMRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductVM>> GetAll()
        {
            return await ctx.Product.Select(p => new ProductVM
            {
                Name = p.Name,
                Price = p.Price,
                Discount = p.Discount
            }).ToListAsync();
        }

        public override async Task<ProductVM> GetById(Guid id)
        {
            Product product = await ctx.Product.Where(p => p.ProductId == id)
                                               .FirstOrDefaultAsync();

            ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == product.ProductId)
                                                              .FirstOrDefaultAsync();

            ProductVM productVM = new ProductVM();
            productVM.Name = product.Name;
            productVM.Price = product.Price;
            productVM.Discount = product.Discount;
            productVM.ImageUrl = productColor.ImageUrl;

            return productVM;
        }

        public async Task<IList<ProductVM>> GetAll(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;

            IList<ProductVM> productVMs = new List<ProductVM>();
            productVMs = await GetAllWithFilter(pageSize, pageNumber, orderBy, minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId);

            Console.WriteLine(productVMs);

            return productVMs;
        }

        public async Task<int> GetNumberOfPages(int pageSize, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            maxPrice = maxPrice == 0 ? 100000000 : maxPrice;
            int numberOfProducts = 0;
            int numberOfPages = 0;

            numberOfProducts = await GetNumberOfProductsWithFilter(minPrice, maxPrice, colorId, sizeName, brandId, productGenderId, search, productTypeId);
            numberOfPages = numberOfProducts % pageSize > 0 ? (numberOfProducts / pageSize) + 1 : numberOfProducts / pageSize;

            return numberOfPages;
        }

        public async Task<IList<ProductVM>> GetAllWithFilter(int pageSize, int pageNumber, string orderBy, decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            List<ProductVM> productVMs = new List<ProductVM>();
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .Include(p => p.ProductColor.Product.TypeProduct)
                                                                  .ToListAsync();

            //Filter by size
            if (sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            //Filter by color
            if (colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            //Filter by brand
            if (brandId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.BrandId == brandId).ToList();
            }

            //Filter by product gender
            if (productGenderId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProduct.ProductGenderId == productGenderId).ToList();
            }

            //Search
            if (search != null && search != "")
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.Name.Contains(search)).ToList();
            }

            //Filter by price
            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            //Filter by productType
            if (productTypeId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProductId == productTypeId).ToList();
            }

            //Remove locked products
            productSizes = productSizes.Where(p => p.ProductColor.Product.StatusId != Guid.Parse("1C55F3C2-D7ED-4B82-8F18-480062D092A1")).ToList();

            //Get distinct products (group by -> distinct)
            List<Guid> productIdList = productSizes.GroupBy(p => p.ProductId)
                                                   .Distinct()
                                                   .Select(p => p.Key)
                                                   .ToList();

            //Get all products
            List<ProductColor> productList = new List<ProductColor>();
            foreach (var productId in productIdList)
            {
                ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == productId).FirstOrDefaultAsync();
                productList.Add(productColor);
            }

            switch (orderBy)
            {
                case "new":
                    productVMs = productList.OrderByDescending(p => p.Product.CreatedDate)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                case "high":
                    productVMs = productList.OrderByDescending(p => p.Product.Price)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                case "low":
                    productVMs = productList.OrderBy(p => p.Product.Price)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
                default:
                    productVMs = productList.OrderByDescending(p => p.Product.CreatedDate)
                                            .Skip(pageSize * (pageNumber - 1))
                                            .Take(pageSize)
                                            .Select(p => new ProductVM
                                            {
                                                ProductId = p.Product.ProductId,
                                                Name = p.Product.Name,
                                                Price = p.Product.Price,
                                                Discount = p.Product.Discount,
                                                ImageUrl = p.ImageUrl
                                            })
                                            .ToList();
                    break;
            }

            return productVMs;
        }

        //getnew
        public async Task<IList<ProductVM>> GetNew()
        {
            List<ProductVM> productVMs = new List<ProductVM>();
            productVMs = await ctx.ProductColor.OrderByDescending(p => p.Product.CreatedDate)
                                               .Take(8)
                                               .Select(p => new ProductVM
                                               {
                                                   ProductId = p.Product.ProductId,
                                                   Name = p.Product.Name,
                                                   Price = p.Product.Price,
                                                   Discount = p.Product.Discount,
                                                   ImageUrl = p.ImageUrl
                                               }).ToListAsync();
            return productVMs;
        }

        public async Task<ProductDetailVM> GetProductVMById(Guid id, Guid colorId)
        {
            ProductDetailVM product = new ProductDetailVM();

            if(colorId != Guid.Empty)
            {
                product = await ctx.ProductColor.Where(p => p.ProductId == id && p.ColorId == colorId)
                                                .Select(p => new ProductDetailVM
                                                {
                                                    ProductId = p.Product.ProductId,
                                                    Name = p.Product.Name,
                                                    Price = p.Product.Price,
                                                    Discount = p.Product.Discount,
                                                    ImageUrl = p.ImageUrl,
                                                    Detail = p.Product.Detail,
                                                    BrandName = p.Product.Brand.Name
                                                })
                                                .FirstOrDefaultAsync();
            }
            else
            {
                product = await ctx.ProductColor.Where(p => p.ProductId == id)
                                                .Select(p => new ProductDetailVM
                                                {
                                                    ProductId = p.Product.ProductId,
                                                    Name = p.Product.Name,
                                                    Price = p.Product.Price,
                                                    Discount = p.Product.Discount,
                                                    ImageUrl = p.ImageUrl,
                                                    Detail = p.Product.Detail,
                                                    BrandName = p.Product.Brand.Name
                                                })
                                                .FirstOrDefaultAsync();
            }
            //IList<string> product = await ctx.ProductColor.Where(s => s.ProductId == id).Select(s => s.ImageUrl).ToListAsync();
            //return product;
            return product;
        }

        public async Task<int> GetNumberOfProductsWithFilter(decimal minPrice, decimal maxPrice, Guid colorId, string sizeName, Guid brandId, Guid productGenderId, string search, Guid productTypeId)
        {
            List<ProductSize> productSizes = await ctx.ProductSize.Include(p => p.Size)
                                                                  .Include(p => p.ProductColor)
                                                                  .Include(p => p.ProductColor.Product)
                                                                  .Include(p => p.ProductColor.Product.TypeProduct)
                                                                  .ToListAsync();

            //Filter by size
            if (sizeName != "" && sizeName != null)
            {
                productSizes = productSizes.Where(p => p.Size.Name == sizeName).ToList();
            }

            //Filter by color
            if (colorId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.ColorId == colorId).ToList();
            }

            //Filter by brand
            if (brandId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.BrandId == brandId).ToList();
            }

            //Filter by product gender
            if (productGenderId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProduct.ProductGenderId == productGenderId).ToList();
            }

            //Search
            if (search != null && search != "")
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.Name.Contains(search)).ToList();
            }

            //Filter by price
            productSizes = productSizes.Where(p => p.ProductColor.Product.Price >= minPrice && p.ProductColor.Product.Price <= maxPrice).ToList();

            //Filter by productType
            if (productTypeId != Guid.Empty)
            {
                productSizes = productSizes.Where(p => p.ProductColor.Product.TypeProductId == productTypeId).ToList();
            }

            //Remove locked products
            productSizes = productSizes.Where(p => p.ProductColor.Product.StatusId != Guid.Parse("1C55F3C2-D7ED-4B82-8F18-480062D092A1")).ToList();

            List<Guid> productIdList = productSizes.GroupBy(p => p.ProductId)
                                                   .Distinct()
                                                   .Select(p => p.Key)
                                                   .ToList();

            //Get all products
            List<ProductColor> productList = new List<ProductColor>();
            foreach (var productId in productIdList)
            {
                ProductColor productColor = await ctx.ProductColor.Where(p => p.ProductId == productId).FirstOrDefaultAsync();
                productList.Add(productColor);
            }

            return productList.Count;
        }

        public async Task<List<CartDetailVM>> GetProductsForCart(List<CartVM> carts)
        {
            List<CartDetailVM> cartDetails = new List<CartDetailVM>();

            foreach(CartVM item in carts)
            {
                cartDetails.Add(await ctx.ProductSize.Where(p => p.ProductId == item.ProductId && p.ColorId == item.ColorId && p.SizeId == item.SizeId)
                                                     .Select(p => new CartDetailVM
                                                     {
                                                         ProductId = p.ProductId,
                                                         ColorId = p.ColorId,
                                                         SizeId = p.SizeId,
                                                         Quantity = item.Quantity,
                                                         Name = p.ProductColor.Product.Name,
                                                         ColorName = p.ProductColor.Color.Name,
                                                         SizeName = p.Size.Name,
                                                         //Price = p.ProductColor.Product.Price - (p.ProductColor.Product.Price / 100 * decimal.Parse(p.ProductColor.Product.Discount.ToString())),
                                                         Price = p.ProductColor.Product.Price,
                                                         Discount = p.ProductColor.Product.Discount,
                                                         ImageUrl = p.ProductColor.ImageUrl
                                                     })
                                                     .FirstOrDefaultAsync());
            }

            return cartDetails;
        }

        public async Task<IList<ProductVM>> GetBestSeller()
        {
            List<ProductVM> list = new List<ProductVM>();
            List<Guid> idSp = await ctx.OrderProductSize.GroupBy(p => p.ProductId)
                                                        .Distinct()
                                                        .Select(s => s.Key)
                                                        .ToListAsync();

            Dictionary<Guid, int> slsp = new Dictionary<Guid, int>();
            foreach(var item in idSp)
            {
                int sl = ctx.OrderProductSize.Where(s => s.ProductId == item).ToList().Count;
                slsp.Add(item, sl);
            }
            slsp = slsp.OrderByDescending(s => s.Value).ToDictionary(s => s.Key, s => s.Value);

            //int tmp = 0;
            foreach ( var item in slsp)
            {
                list.Add(ctx.ProductColor.Where(s => s.ProductId == item.Key).Select(p => new ProductVM
                {
                    ProductId = p.Product.ProductId,
                    Name = p.Product.Name,
                    Price = p.Product.Price,
                    Discount = p.Product.Discount,
                    ImageUrl = p.ImageUrl
                }).FirstOrDefault());
   
                //list =await ctx.ProductColor.Where(s => s.ProductId == item.Key).Di.Select(p => new ProductVM
                //{
                //    ProductId = p.Product.ProductId,
                //    Name = p.Product.Name,
                //    Price = p.Product.Price,
                //    Discount = p.Product.Discount,
                //    ImageUrl = p.ImageUrl
                //}).ToListAsync();
            }
            List<ProductVM> lists = list.Take(3).ToList();
            return lists;
        }

        public async Task<List<CartVM>> CheckProductQuantity(List<CartVM> carts)
        {
            List<CartVM> cartTemp = new List<CartVM>();

            foreach(CartVM item in carts)
            {
                ProductSize productSize = await ctx.ProductSize.Where(p => p.ProductId == item.ProductId && p.SizeId == item.SizeId && p.ColorId == item.ColorId)
                                                               .FirstOrDefaultAsync();

                if(productSize.InventoryQuantity < item.Quantity)
                {
                    cartTemp.Add(new CartVM
                    {
                        ProductId = item.ProductId,
                        ColorId = item.ColorId,
                        SizeId = item.SizeId,
                        Quantity = -1
                    });
                }
                else
                {
                    cartTemp.Add(item);
                }
            }

            return cartTemp;
        }

        public async Task<ProductStatusVM> GetProductStatus(Guid productId)
        {
            ProductStatusVM product = await ctx.Product.Where(p => p.ProductId == productId)
                                                       .Select(p => new ProductStatusVM
                                                       {
                                                           ProductId = p.ProductId,
                                                           Name = p.Name,
                                                           StatusId = p.StatusId,
                                                           StatusName = p.Status.Name
                                                       })
                                                       .FirstOrDefaultAsync();

            return product;
        }
    }
}
