using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Status
    {
        public Status()
        {
            Brand = new HashSet<Brand>();
            Employee = new HashSet<Employee>();
            ImportOrder = new HashSet<ImportOrder>();
            Order = new HashSet<Order>();
            Product = new HashSet<Product>();
            ProductColor = new HashSet<ProductColor>();
            ProductGender = new HashSet<ProductGender>();
            Size = new HashSet<Size>();
            TypeProduct = new HashSet<TypeProduct>();
        }

        public Guid StatusId { get; set; }
        public string Name { get; set; }

        public ICollection<Brand> Brand { get; set; }
        public ICollection<Employee> Employee { get; set; }
        public ICollection<ImportOrder> ImportOrder { get; set; }
        public ICollection<Order> Order { get; set; }
        public ICollection<Product> Product { get; set; }
        public ICollection<ProductColor> ProductColor { get; set; }
        public ICollection<ProductGender> ProductGender { get; set; }
        public ICollection<Size> Size { get; set; }
        public ICollection<TypeProduct> TypeProduct { get; set; }
    }
}
