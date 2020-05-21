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
    public class ExtendedProductRepository : BaseRepository<ExtendedProductVM>
    {
        private readonly ClothetsStoreContext ctx;

        public ExtendedProductRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public ExtendedProductRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }
        public override async Task Create(ExtendedProductVM extendedProductVM)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var currentDate = System.DateTime.Now;
                    var product = new Product
                    {
                        Code = extendedProductVM.Code,
                        Name = extendedProductVM.Name,
                        TypeProductId = extendedProductVM.TypeProduct.TypeProductId,
                        Price = extendedProductVM.Price,
                        Detail = extendedProductVM.Detail,
                        Discount = extendedProductVM.Discount,
                        CreatedDate = currentDate,
                        BrandId = extendedProductVM.Brand.BrandId,
                        StatusId = extendedProductVM.Status.StatusId
                    };
                    ctx.Product.Add(product);
                    await ctx.SaveChangesAsync();
                    extendedProductVM.ProductId = product.ProductId;
                    foreach (var item in extendedProductVM.ListProductColor)
                    {
                        var productColor = new ProductColor() { ColorId = item.Color.ColorId, ProductId = extendedProductVM.ProductId, ImageUrl = "images/products/" + extendedProductVM.ProductId.ToString() + "/" + item.Color.ColorId.ToString() + ".jpg", StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992") };
                        ctx.ProductColor.Add(productColor);
                        await ctx.SaveChangesAsync();
                        foreach (var itemProductSize in item.ListProductSize)
                        {
                            var productSize = new ProductSize() { ColorId = productColor.ColorId, SizeId = itemProductSize.Size.SizeId, ProductId = extendedProductVM.ProductId, InventoryQuantity = itemProductSize.InventoryQuantity };
                            ctx.ProductSize.Add(productSize);
                            await ctx.SaveChangesAsync();
                        }
                    }
                    // Commit transaction if all commands succeed, transaction will auto-rollback
                    // when disposed if either commands fails
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    var exception = e.ToString();
                }
            }

        }
    }
}
