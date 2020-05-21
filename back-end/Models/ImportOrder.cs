using System;
using System.Collections.Generic;

namespace Models
{
    public partial class ImportOrder
    {
        public Guid ImportOrderId { get; set; }
        public Guid SizeId { get; set; }
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime ImportDate { get; set; }
        public Guid VendorId { get; set; }
        public Guid StatusId { get; set; }

        public ProductSize ProductSize { get; set; }
        public Status Status { get; set; }
        public Vendor Vendor { get; set; }
    }
}
