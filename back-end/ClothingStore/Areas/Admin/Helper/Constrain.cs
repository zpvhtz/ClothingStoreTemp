using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothingStore.Areas.Admin.Helper
{
    public class Constrain
    {
        public static class CustomRoles
        {
            public const string Administrator = "Quản trị viên";
            public const string NhapKho = "Nhân viên nhập kho";
            public const string XuatKho = "Nhân viên xuất kho";
        }
    }
}
