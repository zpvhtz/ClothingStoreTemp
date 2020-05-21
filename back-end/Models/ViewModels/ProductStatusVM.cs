using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProductStatusVM
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public Guid StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
