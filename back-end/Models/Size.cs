using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Size
    {
        public Size()
        {
            ProductSize = new HashSet<ProductSize>();
        }

        public Guid SizeId { get; set; }
        public string Name { get; set; }
        public Guid? TypeSizeId { get; set; }
        public Guid StatusId { get; set; }

        public Status Status { get; set; }
        public TypeSize TypeSize { get; set; }
        public ICollection<ProductSize> ProductSize { get; set; }
    }
}
