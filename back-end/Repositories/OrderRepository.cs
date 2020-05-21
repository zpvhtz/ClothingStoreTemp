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
    public class OrderRepository:BaseRepository<Order>
    {
        private readonly ClothetsStoreContext ctx;
        private ProductRepository productRepository = new ProductRepository();
        //private ProductSizeRepository productSizeRepository = new ProductSizeRepository();

        public OrderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public OrderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Order>> GetAll()
        {
            return await ctx.Order.ToListAsync();
        }

        public async Task<List<ExtendedOrderVM>> GetAllAdminOrders()
        {
            return await ctx.Order.Select(or => new ExtendedOrderVM
                                         {
                                             OrderId = or.OrderId,
                                             CustomerId = or.CustomerId,
                                             CustomerName = or.Customer.Name,
                                             CreatedDate = or.CreatedDate,
                                             TotalPrice = or.TotalPrice,
                                             ContactPhone = or.ContactPhone,
                                             DeliveryName = or.DeliveryName,
                                             DeliveryEmail = or.DeliveryEmail,
                                             DeliveryAddress = or.DeliveryAddress,
                                             DeliveryPrice = or.DeliveryPrice,
                                             DeliveryDate = or.DeliveryDate,
                                             StatusId = or.StatusId,
                                             StatusName = or.Status.Name
                                         })
                                  .OrderByDescending(or => or.CreatedDate)
                                  .ToListAsync();
        }

        public async Task<List<CustomerOrderVM>> GetAllCustomerOrders(Guid customerId)
        {
            List<CustomerOrderVM> customerOrder = await ctx.Order.Where(o => o.CustomerId == customerId)
                                                                 .Select(o => new CustomerOrderVM
                                                                 {
                                                                     OrderId = o.OrderId,
                                                                     CustomerId = o.CustomerId,
                                                                     CreatedDate = o.CreatedDate,
                                                                     TotalPrice = o.TotalPrice,
                                                                     ContactPhone = o.ContactPhone,
                                                                     DeliveryName = o.DeliveryName,
                                                                     DeliveryEmail = o.DeliveryEmail,
                                                                     DeliveryAddress = o.DeliveryAddress,
                                                                     DeliveryPrice = o.DeliveryPrice,
                                                                     DeliveryDate = o.DeliveryDate,
                                                                     NumberOfProducts = o.OrderProductSize.Count,
                                                                     StatusId = o.StatusId,
                                                                     StatusName = o.Status.Name
                                                                 })
                                                                 .OrderByDescending(o => o.CreatedDate)
                                                                 .ToListAsync();

            List<Guid> orderIds = customerOrder.Select(o => o.OrderId)
                                               .ToList();

            foreach(Guid guid in orderIds)
            {
                OrderProductSize orderProductSize = await ctx.OrderProductSize.Where(o => o.OrderId == guid).FirstOrDefaultAsync();
                CustomerOrderVM customerOrderVM = customerOrder.Where(o => o.OrderId == guid).FirstOrDefault();
                customerOrderVM.FirstProductName = await ctx.ProductSize.Where(p => p.ColorId == orderProductSize.ColorId && p.ProductId == orderProductSize.ProductId && p.SizeId == orderProductSize.SizeId)
                                                                        .Select(p => p.ProductColor.Product.Name)
                                                                        .FirstOrDefaultAsync();
            }

            return customerOrder;
        }

        public async Task<CustomerOrderVM> GetCustomerOrderByOrderId(Guid orderId)
        {
            CustomerOrderVM customerOrder = await ctx.Order.Where(o => o.OrderId == orderId)
                                                           .Select(o => new CustomerOrderVM
                                                           {
                                                               OrderId = o.OrderId,
                                                               CustomerId = o.CustomerId,
                                                               CreatedDate = o.CreatedDate,
                                                               TotalPrice = o.TotalPrice,
                                                               ContactPhone = o.ContactPhone,
                                                               DeliveryName = o.DeliveryName,
                                                               DeliveryEmail = o.DeliveryEmail,
                                                               DeliveryAddress = o.DeliveryAddress,
                                                               DeliveryPrice = o.DeliveryPrice,
                                                               DeliveryDate = o.DeliveryDate,
                                                               NumberOfProducts = o.OrderProductSize.Count,
                                                               StatusId = o.StatusId,
                                                               StatusName = o.Status.Name
                                                           })
                                                           .OrderByDescending(o => o.CreatedDate)
                                                           .FirstOrDefaultAsync();

            return customerOrder;
        }

        public override async Task<Order> GetById(Guid id)
        {
            Order order = await ctx.Order.Where(p => p.OrderId == id)
                                         .FirstOrDefaultAsync();

            return order;
        }

        public async Task<bool> CreateOrder(Order order)
        {
            //Order
            DateTime date = new DateTime();
            date = DateTime.Now;            

            Order tempOrder = new Order();
            tempOrder.OrderId = Guid.NewGuid();
            tempOrder.CustomerId = order.CustomerId;
            tempOrder.CreatedDate = date;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.ContactPhone = order.ContactPhone;
            tempOrder.DeliveryName = order.DeliveryName;
            tempOrder.DeliveryEmail = order.DeliveryEmail;
            tempOrder.DeliveryAddress = order.DeliveryAddress;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.DeliveryPrice = order.DeliveryPrice;
            tempOrder.DeliveryDate = date;
            tempOrder.StatusId = Guid.Parse("A1AD8DEF-626A-4A06-B39C-956B6255C37C"); //Chưa thanh toán

            ctx.Order.Add(tempOrder);
            await ctx.SaveChangesAsync();

            //OrderDetail
            foreach(OrderProductSize item in order.OrderProductSize)
            {
                //Lấy giá
                Product product = new Product();
                product = await productRepository.GetById(item.ProductId);

                //OrderDetail
                OrderProductSize orderProductSize = new OrderProductSize();
                orderProductSize.OrderId = tempOrder.OrderId;
                orderProductSize.SizeId = item.SizeId;
                orderProductSize.ProductId = item.ProductId;
                orderProductSize.ColorId = item.ColorId;
                orderProductSize.Quantity = item.Quantity;
                orderProductSize.Price = item.Price;

                //product.Discount == 0 ? product.Price * item.Quantity : (product.Price - (product.Price / 100 * (decimal)product.Discount)) * item.Quantity
                ctx.OrderProductSize.Add(orderProductSize);
                await ctx.SaveChangesAsync();

                //Trừ số lượng
                ProductSize productSize = new ProductSize();
                productSize = await ctx.ProductSize.Where(p => p.ColorId == item.ColorId && p.SizeId == item.SizeId && p.ProductId == item.ProductId)
                                                   .FirstOrDefaultAsync();

                productSize.InventoryQuantity = productSize.InventoryQuantity - item.Quantity;
                await ctx.SaveChangesAsync();
            }

            return true;
        }

        public async Task<IList<OrderDetailVM>> getDetailOrder(Guid idcustomer)
        {
            //List<Guid> id = ctx.Order.Where(s => s.CustomerId == idcustomer).ToListAsync();
            //List<OrderProductSize> list= ctx.OrderProductSize.Where(s=>s.OrderId==)
            //List<OrderProductSize> list = new List<OrderProductSize>();
            List<Guid> id = ctx.Order.Where(s => s.CustomerId == idcustomer).Select(s => s.OrderId).ToList();

            List<OrderDetailVM> list = new List<OrderDetailVM>();
            foreach (Guid i in id)
            {
                //
                List<OrderProductSize> order = ctx.OrderProductSize.Where(s => s.OrderId == i).ToList();
                Order listorder = await ctx.Order.Where(s => s.OrderId == i).FirstOrDefaultAsync();
                foreach (OrderProductSize item in order)
                {
                    OrderDetailVM orderdetail = new OrderDetailVM();
                    orderdetail.OrderId = item.OrderId;
                    orderdetail.CreatedDate = listorder.CreatedDate;
                    orderdetail.Name = ctx.Product.Where(s => s.ProductId == item.ProductId).Select(s => s.Name).FirstOrDefault();
                    orderdetail.ImageUrl = ctx.ProductColor.Where(s => s.ProductId == item.ProductId).Select(s => s.ImageUrl).FirstOrDefault();
                    orderdetail.Quantity = item.Quantity;
                    orderdetail.Price = item.Price;
                    orderdetail.TotalPrice = listorder.TotalPrice+listorder.DeliveryPrice;
                    orderdetail.StatusName = ctx.Status.Where(s => s.StatusId == listorder.StatusId).Select(s => s.Name).FirstOrDefault();
                    list.Add(orderdetail);
                }
                //orderdetail.OrderId = order.OrderId;
                //orderdetail.CreatedDate = listorder.CreatedDate;
                //orderdetail.Name = ctx.Product.Where(s => s.ProductId == order.ProductId).Select(s => s.Name).FirstOrDefault();
                //orderdetail.ImageUrl = ctx.ProductColor.Where(s => s.ProductId == order.ProductId).Select(s => s.ImageUrl).FirstOrDefault();
                //orderdetail.Quantity = order.Quantity;
                //orderdetail.Price = order.Price;
                //orderdetail.TotalPrice = listorder.TotalPrice;
                //orderdetail.StatusName = ctx.Status.Where(s => s.StatusId == listorder.StatusId).Select(s => s.Name).FirstOrDefault();
                //list.Add(orderdetail);
            }
            return list;
        }

        public async Task<bool> ConfirmDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            Order order = await ctx.Order.Where(o => o.OrderId == orderConfirmation.OrderId)
                                         .FirstOrDefaultAsync();

            order.DeliveryDate = orderConfirmation.DeliveryDate;
            order.StatusId = Guid.Parse("F4F13152-3B04-4EC0-BA8F-C722F30A479D"); //Đang giao
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EditDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            Order order = await ctx.Order.Where(o => o.OrderId == orderConfirmation.OrderId)
                                         .FirstOrDefaultAsync();

            order.DeliveryDate = orderConfirmation.DeliveryDate;
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ConfirmOrder(Order order)
        {
            Order tempOrder = await ctx.Order.Where(o => o.OrderId == order.OrderId)
                                             .FirstOrDefaultAsync();

            tempOrder.DeliveryDate = DateTime.Now;
            tempOrder.StatusId = Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA"); //Đã thanh toán
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CancelOrder(Order order)
        {
            Order tempOrder = await ctx.Order.Where(o => o.OrderId == order.OrderId)
                                         .FirstOrDefaultAsync();

            tempOrder.StatusId = Guid.Parse("c9137e0b-0e56-4f96-8916-5dbf76b15736"); //Đã huỷ
            await ctx.SaveChangesAsync();

            return true;
        }
    }
}
