using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ExtendedProductVM
    {
        public Guid ProductId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public TypeProductVM TypeProduct { get; set; }
        public decimal Price { get; set; }
        public string Detail { get; set; }
        public double? Discount { get; set; }
        public DateTime CreatedDate { get; set; }
        public BrandVM Brand { get; set; }
        public StatusVM Status { get; set; }
        public IList<ProductColorVM> ListProductColor { get; set; }
    }
}
