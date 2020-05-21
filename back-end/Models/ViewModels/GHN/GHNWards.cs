using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels.GHN
{
    public class GHNWards
    {
        public string WardCode { get; set; }
        public string WardName { get; set; }
        public string DistrictCode { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
    }
}
