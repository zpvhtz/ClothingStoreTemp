using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Vendor
    {
        public Vendor()
        {
            ImportOrder = new HashSet<ImportOrder>();
        }

        public Guid VendorId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public ICollection<ImportOrder> ImportOrder { get; set; }
    }
}
