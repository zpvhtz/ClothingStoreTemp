using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Brand
    {
        public Brand()
        {
            Product = new HashSet<Product>();
        }

        public Guid BrandId { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public Guid StatusId { get; set; }

        public Status Status { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
