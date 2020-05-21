using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class OrderDetailVM
    {
        public Guid OrderId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice { get; set; }
        public string StatusName { get; set; }
    }
}
