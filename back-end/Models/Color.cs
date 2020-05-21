using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Color
    {
        public Color()
        {
            ProductColor = new HashSet<ProductColor>();
        }

        public Guid ColorId { get; set; }
        public string ColorValue { get; set; }
        public string Name { get; set; }
        public Guid StatusId { get; set; }

        public ICollection<ProductColor> ProductColor { get; set; }
    }
}
