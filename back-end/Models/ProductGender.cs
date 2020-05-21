using System;
using System.Collections.Generic;

namespace Models
{
    public partial class ProductGender
    {
        public ProductGender()
        {
            TypeProduct = new HashSet<TypeProduct>();
        }

        public Guid ProductGenderId { get; set; }
        public string Name { get; set; }
        public Guid StatusId { get; set; }

        public Status Status { get; set; }
        public ICollection<TypeProduct> TypeProduct { get; set; }
    }
}
