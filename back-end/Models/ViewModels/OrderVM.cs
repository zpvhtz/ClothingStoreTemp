using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class OrderVM
    {
        public Guid OrderId { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string ContactPhone { get; set; }
        public string DeliveryName { get; set; }
        public string DeliveryEmail { get; set; }
        public string DeliveryAddress { get; set; }
        public decimal DeliveryPrice { get; set; }
        public DateTime DeliveryDate { get; set; }
        public Guid StatusId { get; set; }

        public Customer Customer { get; set; }
        public Status Status { get; set; }
        public ICollection<OrderProductSize> OrderProductSize { get; set; }
    }
}
