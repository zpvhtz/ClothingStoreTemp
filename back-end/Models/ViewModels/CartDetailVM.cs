using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CartDetailVM
    {
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public Guid SizeId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ColorName { get; set; }
        public string SizeName { get; set; }
        public decimal Price { get; set; }
        public double? Discount { get; set; }
        public string ImageUrl { get; set; }
    }
}
