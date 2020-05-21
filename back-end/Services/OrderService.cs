using Models;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService:BaseService<Order,OrderRepository >
    {
        OrderRepository orderRepository = new OrderRepository();

        public async Task<List<ExtendedOrderVM>> GetAdminOrders()
        {
            return await orderRepository.GetAllAdminOrders();
        }

        public async Task<List<CustomerOrderVM>> GetAllCustomerOrders(Guid customerId)
        {
            if(customerId == Guid.Empty)
            {
                List<CustomerOrderVM> customerOrders = new List<CustomerOrderVM>();
                return customerOrders;
            }

            return await orderRepository.GetAllCustomerOrders(customerId);
        }

        public async Task<CustomerOrderVM> GetCustomerOrderByOrderId(Guid orderId)
        {
            if(orderId == Guid.Empty)
            {
                CustomerOrderVM customerOrderVM = new CustomerOrderVM();
                return customerOrderVM;
            }

            return await orderRepository.GetCustomerOrderByOrderId(orderId);
        }

        public async Task<bool> CreateOrder(Order order)
        {
            return await orderRepository.CreateOrder(order);
        }
        public async Task<IList<OrderDetailVM>> getDetailOrder(Guid idcustomer)
        {
            return await orderRepository.getDetailOrder(idcustomer);
        }

        public async Task<bool> ConfirmDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return await orderRepository.ConfirmDeliveryDate(orderConfirmation);
        }

        public async Task<bool> EditDeliveryDate(ExtendedOrderConfirmDeliveryDateVM orderConfirmation)
        {
            return await orderRepository.EditDeliveryDate(orderConfirmation);
        }

        public async Task<bool> ConfirmOrder(Order order)
        {
            return await orderRepository.ConfirmOrder(order);
        }

        public async Task<bool> CancelOrder(Order order)
        {
            if(order.OrderId == Guid.Empty)
            {
                return false;
            }

            return await orderRepository.CancelOrder(order);
        }
    }
}
