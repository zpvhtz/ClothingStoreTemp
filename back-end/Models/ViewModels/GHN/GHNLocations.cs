using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class GHNLocations
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        public bool IsRepresentative { get; set; }
        public string MiningText { get; set; }
        public int Priority { get; set; }
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public int SupportType { get; set; }
        public int Type { get; set; }
    }
}
