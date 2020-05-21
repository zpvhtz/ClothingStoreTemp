using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ExtendedOrderConfirmDeliveryDateVM
    {
        public Guid OrderId { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
