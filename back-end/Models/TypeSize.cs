using System;
using System.Collections.Generic;

namespace Models
{
    public partial class TypeSize
    {
        public TypeSize()
        {
            Size = new HashSet<Size>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<Size> Size { get; set; }
    }
}
