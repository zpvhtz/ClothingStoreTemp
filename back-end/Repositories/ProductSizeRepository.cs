using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ProductSizeRepository : BaseRepository<ProductSize>
    {
        private readonly ClothetsStoreContext ctx;

        public ProductSizeRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ProductSizeRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<ProductSize>> GetAll()
        {
            return await ctx.ProductSize.Include(m => m.Size).ToListAsync();
        }

        public async Task<IList<ProductSize>> GetByProductId(Guid productId)
        {
            return await ctx.ProductSize.Where(m => m.ProductId == productId).Include(m => m.Size).ToListAsync();
        }

        public async Task<ProductSize> GetProductSizeByAllId(Guid colorId, Guid sizeId, Guid productId)
        {
            ProductSize productSize = await ctx.ProductSize.Where(p => p.ColorId == colorId && p.SizeId == sizeId && p.ProductId == productId)
                                                           .FirstOrDefaultAsync();

            return productSize;
        }

        public async Task<ExtendedProductSizeInfo> GetExtendedProductSizeInfoByAllId(Guid colorId, Guid sizeId, Guid productId)
        {
            ExtendedProductSizeInfo productSize = await ctx.ProductSize.Where(p => p.ColorId == colorId && p.SizeId == sizeId && p.ProductId == productId)
                                                                       .Select(p => new ExtendedProductSizeInfo
                                                                       {
                                                                           ProductId = p.ProductId,
                                                                           ProductName = p.ProductColor.Product.Name,
                                                                           ColorId = p.ColorId,
                                                                           ColorName = p.ProductColor.Color.Name,
                                                                           SizeId = p.SizeId,
                                                                           SizeName = p.Size.Name
                                                                       })
                                                                       .FirstOrDefaultAsync();

            return productSize;
        }

        public override async Task Create(ProductSize productSize)
        {
            ctx.ProductSize.Add(productSize);
            await ctx.SaveChangesAsync();

        }

        public async Task<int> GetQuatityBySelect(Guid colorId, Guid sizeId, Guid productId)
        {
            int SL = await ctx.ProductSize.Where(p => p.ColorId == colorId && p.SizeId == sizeId && p.ProductId == productId)
                                         .Select(p => p.InventoryQuantity)
                                         .FirstOrDefaultAsync();
            return SL;
        }
    }
}
