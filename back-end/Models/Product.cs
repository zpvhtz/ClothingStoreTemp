using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Product
    {
        public Product()
        {
            ProductColor = new HashSet<ProductColor>();
        }

        public Guid ProductId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid TypeProductId { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public double? Discount { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid BrandId { get; set; }
        public Guid StatusId { get; set; }

        public Brand Brand { get; set; }
        public Status Status { get; set; }
        public TypeProduct TypeProduct { get; set; }
        public ICollection<ProductColor> ProductColor { get; set; }
    }
}
