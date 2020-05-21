using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProductDetailVM
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public double? Discount { get; set; }
        public string ImageUrl { get; set; }
        public string BrandName { get; set; }
        public List<Guid> ColorId { get; set; }
        public List<Guid> SizeId { get; set; }
    }
}
