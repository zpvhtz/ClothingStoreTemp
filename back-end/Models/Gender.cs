using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Gender
    {
        public Gender()
        {
            Customer = new HashSet<Customer>();
            Employee = new HashSet<Employee>();
        }

        public Guid GenderId { get; set; }
        public string Name { get; set; }

        public ICollection<Customer> Customer { get; set; }
        public ICollection<Employee> Employee { get; set; }
    }
}
