using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Role
    {
        public Role()
        {
            Account = new HashSet<Account>();
        }

        public Guid RoleId { get; set; }
        public string Name { get; set; }

        public ICollection<Account> Account { get; set; }
    }
}
