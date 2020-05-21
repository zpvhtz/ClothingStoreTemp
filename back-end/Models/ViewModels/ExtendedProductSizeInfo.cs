using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ExtendedProductSizeInfo
    {
        public Guid SizeId { get; set; }
        public string SizeName { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid ColorId { get; set; }
        public string ColorName { get; set; }
    }
}
