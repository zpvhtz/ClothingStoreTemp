using System;
using System.Collections.Generic;

namespace Models
{
    public partial class ProductColor
    {
        public ProductColor()
        {
            ProductSize = new HashSet<ProductSize>();
        }

        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public string ImageUrl { get; set; }
        public Guid StatusId { get; set; }

        public Color Color { get; set; }
        public Product Product { get; set; }
        public Status Status { get; set; }
        public ICollection<ProductSize> ProductSize { get; set; }
    }
}
