using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CartVM
    {
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public Guid SizeId { get; set; }
        public int Quantity { get; set; }
    }
}
