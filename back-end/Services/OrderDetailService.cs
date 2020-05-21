using Models;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderDetailService : BaseService<OrderProductSize, OrderDetailRepository>
    {

        OrderDetailRepository orderDetailRepository = new OrderDetailRepository();

        public async Task<IList<OrderProductSize>> GetAllByOrderId(Guid orderId)
        {
            return await orderDetailRepository.GetAllByOrderId(orderId);
        }

        public async Task<List<CustomerOrderDetailVM>> GetCustomerOrderDetails(Guid orderId)
        {
            if(orderId == Guid.Empty)
            {
                List<CustomerOrderDetailVM> customerOrders = new List<CustomerOrderDetailVM>();
                return customerOrders;
            }

            return await orderDetailRepository.GetCustomerOrderDetails(orderId);
        }
    }
}
