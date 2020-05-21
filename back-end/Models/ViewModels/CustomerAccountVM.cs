using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CustomerAccountVM
    {
        public Guid AccountId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public Guid StatusId { get; set; }
        public Guid CustomerId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Guid GenderId { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
    }
}
