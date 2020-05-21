using System;
using System.Collections.Generic;

namespace Models
{
    public partial class ProductSize
    {
        public ProductSize()
        {
            ImportOrder = new HashSet<ImportOrder>();
            OrderProductSize = new HashSet<OrderProductSize>();
        }

        public Guid SizeId { get; set; }
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public int InventoryQuantity { get; set; }
        public Guid StatusId { get; set; }

        public ProductColor ProductColor { get; set; }
        public Size Size { get; set; }
        public ICollection<ImportOrder> ImportOrder { get; set; }
        public ICollection<OrderProductSize> OrderProductSize { get; set; }
    }
}
