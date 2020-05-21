using System;
using System.Collections.Generic;

namespace Models
{
    public partial class TypeProduct
    {
        public TypeProduct()
        {
            Product = new HashSet<Product>();
        }

        public Guid TypeProductId { get; set; }
        public string Name { get; set; }
        public Guid StatusId { get; set; }
        public Guid ProductGenderId { get; set; }

        public ProductGender ProductGender { get; set; }
        public Status Status { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
