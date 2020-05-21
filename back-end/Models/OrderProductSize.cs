using System;
using System.Collections.Generic;

namespace Models
{
    public partial class OrderProductSize
    {
        public Guid OrderId { get; set; }
        public Guid SizeId { get; set; }
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public Order Order { get; set; }
        public ProductSize ProductSize { get; set; }
    }
}
