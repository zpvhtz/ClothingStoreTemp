using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CustomerVM
    {
        public Guid CustomerId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Guid GenderId { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public Guid AccountId { get; set; }
    }
}
