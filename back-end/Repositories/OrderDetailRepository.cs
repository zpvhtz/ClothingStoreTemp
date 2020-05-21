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
    public class OrderDetailRepository : BaseRepository<OrderProductSize>
    {
        private readonly ClothetsStoreContext ctx;

        public OrderDetailRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public OrderDetailRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<OrderProductSize>> GetAll()
        {
            return await ctx.OrderProductSize.ToListAsync();
        }

        public async Task<IList<OrderProductSize>> GetAllByOrderId(Guid orderId)
        {
            return await ctx.OrderProductSize.Where(o => o.OrderId == orderId)
                                             .ToListAsync();
        }

        public async Task<List<CustomerOrderDetailVM>> GetCustomerOrderDetails(Guid orderId)
        {
            List<OrderProductSize> orderProductSizes = await ctx.OrderProductSize.Where(o => o.OrderId == orderId)
                                                                                 .ToListAsync();

            List<CustomerOrderDetailVM> customerOrderDetails = new List<CustomerOrderDetailVM>();
            foreach (OrderProductSize order in orderProductSizes)
            {
                CustomerOrderDetailVM customerOrderDetail = new CustomerOrderDetailVM();
                ProductSize productSize = new ProductSize();

                customerOrderDetail = ctx.ProductSize.Where(p => p.ColorId == order.ColorId && p.ProductId == order.ProductId && p.SizeId == order.SizeId)
                                                     .Select(p => new CustomerOrderDetailVM
                                                     {
                                                         ColorId = p.ColorId,
                                                         ProductId = p.ProductId,
                                                         SizeId = p.SizeId,
                                                         ColorName = p.ProductColor.Color.Name,
                                                         Name = p.ProductColor.Product.Name,
                                                         SizeName = p.Size.Name,
                                                         Price = order.Price,
                                                         Quantity = order.Quantity,
                                                         ImageUrl = p.ProductColor.ImageUrl
                                                     })
                                                    .FirstOrDefault();
                customerOrderDetails.Add(customerOrderDetail);
            }

            return customerOrderDetails;
        }
    }
}