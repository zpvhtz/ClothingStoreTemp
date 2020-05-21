using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Account
    {
        public Account()
        {
            Customer = new HashSet<Customer>();
            Employee = new HashSet<Employee>();
        }

        public Guid AccountId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public Guid StatusId { get; set; }

        public Role Role { get; set; }
        public ICollection<Customer> Customer { get; set; }
        public ICollection<Employee> Employee { get; set; }
    }
}
