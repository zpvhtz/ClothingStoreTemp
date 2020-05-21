using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels.GHN
{
    public class FeeRequest
    {
        public string Token { get; set; }
        public int FromDistrictId { get; set; }
        public int ToDistrictId { get; set; }
        public int ServiceId { get; set; }
        public int Weight { get; set; }
    }
}
